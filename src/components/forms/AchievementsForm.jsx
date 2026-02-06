import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash } from 'lucide-react';

const AchievementsForm = () => {
    const { resumeData, addItem, removeItem } = useResume();
    const [isAdding, setIsAdding] = useState(false);
    const [newAchievement, setNewAchievement] = useState({
        title: '',
        organization: '',
        date: '',
        description: ''
    });

    const handleSave = () => {
        if (newAchievement.title) {
            addItem('achievements', newAchievement);
            setNewAchievement({ title: '', organization: '', date: '', description: '' });
            setIsAdding(false);
        }
    };

    return (
        <div className="form-section">
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Achievements</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                Highlight awards, certifications, or major milestones.
            </p>

            {resumeData.achievements.map((achievement) => (
                <div key={achievement.id} className="card" style={{ marginBottom: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                        <h4 style={{ marginBottom: '4px' }}>{achievement.title}</h4>
                        {achievement.organization && (
                            <p style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-sm)', fontWeight: 500, marginBottom: '2px' }}>
                                {achievement.organization}
                            </p>
                        )}
                        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                            {achievement.date}
                        </p>
                    </div>
                    <button
                        className="btn"
                        style={{ color: 'var(--color-secondary)', padding: '4px' }}
                        onClick={() => removeItem('achievements', achievement.id)}
                    >
                        <Trash size={16} />
                    </button>
                </div>
            ))}

            {isAdding ? (
                <div className="card" style={{ border: '2px solid var(--color-primary)', backgroundColor: 'var(--color-bg-body)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                        <div className="form-group">
                            <label className="label">Achievement Title</label>
                            <input
                                type="text" className="input" placeholder="e.g. Employee of the Month"
                                value={newAchievement.title} onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Company / Institution</label>
                            <input
                                type="text" className="input" placeholder="e.g. Google"
                                value={newAchievement.organization} onChange={(e) => setNewAchievement({ ...newAchievement, organization: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Date</label>
                            <input
                                type="text" className="input" placeholder="MM/YYYY"
                                value={newAchievement.date} onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label">Description</label>
                        <textarea
                            className="input" style={{ minHeight: '80px', resize: 'vertical' }}
                            placeholder="Brief details about the achievement..."
                            value={newAchievement.description} onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
                        <button className="btn btn-primary" onClick={handleSave}>Save Achievement</button>
                        <button
                            className="btn btn-outline"
                            onClick={() => {
                                if (newAchievement.title) {
                                    addItem('achievements', newAchievement);
                                    setNewAchievement({ title: '', organization: '', date: '', description: '' });
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
                    <Plus size={18} style={{ marginRight: '8px' }} /> Add Achievement
                </button>
            )}
        </div>
    );
};

export default AchievementsForm;
