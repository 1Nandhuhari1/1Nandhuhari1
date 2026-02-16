import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Download, Check, Layout, AlertTriangle, Share2 } from 'lucide-react';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import SkillsForm from '../components/forms/SkillsForm';
import AchievementsForm from '../components/forms/AchievementsForm';
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

import { useLocation } from 'react-router-dom';

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
                    <div className={activeStep !== 4 ? "card" : ""} style={{ padding: activeStep !== 4 ? 'var(--spacing-xl)' : '0', minHeight: '400px' }}>
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

import FeedbackModal from '../components/FeedbackModal';

// Preview & Template Selection
const ResumePreview = () => {
    const { resumeData, updateTemplate, saveCurrentResume } = useResume();
    const location = useLocation();
    const [showAtsAnalysis, setShowAtsAnalysis] = useState(location.state?.fromUpload || false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const [atsResult, setAtsResult] = useState({ score: 0, issues: [], criticalIssues: [] });

    React.useEffect(() => {
        const result = calculateATSScore(resumeData);
        setAtsResult({
            score: result.score,
            issues: result.feedback,
            criticalIssues: result.criticalIssues
        });
    }, [resumeData]);

    const { score, issues, criticalIssues } = atsResult;

    const downloadPDF = async () => {
        setIsDownloading(true);
        const element = document.getElementById('resume-preview-content');
        const opt = {
            margin: 0,
            filename: `${resumeData.personalInfo.fullName || 'Resume'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        try {
            const html2pdf = (await import('html2pdf.js')).default;
            await html2pdf().set(opt).from(element).save();
        } catch (e) {
            console.error('PDF generation failed', e);
            alert('PDF generation failed. Please try again.');
        } finally {
            setIsDownloading(false);
            // Show feedback modal after download attempt (success or fail, but usually success if no error caught)
            setTimeout(() => setShowFeedback(true), 1000);
        }
    };

    const handleShare = async () => {
        if (!navigator.share) {
            alert('Sharing is not supported on this browser context (requires HTTPS or mobile).');
            return;
        }

        setIsDownloading(true);
        const element = document.getElementById('resume-preview-content');
        const opt = {
            margin: 0,
            filename: `${resumeData.personalInfo.fullName || 'Resume'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        try {
            const html2pdf = (await import('html2pdf.js')).default;
            const pdfBlob = await html2pdf().set(opt).from(element).output('blob');

            const file = new File([pdfBlob], `${resumeData.personalInfo.fullName || 'Resume'}.pdf`, { type: 'application/pdf' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'My Resume',
                    text: 'Here is my updated resume.'
                });
            } else {
                // Fallback for text share if files not supported
                await navigator.share({
                    title: 'My Resume',
                    text: 'Check out my resume built with AI Resume Builder!',
                    url: window.location.origin
                });
            }
        } catch (e) {
            console.error('Sharing failed', e);
            // alert('Sharing failed or was cancelled.');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleSave = async () => {
        const result = await saveCurrentResume();
        if (result?.success) {
            alert('Resume saved to your dashboard in the cloud!');
        } else {
            alert('Failed to save. Make sure you are logged in.');
        }
    };

    const templates = [
        { id: 'modern', name: 'Modern', icon: '🟦' },
        { id: 'minimalist', name: 'Minimalist', icon: '📄' },
        { id: 'professional', name: 'Professional', icon: '👔' },
        { id: 'creative', name: 'Creative', icon: '🎨' },
        { id: 'executive', name: 'Executive', icon: '💼' },
        { id: 'noir', name: 'Noir', icon: '🌑' },
        { id: 'elegant', name: 'Elegant', icon: '📜' },
        { id: 'vibrant', name: 'Vibrant', icon: '✨' }
    ];

    const renderTemplate = () => {
        switch (resumeData.selectedTemplate) {
            case 'minimalist': return <MinimalistTemplate data={resumeData} />;
            case 'professional': return <ProfessionalTemplate data={resumeData} />;
            case 'creative': return <CreativeTemplate data={resumeData} />;
            case 'executive': return <ExecutiveTemplate data={resumeData} />;
            case 'noir': return <NoirTemplate data={resumeData} />;
            case 'elegant': return <ElegantTemplate data={resumeData} />;
            case 'vibrant': return <VibrantTemplate data={resumeData} />;
            case 'modern':
            default: return <ModernTemplate data={resumeData} />;
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <h2 style={{ fontSize: 'var(--font-size-xl)' }}>Final Review</h2>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <button
                        className="btn btn-primary"
                        onClick={downloadPDF}
                        disabled={isDownloading}
                    >
                        {isDownloading ? 'Processing...' : 'Download PDF'} <Download size={18} style={{ marginLeft: '8px' }} />
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={handleShare}
                        disabled={isDownloading}
                        style={{ display: 'flex', gap: '8px' }}
                    >
                        Share <Share2 size={18} />
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={handleSave}
                        style={{ display: 'flex', gap: '8px' }}
                    >
                        Save <Check size={18} />
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => setShowAtsAnalysis(!showAtsAnalysis)}
                        style={{ display: 'flex', gap: '8px', color: showAtsAnalysis ? 'var(--color-secondary)' : 'var(--color-primary)' }}
                    >
                        <AlertTriangle size={18} /> ATS Check
                    </button>
                </div>
            </div>

            {showAtsAnalysis && (
                <div className="card" style={{ marginBottom: 'var(--spacing-lg)', borderLeft: `4px solid ${score > 80 ? 'green' : 'var(--color-secondary)'}` }}>
                    <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-sm)' }}>ATS Analysis Score: {score}/100</h3>
                    <ul style={{ paddingLeft: '20px', color: 'var(--color-text-muted)' }}>
                        {issues.length === 0 ? (
                            <li>✅ Excellent! Your resume is well-optimized for ATS.</li>
                        ) : (
                            issues.map((issue, idx) => <li key={idx}>⚠️ {issue}</li>)
                        )}
                        {score < 100 && score > 80 && <li>ℹ️ Good job, just a few polish items remaining.</li>}
                    </ul>
                </div>
            )}

            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h4 style={{ marginBottom: 'var(--spacing-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layout size={18} /> Select Template
                </h4>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', overflowX: 'auto', paddingBottom: '10px' }}>
                    {templates.map(t => (
                        <button
                            key={t.id}
                            onClick={() => updateTemplate(t.id)}
                            style={{
                                padding: '10px 15px',
                                border: resumeData.selectedTemplate === t.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: '500',
                                backgroundColor: resumeData.selectedTemplate === t.id ? 'rgba(79, 70, 229, 0.05)' : 'white',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <span>{t.icon}</span> {t.name}
                        </button>
                    ))}
                </div>
            </div>

            <div id="resume-preview-content" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                {renderTemplate()}
            </div>

            <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
        </div>
    )
}

export default CreateResume;
