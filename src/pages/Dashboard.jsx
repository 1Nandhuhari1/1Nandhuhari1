import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, MoreVertical, Calendar, Edit2, Trash2, Layout } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { savedResumes, deleteResume, loadResume, clearCurrentResume, loadingResumes } = useResume();
    const { user } = useAuth();
    const [openMenuId, setOpenMenuId] = useState(null);

    const handleCreate = () => {
        clearCurrentResume(); // Start fresh
        navigate('/create');
    };

    const handleEdit = (resumeId) => {
        loadResume(resumeId); // Load data
        navigate('/create');
        setOpenMenuId(null);
    };

    const handleDelete = (resumeId) => {
        if (window.confirm('Are you sure you want to delete this resume?')) {
            deleteResume(resumeId);
        }
        setOpenMenuId(null);
    };

    const toggleMenu = (resumeId) => {
        setOpenMenuId(openMenuId === resumeId ? null : resumeId);
    };

    return (
        <div className="container" style={{ padding: 'var(--spacing-xl) var(--spacing-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1 style={{ marginBottom: 'var(--spacing-xs)' }}>My Resumes</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        {savedResumes.length > 0
                            ? `You have ${savedResumes.length} saved resume${savedResumes.length !== 1 ? 's' : ''}.`
                            : 'Create your first resume to get started!'}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className="btn btn-outline"
                        onClick={() => navigate('/templates')}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Layout size={20} /> Browse Templates
                    </button>
                    <button className="btn btn-primary" onClick={handleCreate}>
                        <Plus size={20} style={{ marginRight: '8px' }} /> Create New
                    </button>
                </div>
            </div>

            {loadingResumes && (
                <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--color-primary)' }}>
                    <div className="loading-spinner" style={{ margin: '0 auto var(--spacing-md)' }}></div>
                    <p>Loading your resumes from the cloud...</p>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-lg)', opacity: loadingResumes ? 0.5 : 1 }}>
                {/* Create New Card */}
                <div
                    className="card"
                    style={{
                        borderStyle: 'dashed',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        minHeight: '200px',
                        transition: 'all 0.2s ease'
                    }}
                    onClick={handleCreate}
                >
                    <div style={{
                        width: '64px', height: '64px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-bg-body)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: 'var(--spacing-md)',
                        color: 'var(--color-primary)'
                    }}>
                        <Plus size={32} />
                    </div>
                    <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: '0' }}>New Resume</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>Start from scratch</p>
                </div>

                {/* Resume Cards */}
                {savedResumes.map((resume) => (
                    <div key={resume.id} className="card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '200px' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                            <FileText size={48} color="var(--color-text-muted)" style={{ opacity: 0.5 }} />
                        </div>

                        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)', marginTop: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div>
                                    <h4 style={{ marginBottom: '4px', fontSize: 'var(--font-size-base)' }}>{resume.title}</h4>
                                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={12} /> Edited {resume.lastEdited}
                                    </p>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <button
                                        onClick={() => toggleMenu(resume.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--color-text-muted)',
                                            padding: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <MoreVertical size={16} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {openMenuId === resume.id && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '100%',
                                            right: 0,
                                            marginTop: '4px',
                                            backgroundColor: 'var(--color-bg-card)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-md)',
                                            boxShadow: 'var(--shadow-lg)',
                                            minWidth: '150px',
                                            zIndex: 10,
                                            overflow: 'hidden'
                                        }}>
                                            <button
                                                onClick={() => handleEdit(resume.id)}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 16px',
                                                    border: 'none',
                                                    background: 'transparent',
                                                    color: 'var(--color-text-main)',
                                                    textAlign: 'left',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    fontSize: 'var(--font-size-sm)'
                                                }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-bg-body)'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                            >
                                                <Edit2 size={14} />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(resume.id)}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 16px',
                                                    border: 'none',
                                                    background: 'transparent',
                                                    color: 'var(--color-secondary)',
                                                    textAlign: 'left',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    fontSize: 'var(--font-size-sm)'
                                                }}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-bg-body)'}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                            >
                                                <Trash2 size={14} />
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div style={{ marginTop: 'var(--spacing-md)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', marginBottom: '4px' }}>
                                    <span>Completion</span>
                                    <span>{resume.completion}%</span>
                                </div>
                                <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--color-bg-body)', borderRadius: '2px', overflow: 'hidden' }}>
                                    <div style={{ width: `${resume.completion}%`, height: '100%', backgroundColor: resume.completion === 100 ? 'var(--color-accent)' : 'var(--color-primary)' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
