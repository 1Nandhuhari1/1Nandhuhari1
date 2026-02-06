import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import ResumeUploader from '../components/ResumeUploader';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section style={{
                padding: 'var(--spacing-xl) 0',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, var(--color-bg-body), white)'
            }}>
                <div className="container">
                    <div style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                        color: 'var(--color-primary)',
                        borderRadius: '20px',
                        fontWeight: '600',
                        fontSize: 'var(--font-size-sm)',
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Sparkles size={14} /> AI-Powered Resume Builder
                        </span>
                    </div>
                    <h1 style={{ fontSize: '3.5rem', lineHeight: '1.2', marginBottom: 'var(--spacing-md)' }}>
                        Craft Your Perfect Resume <br />
                        <span style={{ color: 'var(--color-primary)' }}>in Minutes, Not Hours</span>
                    </h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
                        Stand out with ATS-friendly templates and smart AI suggestions.
                        Build a professional resume that gets you hired faster.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
                        <Link to="/dashboard" className="btn btn-primary" style={{ padding: '12px 32px', fontSize: 'var(--font-size-lg)' }}>
                            Build My Resume <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                        </Link>
                        <Link to="/templates" className="btn btn-outline" style={{ padding: '12px 32px', fontSize: 'var(--font-size-lg)' }}>
                            View Templates
                        </Link>
                    </div>
                </div>
            </section>

            {/* Smart Upload Section */}
            <section style={{ backgroundColor: '#f9fafb', padding: 'var(--spacing-xl) 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Already have a resume?</h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                            Upload your existing PDF or DOCX to auto-fill your new resume.
                        </p>
                    </div>
                    <ResumeUploader />
                </div>
            </section>

            {/* Features Preview */}
            <section style={{ padding: 'var(--spacing-xl) 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'var(--spacing-lg)',
                        marginTop: 'var(--spacing-xl)'
                    }}>
                        {[
                            { title: 'AI Writer', desc: 'Auto-generate impactful descriptions with smart AI.' },
                            { title: 'ATS Optimized', desc: 'Templates designed to pass Applicant Tracking Systems.' },
                            { title: 'Real-time Preview', desc: 'See changes instantly as you type and edit.' }
                        ].map((feature, index) => (
                            <div key={index} className="card" style={{ padding: 'var(--spacing-xl)' }}>
                                <div style={{
                                    width: '48px', height: '48px',
                                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                                    color: 'var(--color-primary)',
                                    borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: 'var(--spacing-md)'
                                }}>
                                    <CheckCircle size={24} />
                                </div>
                                <h3 style={{ fontSize: 'var(--font-size-xl)' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
