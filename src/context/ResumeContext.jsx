import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState({
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            jobTitle: '',
            linkedin: '',
            portfolio: '',
            summary: '',
            photo: null
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        achievements: [],
        selectedTemplate: 'professional'
    });

    const [savedResumes, setSavedResumes] = useState([]);
    const [loadingResumes, setLoadingResumes] = useState(false);
    const { user } = useAuth();

    // Fetch resumes from Supabase when user changes
    useEffect(() => {
        if (user?.email) {
            fetchSavedResumes();
        } else {
            setSavedResumes([]);
        }
    }, [user]);

    const fetchSavedResumes = async () => {
        setLoadingResumes(true);
        try {
            const { data, error } = await supabase
                .from('resumes')
                .select('*')
                .eq('user_email', user.email)
                .order('last_edited', { ascending: false });

            if (error) throw error;

            // Map Supabase structure back to our resume format
            const formatted = data.map(item => ({
                ...item.resume_data,
                id: item.id, // Use Supabase UUID
                title: item.title,
                lastEdited: new Date(item.last_edited).toLocaleDateString(),
                completion: item.completion
            }));

            setSavedResumes(formatted);
        } catch (err) {
            console.error('Error fetching resumes:', err);
        } finally {
            setLoadingResumes(false);
        }
    };

    // ... existing save logic for current resume ...
    React.useEffect(() => {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }, [resumeData]);

    const saveCurrentResume = async (title = '') => {
        if (!user) {
            alert('Please login to save your resume to the cloud.');
            return;
        }

        const resumeTitle = title || resumeData.title || resumeData.personalInfo.jobTitle || 'Untitled Resume';
        const completionScore = calculateCompletion(resumeData);

        const payload = {
            user_email: user.email,
            title: resumeTitle,
            resume_data: resumeData,
            completion: completionScore,
            last_edited: new Date().toISOString()
        };

        try {
            let result;
            if (resumeData.id && typeof resumeData.id === 'string' && resumeData.id.length > 20) {
                // Update existing (UUID check)
                result = await supabase
                    .from('resumes')
                    .update(payload)
                    .eq('id', resumeData.id);
            } else {
                // Insert new
                result = await supabase
                    .from('resumes')
                    .insert([payload])
                    .select();

                if (result.data?.[0]) {
                    setResumeData(prev => ({ ...prev, id: result.data[0].id }));
                }
            }

            if (result.error) throw result.error;

            fetchSavedResumes(); // Refresh list
            return { success: true };
        } catch (err) {
            console.error('Error saving resume:', err);
            return { success: false, error: err.message };
        }
    };

    const deleteResume = async (id) => {
        try {
            const { error } = await supabase
                .from('resumes')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchSavedResumes();
        } catch (err) {
            console.error('Error deleting resume:', err);
        }
    };

    const loadResume = (id) => {
        const resume = savedResumes.find(r => r.id === id);
        if (resume) {
            setResumeData(resume);
        }
    };

    const clearCurrentResume = () => {
        setResumeData({
            personalInfo: {
                fullName: '', email: '', phone: '', jobTitle: '', linkedin: '', portfolio: '', summary: '', photo: null
            },
            experience: [], education: [], skills: [], projects: [], achievements: [], selectedTemplate: 'professional'
        });
    };

    // specific helper to calculate completion roughly
    const calculateCompletion = (data) => {
        let score = 0;
        if (data.personalInfo.fullName) score += 20;
        if (data.personalInfo.email) score += 10;
        if (data.experience.length > 0) score += 30;
        if (data.education.length > 0) score += 20;
        if (data.skills.length > 0) score += 20;
        return score;
    };

    const updatePersonalInfo = (info) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, ...info }
        }));
    };

    // ... (rest of the update functions unchanged)

    const addExperience = (exp) => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, { ...exp, id: Date.now() }]
        }));
    };

    const removeExperience = (id) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    const updateExperience = (id, updatedExp) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => exp.id === id ? { ...exp, ...updatedExp } : exp)
        }));
    };

    const addItem = (section, item) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], { ...item, id: Date.now() }]
        }));
    };

    const removeItem = (section, id) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    const updateSkills = (newSkills) => {
        setResumeData(prev => ({ ...prev, skills: newSkills }));
    };

    const updateTemplate = (templateId) => {
        setResumeData(prev => ({ ...prev, selectedTemplate: templateId }));
    };

    const importResumeData = (newData) => {
        setResumeData(prev => ({
            ...prev,
            ...newData,
            // Preserve the template choice and ensure arrays are at least empty if not provided
            experience: newData.experience || [],
            education: newData.education || [],
            skills: newData.skills || [],
            projects: newData.projects || [],
            achievements: newData.achievements || [],
            personalInfo: { ...prev.personalInfo, ...newData.personalInfo }
        }));
    };

    return (
        <ResumeContext.Provider value={{
            resumeData,
            savedResumes,
            loadingResumes, // Exported
            saveCurrentResume,
            deleteResume,
            loadResume,
            clearCurrentResume,
            updatePersonalInfo,
            addExperience,
            removeExperience,
            updateExperience,
            addItem,
            removeItem,
            updateSkills,
            updateTemplate,
            importResumeData,
            fetchSavedResumes // Exported 
        }}>
            {children}
        </ResumeContext.Provider>
    );
};
