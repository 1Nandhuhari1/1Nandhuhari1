import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Camera, Upload, X } from 'lucide-react';

const PersonalInfoForm = () => {
    const { resumeData, updatePersonalInfo } = useResume();
    const { personalInfo } = resumeData;

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
                    <label className="label" style={{ marginBottom: 0 }}>Professional Summary</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <select
                            className="input"
                            style={{ padding: '4px 8px', fontSize: '12px', width: 'auto', height: 'auto' }}
                            onChange={(e) => {
                                if (e.target.value) {
                                    updatePersonalInfo({ summary: e.target.value });
                                    e.target.value = ""; // Reset dropdown
                                }
                            }}
                        >
                            <option value="">✨ Select a Suggestion...</option>
                            <option value="Motivated and detail-oriented Diploma student in Computer Hardware Engineering with hands-on experience in AI & ML app development through a government-backed internship. Skilled in Python, JavaScript, HTML, CSS, MongoDB, and hardware prototyping with Arduino. Strong foundation in PC building, hardware maintenance, and full-stack app development using modern frameworks. Creative problem-solver with a passion for designing bold, user-friendly interfaces and building practical tools for students and job seekers. Recognized for persistence in debugging, structured learning, and collaborative teamwork. Actively seeking entry-level opportunities in software, hardware, and AI/ML engineering to contribute technical expertise and innovative solutions.">Hardware & AI Student (Yours)</option>
                            <option value="Experienced software developer with over 5 years of experience in building scalable web applications. Proficient in JavaScript, React, and Node.js. Passionate about writing clean, maintainable code and mentoring junior developers.">Experienced Developer</option>
                            <option value="Recent graduate with a strong academic background in Computer Science. Eager to launch a career in software engineering. Fast learner with excellent problem-solving skills and a collaborative mindset.">Recent Graduate</option>
                            <option value="Creative and detail-oriented designer with a passion for user-centric design. Skilled in Adobe Creative Suite, Figma, and prototyping tools. Proven ability to translate business requirements into intuitive design solutions.">Creative Designer</option>
                        </select>
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
