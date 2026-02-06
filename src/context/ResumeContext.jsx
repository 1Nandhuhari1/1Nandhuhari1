import React, { createContext, useState, useContext } from 'react';

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
        selectedTemplate: 'modern'
    });

    React.useEffect(() => {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }, [resumeData]);

    const updatePersonalInfo = (info) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, ...info }
        }));
    };

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
            updatePersonalInfo,
            addExperience,
            removeExperience,
            updateExperience,
            addItem,
            removeItem,
            updateSkills,
            updateSkills,
            updateTemplate,
            importResumeData
        }}>
            {children}
        </ResumeContext.Provider>
    );
};
