import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Camera, Upload, X, Wand2 } from 'lucide-react';

const PersonalInfoForm = () => {
    const { resumeData, updatePersonalInfo } = useResume();
    const { personalInfo } = resumeData;
    const [isEnhancing, setIsEnhancing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updatePersonalInfo({ [name]: value });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatePersonalInfo({ photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        updatePersonalInfo({ photo: null });
    };

    const handleEnhance = () => {
        setIsEnhancing(true);
        const title = (personalInfo.jobTitle || '').toLowerCase();
        let aiSummary = "";

        if (title.includes('developer') || title.includes('engineer') || title.includes('programmer') || title.includes('coder')) {
            aiSummary = `Innovative ${personalInfo.jobTitle} with a passion for building scalable and efficient software solutions. Proficient in modern technologies and dedicated to writing clean, maintainable code. Proven track record of delivering high-quality projects on time and collaborating effectively with cross-functional teams.`;
        } else if (title.includes('designer') || title.includes('creative') || title.includes('artist') || title.includes('ui') || title.includes('ux')) {
            aiSummary = `Creative ${personalInfo.jobTitle} with a strong eye for detail and a passion for user-centric design. Experienced in translating complex requirements into intuitive and visually stunning interfaces. Adept at using modern design tools to bring ideas to life and enhance user experiences.`;
        } else if (title.includes('student') || title.includes('intern') || title.includes('graduate')) {
            aiSummary = `Motivated ${personalInfo.jobTitle} eager to launch a career in the industry. Fast learner with a strong academic background and a collaborative mindset. Passionate about applying theoretical knowledge to real-world problems and continuously developing new skills.`;
        } else if (title.includes('manager') || title.includes('lead') || title.includes('head') || title.includes('director')) {
            aiSummary = `Results-oriented ${personalInfo.jobTitle} with extensive experience in leading teams and driving project success. Skilled in strategic planning, resource management, and fostering a collaborative team environment. Committed to delivering value and achieving business goals.`;
        } else if (title.includes('sales') || title.includes('marketing') || title.includes('account')) {
            aiSummary = `Dynamic ${personalInfo.jobTitle} with a proven history of driving revenue growth and building strong client relationships. Skilled in market analysis, strategic communication, and executing effective campaigns. Dedicated to exceeding targets and contributing to business expansion.`;
        } else {
            aiSummary = `Dedicated ${personalInfo.jobTitle || 'professional'} with a proven history of success. Highly organized and detail-oriented, with strong problem-solving skills. Committed to continuous learning and contributing to organizational growth in a dynamic environment.`;
        }

        setTimeout(() => {
            updatePersonalInfo({ summary: aiSummary });
            setIsEnhancing(false);
        }, 1500);
    };

    return (
        <div className="form-section">
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Personal Information</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                Let's start with the basics. Recruiters need to know who you are and how to contact you.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: 'var(--spacing-xl)' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: '#e0e7ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    border: '2px dashed #4f46e5',
                    position: 'relative'
                }}>
                    {personalInfo.photo ? (
                        <img src={personalInfo.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <Camera size={40} color="#4f46e5" />
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h4 style={{ margin: 0 }}>Profile Photo</h4>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>
                        Supported formats: JPG, PNG. Max size: 2MB.
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <label className="btn btn-outline" style={{
                            padding: '8px 16px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <Upload size={14} /> Upload Photo
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                style={{ display: 'none' }}
                            />
                        </label>
                        {personalInfo.photo && (
                            <button
                                className="btn btn-outline"
                                onClick={removePhoto}
                                style={{
                                    padding: '8px 16px',
                                    fontSize: '12px',
                                    color: 'var(--color-secondary)',
                                    borderColor: 'var(--color-secondary)'
                                }}>
                                <X size={14} /> Remove
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                <div className="form-group">
                    <label className="label">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        className="input"
                        value={personalInfo.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Jane Doe"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Job Title</label>
                    <input
                        type="text"
                        name="jobTitle"
                        className="input"
                        value={personalInfo.jobTitle}
                        onChange={handleChange}
                        placeholder="e.g. Senior Product Designer"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        className="input"
                        value={personalInfo.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        className="input"
                        value={personalInfo.phone}
                        onChange={handleChange}
                        placeholder="+1 555 0199"
                    />
                </div>
                <div className="form-group">
                    <label className="label">LinkedIn URL</label>
                    <input
                        type="url"
                        name="linkedin"
                        className="input"
                        value={personalInfo.linkedin}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/janedoe"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Portfolio / Website</label>
                    <input
                        type="url"
                        name="portfolio"
                        className="input"
                        value={personalInfo.portfolio}
                        onChange={handleChange}
                        placeholder="janedoe.com"
                    />
                </div>
            </div>

            <div className="form-group" style={{ marginTop: 'var(--spacing-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xs)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label className="label" style={{ marginBottom: 0 }}>Professional Summary</label>
                        <button
                            type="button"
                            onClick={handleEnhance}
                            disabled={isEnhancing}
                            style={{
                                background: 'linear-gradient(90deg, #4f46e5, #ec4899)',
                                border: 'none',
                                color: 'white',
                                fontSize: '11px',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontWeight: '600',
                                boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)'
                            }}
                        >
                            <Wand2 size={12} /> {isEnhancing ? 'Writing...' : 'AI Write'}
                        </button>
                    </div>
                </div>
                <textarea
                    name="summary"
                    className="input"
                    style={{ minHeight: '120px', resize: 'vertical', fontFamily: 'inherit' }}
                    value={personalInfo.summary}
                    onChange={handleChange}
                    placeholder="Briefly describe your professional background and key achievements..."
                />
            </div>
        </div>
    );
};

export default PersonalInfoForm;
