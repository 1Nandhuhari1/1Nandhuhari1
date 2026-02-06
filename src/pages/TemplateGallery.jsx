import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, X, Check } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import ModernTemplate from '../components/templates/ModernTemplate';
import MinimalistTemplate from '../components/templates/MinimalistTemplate';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import ExecutiveTemplate from '../components/templates/ExecutiveTemplate';
import NoirTemplate from '../components/templates/NoirTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';
import VibrantTemplate from '../components/templates/VibrantTemplate';

// Image generation temporarily unavailable, using placeholders
const modernPreview = 'https://placehold.co/400x600/4f46e5/ffffff?text=Modern';
const minimalistPreview = 'https://placehold.co/400x600/000000/ffffff?text=Minimalist';
const professionalPreview = 'https://placehold.co/400x600/0f766e/ffffff?text=Professional';
const creativePreview = 'https://placehold.co/400x600/db2777/ffffff?text=Creative';
const executivePreview = 'https://placehold.co/400x600/1e3a8a/ffffff?text=Executive';
const noirPreview = 'https://placehold.co/400x600/111111/ff69b4?text=Noir';
const elegantPreview = 'https://placehold.co/400x600/f3f0e9/333333?text=Elegant';
const vibrantPreview = 'https://placehold.co/400x600/ff9a9e/333333?text=Vibrant';

const TemplateGallery = () => {
    const navigate = useNavigate();
    const { updateTemplate } = useResume();
    const [previewTemplateId, setPreviewTemplateId] = useState(null);

    const templates = [
        {
            id: 'modern',
            name: 'Modern',
            description: 'Clean and professional design suitable for most industries.',
            image: modernPreview
        },
        {
            id: 'minimalist',
            name: 'Minimalist',
            description: 'Simple and elegant, focusing purely on content.',
            image: minimalistPreview
        },
        {
            id: 'professional',
            name: 'Professional',
            description: 'Traditional layout perfect for corporate roles.',
            image: professionalPreview
        },
        {
            id: 'creative',
            name: 'Creative',
            description: 'Bold colors and unique layout for creative fields.',
            image: creativePreview
        },
        {
            id: 'executive',
            name: 'Executive',
            description: 'sophisticated design highlighting leadership and experience.',
            image: executivePreview
        },
        {
            id: 'noir',
            name: 'Noir',
            description: 'Elegant dark mode design with vibrant pink accents.',
            image: noirPreview
        },
        {
            id: 'elegant',
            name: 'Elegant',
            description: 'Sophisticated layout with a beige sidebar and serif typography.',
            image: elegantPreview
        },
        {
            id: 'vibrant',
            name: 'Vibrant',
            description: 'Modern and energetic design with artistic gradients.',
            image: vibrantPreview
        }
    ];

    // Dummy data for preview
    const dummyData = {
        personalInfo: {
            fullName: 'Alex Morgan',
            email: 'alex.morgan@example.com',
            phone: '+1 (555) 123-4567',
            linkedin: 'linkedin.com/in/alexmorgan',
            portfolio: 'alexmorgan.design',
            summary: 'Creative and detail-oriented professional with over 5 years of experience in digital product design. Proven track record of delivering user-centric solutions that drive business growth. Passionate about creating intuitive and visually appealing experiences.'
        },
        experience: [
            {
                id: 1,
                role: 'Senior Product Designer',
                company: 'TechFlow Solutions',
                duration: '2021 - Present',
                description: 'Lead the design of the core product suite, improving user retention by 25%. Mentored junior designers and established a comprehensive design system.'
            },
            {
                id: 2,
                role: 'UX Designer',
                company: 'Creative Pulse',
                duration: '2018 - 2021',
                description: 'Collaborated with cross-functional teams to design and ship mobile and web applications. Conducted user research and usability testing to inform design decisions.'
            }
        ],
        education: [
            {
                id: 1,
                degree: 'Bachelor of Fine Arts in Interaction Design',
                school: 'Design Academy',
                year: '2014 - 2018'
            }
        ],
        skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research', 'HTML/CSS', 'Agile Methodology'],
        projects: [
            {
                id: 1,
                title: 'E-commerce Redesign',
                description: 'Redesigned the checkout flow for a major e-commerce platform, resulting in a 15% increase in conversion rates.',
                link: ''
            }
        ],
        achievements: [
            {
                id: 1,
                title: 'Best Design Award 2022',
                description: 'Recognized for outstanding contribution to the company product design.'
            }
        ],
        selectedTemplate: 'modern' // Default for renderer, but overridden by preview logic
    };

    const handleUseTemplate = (templateId) => {
        updateTemplate(templateId);
        navigate('/create');
    };

    const renderPreviewTemplate = (templateId) => {
        const previewData = { ...dummyData, selectedTemplate: templateId };
        switch (templateId) {
            case 'minimalist': return <MinimalistTemplate data={previewData} />;
            case 'professional': return <ProfessionalTemplate data={previewData} />;
            case 'creative': return <CreativeTemplate data={previewData} />;
            case 'executive': return <ExecutiveTemplate data={previewData} />;
            case 'noir': return <NoirTemplate data={previewData} />;
            case 'elegant': return <ElegantTemplate data={previewData} />;
            case 'vibrant': return <VibrantTemplate data={previewData} />;
            case 'modern':
            default: return <ModernTemplate data={previewData} />;
        }
    };

    return (
        <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
            <div style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>Choose Your Template</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    Select a design that fits your style. You can always change it later.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 'var(--spacing-xl)'
            }}>
                {templates.map(template => (
                    <div key={template.id} className="card" style={{
                        padding: 0,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        transition: 'transform 0.2s',
                        cursor: 'default'
                    }}>
                        {/* Thumbnail / Header */}
                        <div style={{
                            height: '200px',
                            backgroundColor: 'var(--color-bg-body)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottom: '1px solid var(--color-border)',
                            position: 'relative'
                        }}>
                            {/* Abstract representation of the template */}
                            <img
                                src={template.image}
                                alt={template.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            {/* Fallback if image fails or loading */}
                            <div style={{
                                display: 'none',
                                width: '100%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#f3f4f6',
                                color: '#9ca3af',
                                flexDirection: 'column'
                            }}>
                                <span style={{ fontSize: '48px' }}>📄</span>
                            </div>

                            <div className="template-actions" style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0,0,0,0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                opacity: 0,
                                transition: 'opacity 0.2s'
                            }}
                                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                onMouseLeave={e => e.currentTarget.style.opacity = 0}
                            >
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setPreviewTemplateId(template.id)}
                                >
                                    <Eye size={16} style={{ marginRight: '8px' }} /> Preview
                                </button>
                                <button
                                    className="btn btn-primary"
                                    style={{ backgroundColor: 'white', color: 'black', border: 'none' }}
                                    onClick={() => handleUseTemplate(template.id)}
                                >
                                    <Check size={16} style={{ marginRight: '8px' }} /> Use Template
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: 'var(--spacing-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>{template.name}</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-md)', flex: 1 }}>
                                {template.description}
                            </p>
                            <button
                                className="btn btn-outline"
                                style={{ width: '100%', justifyContent: 'center' }}
                                onClick={() => handleUseTemplate(template.id)}
                            >
                                Use This Template
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Fullscreen Preview Modal */}
            {previewTemplateId && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 100,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        width: '100%',
                        maxWidth: '1000px',
                        height: '90vh',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            padding: '15px 20px',
                            borderBottom: '1px solid var(--color-border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'white'
                        }}>
                            <h3 style={{ margin: 0 }}>{templates.find(t => t.id === previewTemplateId)?.name} Preview</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleUseTemplate(previewTemplateId)}
                                >
                                    Use This Template
                                </button>
                                <button
                                    onClick={() => setPreviewTemplateId(null)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '40px',
                            backgroundColor: '#f3f4f6',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '210mm', // A4 width
                                minHeight: '297mm', // A4 height
                                backgroundColor: 'white',
                                boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                                transform: 'scale(0.8)', // Scale down slightly to fit better
                                transformOrigin: 'top center'
                            }}>
                                {renderPreviewTemplate(previewTemplateId)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateGallery;
