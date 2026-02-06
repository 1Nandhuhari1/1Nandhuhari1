import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash, GraduationCap } from 'lucide-react';

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
        if (newEdu.school) {
            addItem('education', newEdu);
            setNewEdu({ school: '', degree: '', field: '', startDate: '', endDate: '', description: '' });
            setIsAdding(false);
        }
    };

    return (
        <div className="form-section">
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Education</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                Add your academic details. Start with your most recent degree.
            </p>

            {resumeData.education.map((edu) => (
                <div key={edu.id} className="card" style={{ marginBottom: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                        <h4 style={{ marginBottom: '4px' }}>{edu.degree ? `${edu.degree} in ${edu.field}` : edu.school}</h4>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                            {edu.degree && <span>{edu.school} • </span>} {edu.startDate} - {edu.endDate}
                        </p>
                    </div>
                    <button
                        className="btn"
                        style={{ color: 'var(--color-secondary)', padding: '4px' }}
                        onClick={() => removeItem('education', edu.id)}
                    >
                        <Trash size={16} />
                    </button>
                </div>
            ))}

            {isAdding ? (
                <div className="card" style={{ border: '2px solid var(--color-primary)', backgroundColor: 'var(--color-bg-body)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                        <div className="form-group">
                            <label className="label">School / University <span style={{ color: 'red' }}>*</span></label>
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
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                <div>
                                    <label className="label">Start Year</label>
                                    <input
                                        type="text" className="input" placeholder="YYYY"
                                        value={newEdu.startDate} onChange={(e) => setNewEdu({ ...newEdu, startDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="label">End Year</label>
                                    <input
                                        type="text" className="input" placeholder="YYYY or Present"
                                        value={newEdu.endDate} onChange={(e) => setNewEdu({ ...newEdu, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                            disabled={!newEdu.school}
                            style={{ opacity: (!newEdu.school) ? 0.5 : 1 }}
                        >
                            Save Education
                        </button>
                        <button
                            className="btn btn-outline"
                            disabled={!newEdu.school}
                            style={{ opacity: (!newEdu.school) ? 0.5 : 1 }}
                            onClick={() => {
                                if (newEdu.school) {
                                    addItem('education', newEdu);
                                    setNewEdu({ school: '', degree: '', field: '', startDate: '', endDate: '', description: '' });
                                    // Keep isAdding true
                                }
                            }}
                        >
                            Save & Add Another
                        </button>
                        <button className="btn btn-outline" onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <button
                    className="btn btn-outline"
                    style={{ width: '100%', borderStyle: 'dashed' }}
                    onClick={() => setIsAdding(true)}
                >
                    <Plus size={18} style={{ marginRight: '8px' }} /> Add Education
                </button>
            )}
        </div>
    );
};

export default EducationForm;
