import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash } from 'lucide-react';

const EducationForm = () => {
    const { resumeData, addItem, removeItem } = useResume();
    const [isAdding, setIsAdding] = useState(false);
    const [newEdu, setNewEdu] = useState({
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: ''
    });

    const handleSave = () => {
        if (newEdu.school.trim()) {
            addItem('education', newEdu);
            setNewEdu({
                school: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                description: ''
            });
            setIsAdding(false);
        } else {
            alert('Please enter a School or University name.');
        }
    };

    return (
        <div className="form-section animate-fade-in">
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Education</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                Add your educational background, including degrees, certifications, and relevant coursework.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', marginBottom: isAdding ? 'var(--spacing-xl)' : 0 }}>
                {resumeData.education && resumeData.education.map((edu) => (
                    <div key={edu.id} className="card" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        borderLeft: '4px solid var(--color-primary)'
                    }}>
                        <div>
                            <h4 style={{ marginBottom: '4px', fontSize: '1.1rem' }}>
                                {edu.degree} {edu.field && `in ${edu.field}`}
                            </h4>
                            <p style={{ fontWeight: '600', color: 'var(--color-primary-dark)', marginBottom: '2px' }}>
                                {edu.school}
                            </p>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                {edu.startDate} - {edu.endDate}
                            </p>
                        </div>
                        <button
                            className="btn btn-icon"
                            style={{ color: 'var(--color-secondary)' }}
                            onClick={() => removeItem('education', edu.id)}
                            title="Remove Education"
                        >
                            <Trash size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {isAdding ? (
                <div className="card" style={{
                    border: '2px solid var(--color-primary)',
                    backgroundColor: 'var(--color-bg-body)',
                    marginTop: 'var(--spacing-md)'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="label">School / University</label>
                            <input
                                type="text" className="input" placeholder="e.g. Stanford University"
                                value={newEdu.school} onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Degree</label>
                            <input
                                type="text" className="input" placeholder="e.g. Bachelor of Science"
                                value={newEdu.degree} onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Field of Study</label>
                            <input
                                type="text" className="input" placeholder="e.g. Computer Science"
                                value={newEdu.field} onChange={(e) => setNewEdu({ ...newEdu, field: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Start Date</label>
                            <input
                                type="text" className="input" placeholder="MM/YYYY"
                                value={newEdu.startDate} onChange={(e) => setNewEdu({ ...newEdu, startDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">End Date (or Expected)</label>
                            <input
                                type="text" className="input" placeholder="MM/YYYY"
                                value={newEdu.endDate} onChange={(e) => setNewEdu({ ...newEdu, endDate: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label">Description (Optional)</label>
                        <textarea
                            className="input" style={{ minHeight: '80px', resize: 'vertical' }}
                            placeholder="Relevant coursework, honors, activities..."
                            value={newEdu.description} onChange={(e) => setNewEdu({ ...newEdu, description: e.target.value })}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
                        <button className="btn btn-primary" onClick={handleSave}>Save Education</button>
                        <button className="btn btn-outline" onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <button
                    className="btn btn-outline"
                    style={{ width: '100%', borderStyle: 'dashed', marginTop: 'var(--spacing-md)' }}
                    onClick={() => setIsAdding(true)}
                >
                    <Plus size={18} style={{ marginRight: '8px' }} /> Add Education
                </button>
            )}
        </div>
    );
};

export default EducationForm;
