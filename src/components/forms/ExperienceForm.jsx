import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash, Wand2 } from 'lucide-react';

const ExperienceForm = () => {
    const { resumeData, addExperience, removeExperience, updateExperience } = useResume();
    const [isAdding, setIsAdding] = useState(false);
    const [newExp, setNewExp] = useState({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
    });
    const [isEnhancing, setIsEnhancing] = useState(false);

    const handleSave = () => {
        if (newExp.title && newExp.company) {
            addExperience(newExp);
            setNewExp({ title: '', company: '', startDate: '', endDate: '', current: false, description: '' });
            setIsAdding(false);
        }
    };

    const handleEnhance = () => {
        setIsEnhancing(true);
        setTimeout(() => {
            setNewExp(prev => ({
                ...prev,
                description: prev.description + "\n• spearheaded key initiatives improving efficiency by 20%\n• Collaborated with cross-functional teams to deliver high-quality solutions."
            }));
            setIsEnhancing(false);
        }, 1500);
    };

    return (
        <div className="form-section">
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Work Experience</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                Highlight your career journey. Focus on achievements rather than just responsibilities.
            </p>

            {resumeData.experience.map((exp) => (
                <div key={exp.id} className="card" style={{ marginBottom: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                        <h4 style={{ marginBottom: '4px' }}>{exp.title}</h4>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                            {exp.company} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </p>
                    </div>
                    <button
                        className="btn"
                        style={{ color: 'var(--color-secondary)', padding: '4px' }}
                        onClick={() => removeExperience(exp.id)}
                    >
                        <Trash size={16} />
                    </button>
                </div>
            ))}

            {isAdding ? (
                <div className="card" style={{ border: '2px solid var(--color-primary)', backgroundColor: 'var(--color-bg-body)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                        <div className="form-group">
                            <label className="label">Job Title</label>
                            <input
                                type="text" className="input" placeholder="e.g. Product Manager"
                                value={newExp.title} onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Company</label>
                            <input
                                type="text" className="input" placeholder="e.g. Google"
                                value={newExp.company} onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Start Date</label>
                            <input
                                type="text" className="input" placeholder="MM/YYYY"
                                value={newExp.startDate} onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">End Date</label>
                            <input
                                type="text" className="input" placeholder="MM/YYYY or Present"
                                disabled={newExp.current}
                                value={newExp.endDate} onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xs)' }}>
                            <label className="label" style={{ marginBottom: 0 }}>Description</label>
                            <button
                                type="button"
                                onClick={handleEnhance}
                                disabled={isEnhancing}
                                style={{
                                    background: 'linear-gradient(90deg, #4f46e5, #ec4899)',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: 'var(--font-size-xs)',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                <Wand2 size={12} /> {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
                            </button>
                        </div>
                        <textarea
                            className="input" style={{ minHeight: '100px', resize: 'vertical' }}
                            placeholder="Describe your key responsibilities and achievements..."
                            value={newExp.description} onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
                        <button className="btn btn-primary" onClick={handleSave}>Save Experience</button>
                        <button className="btn btn-outline" onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <button
                    className="btn btn-outline"
                    style={{ width: '100%', borderStyle: 'dashed' }}
                    onClick={() => setIsAdding(true)}
                >
                    <Plus size={18} style={{ marginRight: '8px' }} /> Add Experience
                </button>
            )}
        </div>
    );
};

export default ExperienceForm;
