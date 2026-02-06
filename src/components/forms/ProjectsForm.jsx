import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash, Wand2 } from 'lucide-react';

const ProjectsForm = () => {
    const { resumeData, addItem, removeItem } = useResume();
    const [isAdding, setIsAdding] = useState(false);
    const [newProject, setNewProject] = useState({
        title: '',
        role: '',
        technologies: '',
        link: '',
        description: ''
    });
    const [isEnhancing, setIsEnhancing] = useState(false);

    const handleSave = () => {
        if (newProject.title) {
            addItem('projects', newProject);
            setNewProject({ title: '', role: '', technologies: '', link: '', description: '' });
            setIsAdding(false);
        }
    };

    const handleEnhance = () => {
        setIsEnhancing(true);
        setTimeout(() => {
            setNewProject(prev => ({
                ...prev,
                description: prev.description + "\n• Developed a scalable solution using modern technologies.\n• Optimized performance by 30% through efficient code practices."
            }));
            setIsEnhancing(false);
        }, 1500);
    };

    return (
        <div className="form-section">
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Projects</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                Showcase your relevant projects. Include technologies used and key outcomes.
            </p>

            {resumeData.projects.map((project) => (
                <div key={project.id} className="card" style={{ marginBottom: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                        <h4 style={{ marginBottom: '4px' }}>{project.title}</h4>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                            {project.role} • {project.technologies}
                        </p>
                    </div>
                    <button
                        className="btn"
                        style={{ color: 'var(--color-secondary)', padding: '4px' }}
                        onClick={() => removeItem('projects', project.id)}
                    >
                        <Trash size={16} />
                    </button>
                </div>
            ))}

            {isAdding ? (
                <div className="card" style={{ border: '2px solid var(--color-primary)', backgroundColor: 'var(--color-bg-body)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                        <div className="form-group">
                            <label className="label">Project Title</label>
                            <input
                                type="text" className="input" placeholder="e.g. E-commerce Platform"
                                value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Role</label>
                            <input
                                type="text" className="input" placeholder="e.g. Full Stack Developer"
                                value={newProject.role} onChange={(e) => setNewProject({ ...newProject, role: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Technologies</label>
                            <input
                                type="text" className="input" placeholder="e.g. React, Node.js, MongoDB"
                                value={newProject.technologies} onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Project Link</label>
                            <input
                                type="text" className="input" placeholder="e.g. github.com/username/project"
                                value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
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
                            placeholder="Describe the project and your contributions..."
                            value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
                        <button className="btn btn-primary" onClick={handleSave}>Save Project</button>
                        <button className="btn btn-outline" onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <button
                    className="btn btn-outline"
                    style={{ width: '100%', borderStyle: 'dashed' }}
                    onClick={() => setIsAdding(true)}
                >
                    <Plus size={18} style={{ marginRight: '8px' }} /> Add Project
                </button>
            )}
        </div>
    );
};

export default ProjectsForm;
