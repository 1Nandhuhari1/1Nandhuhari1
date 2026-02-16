import React from 'react';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';

const NoirTemplate = ({ data }) => {
    const { personalInfo, experience, skills, education, projects, achievements } = data;

    return (
        <div style={{
            fontFamily: "'Courier New', Courier, monospace",
            backgroundColor: '#111',
            color: '#eee',
            minHeight: '100%',
            padding: '40px',
            lineHeight: '1.6'
        }}>
            {/* Header */}
            <header style={{
                textAlign: 'center',
                marginBottom: '40px',
                borderBottom: '1px solid #333',
                paddingBottom: '30px'
            }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid #ff69b4',
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#222'
                }}>
                    {personalInfo.photo ? (
                        <img src={personalInfo.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ fontSize: '40px', color: '#ff69b4' }}>
                            {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'A'}
                        </span>
                    )}
                </div>

                <h1 style={{
                    fontSize: '36px',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    color: '#ff69b4',
                    margin: '0 0 10px 0'
                }}>
                    {personalInfo.fullName}
                </h1>
                <p style={{
                    fontSize: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: '#eee',
                    margin: 0
                }}>
                    {personalInfo.jobTitle}
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                {/* Left Column */}
                <div>
                    {/* Experience */}
                    <section style={{ marginBottom: '40px' }}>
                        <h3 style={{
                            fontSize: '18px',
                            color: '#eee',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '20px'
                        }}>
                            <span style={{ width: '12px', height: '12px', background: '#ff69b4' }}></span>
                            WORK EXPERIENCE
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <h4 style={{ margin: '0 0 5px 0', color: '#ccc', fontStyle: 'italic' }}>
                                        {exp.title}, {exp.company}
                                    </h4>
                                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#aaa', margin: 0 }}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills */}
                    <section>
                        <h3 style={{
                            fontSize: '18px',
                            color: '#eee',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '20px'
                        }}>
                            <span style={{ width: '12px', height: '12px', background: '#ff69b4' }}></span>
                            SKILL
                        </h3>
                        <div style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.8' }}>
                            {skills.map((skill, i) => (
                                <div key={i}>{skill}</div>
                            ))}
                        </div>
                    </section>

                    {/* Contact */}
                    <section style={{ marginTop: '40px' }}>
                        <h3 style={{
                            fontSize: '18px',
                            color: '#eee',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '20px'
                        }}>
                            <span style={{ width: '12px', height: '12px', background: '#ff69b4' }}></span>
                            CONTACT
                        </h3>
                        <div style={{ color: '#aaa', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {personalInfo.email && <div>{personalInfo.email}</div>}
                            {personalInfo.phone && <div>{personalInfo.phone}</div>}
                            {personalInfo.address && <div>{personalInfo.address}</div>}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div>
                    <div style={{ marginBottom: '40px', color: '#aaa', fontSize: '14px', fontStyle: 'italic' }}>
                        {personalInfo.summary && `"${personalInfo.summary}"`}
                    </div>

                    {/* Education */}
                    <section style={{ marginBottom: '40px' }}>
                        <h3 style={{
                            fontSize: '18px',
                            color: '#eee',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '20px'
                        }}>
                            <span style={{ width: '12px', height: '12px', background: '#ff69b4' }}></span>
                            EDUCATION
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                        {edu.startDate} - {edu.endDate}
                                    </div>
                                    <h4 style={{ margin: '0 0 2px 0', color: '#ccc', textTransform: 'uppercase' }}>
                                        {edu.school}
                                    </h4>
                                    <div style={{ fontSize: '13px', color: '#aaa' }}>
                                        {edu.degree}{edu.field && `, ${edu.field}`}
                                    </div>
                                    {edu.description && <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section>
                            <h3 style={{
                                fontSize: '18px',
                                color: '#eee',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '20px'
                            }}>
                                <span style={{ width: '12px', height: '12px', background: '#ff69b4' }}></span>
                                PROJECTS
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {projects.map(proj => (
                                    <div key={proj.id}>
                                        <h4 style={{ margin: '0 0 5px 0', color: '#ccc' }}>{proj.title}</h4>
                                        <p style={{ fontSize: '13px', color: '#aaa', margin: 0 }}>
                                            {proj.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div >
        </div >
    );
};

export default NoirTemplate;
