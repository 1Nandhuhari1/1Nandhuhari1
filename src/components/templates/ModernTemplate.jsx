import React from 'react';
import { Mail, Phone, Linkedin, Globe } from 'lucide-react';

const ModernTemplate = ({ data }) => {
    const { personalInfo, experience, skills, education } = data;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', minHeight: '800px', backgroundColor: 'white', border: '1px solid #ddd', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            {/* Sidebar */}
            <div style={{ backgroundColor: '#2d3748', color: 'white', padding: '30px 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ width: '100px', height: '100px', backgroundColor: '#4fd1c5', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }}>
                        {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'U'}
                    </div>
                    <h2 style={{ fontSize: '24px', margin: 0, color: 'white' }}>{personalInfo.fullName}</h2>
                    <p style={{ color: '#81e6d9', margin: '5px 0' }}>{personalInfo.jobTitle}</p>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ borderBottom: '1px solid #4a5568', paddingBottom: '10px', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', marginTop: '15px' }}>
                        {personalInfo.email && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Mail size={14} /> <span>{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo.phone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Phone size={14} /> <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.linkedin && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Linkedin size={14} /> <span>LinkedIn</span>
                            </div>
                        )}
                        {personalInfo.portfolio && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Globe size={14} /> <span>Portfolio</span>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <h3 style={{ borderBottom: '1px solid #4a5568', paddingBottom: '10px', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '15px' }}>
                        {skills.map((skill, index) => (
                            <span key={index} style={{ backgroundColor: '#4a5568', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ padding: '40px 30px' }}>
                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#2d3748', borderBottom: '2px solid #4fd1c5', paddingBottom: '5px', textTransform: 'uppercase' }}>Profile</h3>
                    <p style={{ marginTop: '10px', color: '#4a5568', lineHeight: '1.6' }}>{personalInfo.summary}</p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ color: '#2d3748', borderBottom: '2px solid #4fd1c5', paddingBottom: '5px', textTransform: 'uppercase' }}>Experience</h3>
                    <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <h4 style={{ margin: 0, fontSize: '18px', color: '#2d3748' }}>{exp.title}</h4>
                                    <span style={{ fontSize: '14px', color: '#718096', fontWeight: 'bold' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                                </div>
                                <div style={{ color: '#4fd1c5', fontWeight: '600', marginBottom: '5px' }}>{exp.company}</div>
                                <p style={{ margin: 0, color: '#4a5568', fontSize: '14px', lineHeight: '1.5' }}>{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {education.length > 0 && (
                    <section style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#2d3748', borderBottom: '2px solid #4fd1c5', paddingBottom: '5px', textTransform: 'uppercase' }}>Education</h3>
                        <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <h4 style={{ margin: 0, fontSize: '18px', color: '#2d3748' }}>{edu.degree}</h4>
                                        <span style={{ fontSize: '14px', color: '#718096', fontWeight: 'bold' }}>{edu.graduationDate}</span>
                                    </div>
                                    <div style={{ color: '#4fd1c5', fontWeight: '600', marginBottom: '5px' }}>{edu.school}</div>
                                    <p style={{ margin: 0, color: '#4a5568', fontSize: '14px', lineHeight: '1.5' }}>{edu.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.projects && data.projects.length > 0 && (
                    <section style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: '#2d3748', borderBottom: '2px solid #4fd1c5', paddingBottom: '5px', textTransform: 'uppercase' }}>Key Projects</h3>
                        <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {data.projects.map(proj => (
                                <div key={proj.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <h4 style={{ margin: 0, fontSize: '18px', color: '#2d3748' }}>{proj.title}</h4>
                                        {proj.link && <span style={{ fontSize: '14px', color: '#4fd1c5' }}>{proj.link}</span>}
                                    </div>
                                    <div style={{ color: '#718096', fontWeight: '600', marginBottom: '5px', fontSize: '14px' }}>
                                        {proj.role} {proj.technologies && `• ${proj.technologies}`}
                                    </div>
                                    <p style={{ margin: 0, color: '#4a5568', fontSize: '14px', lineHeight: '1.5' }}>{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.achievements && data.achievements.length > 0 && (
                    <section>
                        <h3 style={{ color: '#2d3748', borderBottom: '2px solid #4fd1c5', paddingBottom: '5px', textTransform: 'uppercase' }}>Achievements</h3>
                        <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {data.achievements.map(ach => (
                                <div key={ach.id}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <h4 style={{ margin: 0, fontSize: '16px', color: '#2d3748' }}>{ach.title}</h4>
                                        <span style={{ fontSize: '14px', color: '#718096' }}>{ach.date}</span>
                                    </div>
                                    {ach.organization && <div style={{ color: '#4fd1c5', fontWeight: '600', marginBottom: '2px', fontSize: '14px' }}>{ach.organization}</div>}
                                    <p style={{ margin: 0, color: '#4a5568', fontSize: '14px', lineHeight: '1.5' }}>{ach.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ModernTemplate;
