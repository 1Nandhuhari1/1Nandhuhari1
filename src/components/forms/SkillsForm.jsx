import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, X } from 'lucide-react';

const SkillsForm = () => {
    const { resumeData, updateSkills } = useResume();
    const [currentSkill, setCurrentSkill] = useState('');

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (currentSkill.trim() && !resumeData.skills.includes(currentSkill.trim())) {
            updateSkills([...resumeData.skills, currentSkill.trim()]);
            setCurrentSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        updateSkills(resumeData.skills.filter(skill => skill !== skillToRemove));
    };

    return (
        <div className="form-section">
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Skills</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                Add your technical and soft skills. These help with ATS ranking.
            </p>

            <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
                <input
                    type="text"
                    className="input"
                    placeholder="Add a skill (e.g. React, Project Management)"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" disabled={!currentSkill.trim()}>
                    <Plus size={20} />
                </button>
            </form>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                {resumeData.skills.map((skill, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '6px 12px',
                            backgroundColor: 'rgba(79, 70, 229, 0.1)',
                            color: 'var(--color-primary)',
                            borderRadius: '20px',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: '500'
                        }}
                    >
                        {skill}
                        <button
                            onClick={() => removeSkill(skill)}
                            style={{
                                background: 'none', border: 'none', marginLeft: '6px', cursor: 'pointer',
                                color: 'var(--color-primary)', display: 'flex', alignItems: 'center'
                            }}
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
                {resumeData.skills.length === 0 && (
                    <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No skills added yet.</p>
                )}
            </div>

            <div style={{ marginTop: 'var(--spacing-xl)' }}>
                <h4 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-sm)' }}>Suggested Skills</h4>
                <div style={{ display: 'flex', gap: 'var(--spacing-xs)', flexWrap: 'wrap' }}>
                    {['Communication', 'Leadership', 'Problem Solving', 'Teamwork'].map(skill => (
                        <button
                            key={skill}
                            className="btn btn-outline"
                            style={{ padding: '4px 10px', fontSize: 'var(--font-size-xs)' }}
                            onClick={() => {
                                if (!resumeData.skills.includes(skill)) {
                                    updateSkills([...resumeData.skills, skill]);
                                }
                            }}
                        >
                            + {skill}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsForm;
