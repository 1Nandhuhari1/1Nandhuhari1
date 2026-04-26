import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { ArrowLeft, ArrowRight, Download, Check, Layout, AlertTriangle, Share2 } from 'lucide-react';

import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import SkillsForm from '../components/forms/SkillsForm';
import AchievementsForm from '../components/forms/AchievementsForm';
import FeedbackModal from '../components/FeedbackModal';

import ModernTemplate from '../components/templates/ModernTemplate';
import MinimalistTemplate from '../components/templates/MinimalistTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import NoirTemplate from '../components/templates/NoirTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';
import VibrantTemplate from '../components/templates/VibrantTemplate';

import { useResume } from '../context/ResumeContext';
import { calculateATSScore } from '../utils/atsScorer';

import ResumePreview from '../components/ResumePreview';

const CreateResume = () => {
    const location = useLocation();
    const [activeStep, setActiveStep] = useState(location.state?.fromUpload ? 6 : 0); // Default to Review (index 6) if from upload

    const steps = [
        { title: 'Personal Info', component: <PersonalInfoForm /> },
        { title: 'Experience', component: <ExperienceForm /> },
        { title: 'Projects', component: <ProjectsForm /> },
        { title: 'Education', component: <EducationForm /> },
        { title: 'Skills', component: <SkillsForm /> },
        { title: 'Achievements', component: <AchievementsForm /> },
        { title: 'Review & Download', component: <ResumePreview /> }
    ];

    const handleNext = () => {
        if (activeStep < steps.length - 1) setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (activeStep > 0) setActiveStep(prev => prev - 1);
    };

    return (
        <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 'var(--spacing-xl)' }}>
                {/* Sidebar / Stepper */}
                <div>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-lg)' }}>Builder</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)',
                                    padding: 'var(--spacing-sm)',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: activeStep === index ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                                    color: activeStep === index ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                    fontWeight: activeStep === index ? '600' : '400',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setActiveStep(index)}
                            >
                                <div style={{
                                    width: '24px', height: '24px',
                                    borderRadius: '50%',
                                    border: `1px solid ${activeStep === index ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 'var(--font-size-xs)'
                                }}>
                                    {activeStep > index ? <Check size={14} /> : index + 1}
                                </div>
                                {step.title}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div>
                    <div className={activeStep !== 6 ? "card" : ""} style={{ padding: activeStep !== 6 ? 'var(--spacing-xl)' : '0', minHeight: '400px' }}>
                        {steps[activeStep].component}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                        <button
                            className="btn btn-outline"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                            style={{ opacity: activeStep === 0 ? 0.5 : 1, cursor: activeStep === 0 ? 'not-allowed' : 'pointer' }}
                        >
                            <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Back
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            style={{ display: activeStep === steps.length - 1 ? 'none' : 'flex' }}
                        >
                            Next Step <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateResume;
