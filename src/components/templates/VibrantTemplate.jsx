import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const VibrantTemplate = ({ data }) => {
    const { personalInfo, experience, skills, education, projects } = data;

    return (
        <div style={{
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: 'white',
            minHeight: '100%',
            position: 'relative',
            overflow: 'hidden',
            padding: '40px'
        }}>
            {/* Background Graphic Top Left */}
            <div style={{
                position: 'absolute',
                top: -100,
                left: -100,
                width: '400px',
                height: '300px',
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
                borderRadius: '50%',
                zIndex: 0,
                opacity: 0.5
            }}></div>

            {/* Background Graphic Bottom Right */}
            <div style={{
                position: 'absolute',
                bottom: -150,
                right: -100,
                width: '500px',
                height: '400px',
                background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
                borderRadius: '50%',
                zIndex: 0,
                opacity: 0.3
            }}></div>

            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>

                {/* Main Column (Left) */}
                <div>
                    <h1 style={{
                        fontSize: '48px',
                        fontWeight: '700',
                        color: '#c026d3',
                        margin: '0 0 10px 0',
                        lineHeight: 1
                    }}>
                        {personalInfo.fullName?.split(' ')[0]} <br />
                        <span style={{ fontWeight: '300', color: '#333' }}>{personalInfo.fullName?.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <h2 style={{
                        fontSize: '18px',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        color: '#db2777',
                        marginTop: '10px',
                        marginBottom: '40px'
                    }}>
                        {personalInfo.jobTitle}
                    </h2>

                    <section style={{ marginBottom: '40px' }}>
                        <h3 style={{
                            fontSize: '16px',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            color: '#c026d3',
                            borderBottom: '2px solid #fce7f3',
                            paddingBottom: '10px',
                            marginBottom: '20px'
                        }}>Professional Profile</h3>
                        <p style={{ color: '#555', lineHeight: '1.6' }}>
                            {personalInfo.summary}
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h3 style={{
                            fontSize: '16px',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            color: '#c026d3',
                            borderBottom: '2px solid #fce7f3',
                            paddingBottom: '10px',
                            marginBottom: '20px'
                        }}>Experience</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            {experience.map(exp => (
                                <div key={exp.id} style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #fce7f3' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                        <h4 style={{ margin: 0, fontSize: '18px', color: '#1f2937' }}>{exp.company}</h4>
                                        <span style={{ fontSize: '12px', color: '#db2777', backgroundColor: '#fce7f3', padding: '2px 8px', borderRadius: '10px' }}>
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#4b5563', marginBottom: '8px' }}>{exp.title}</div>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Column (Right) */}
                <div style={{ paddingTop: '20px' }}>
                    <div style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        margin: '0 auto 40px',
                        border: '5px solid white',
                        boxShadow: '0 10px 25px rgba(219, 39, 119, 0.2)',
                        backgroundColor: '#fbcfe8',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {personalInfo.photo ? (
                            <img src={personalInfo.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <span style={{ fontSize: '40px', color: '#db2777' }}>
                                {personalInfo.fullName?.charAt(0)}
                            </span>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
                        {personalInfo.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#4b5563' }}><Phone size={14} color="#db2777" /> {personalInfo.phone}</div>}
                        {personalInfo.email && <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#4b5563' }}><Mail size={14} color="#db2777" /> {personalInfo.email}</div>}
                        {personalInfo.address && <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#4b5563' }}><MapPin size={14} color="#db2777" /> {personalInfo.address}</div>}
                        {(personalInfo.portfolio || personalInfo.website) && <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#4b5563' }}><Globe size={14} color="#db2777" /> {personalInfo.portfolio || personalInfo.website}</div>}
                    </div>

                    <section style={{ marginBottom: '30px' }}>
                        <h3 style={{
                            fontSize: '15px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: '#c026d3',
                            marginBottom: '15px'
                        }}>Education</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div style={{ fontWeight: '600', fontSize: '14px', color: '#1f2937' }}>{edu.degree}</div>
                                    <div style={{ fontSize: '13px', color: '#db2777' }}>{edu.school}</div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={{ marginBottom: '30px' }}>
                        <h3 style={{
                            fontSize: '15px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: '#c026d3',
                            marginBottom: '15px'
                        }}>Expertise Skills</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {skills.map((skill, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#db2777' }}></div>
                                    <span style={{ fontSize: '14px', color: '#4b5563' }}>{skill}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={{ marginBottom: '30px' }}>
                        <h3 style={{
                            fontSize: '15px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            color: '#c026d3',
                            marginBottom: '15px'
                        }}>Languages</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ fontSize: '14px', color: '#4b5563', display: 'flex', justifyContent: 'space-between' }}>
                                <span>English</span>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    {[1, 2, 3, 4, 5].map(j => <div key={j} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#db2777' }}></div>)}
                                </div>
                            </div>
                            <div style={{ fontSize: '14px', color: '#4b5563', display: 'flex', justifyContent: 'space-between' }}>
                                <span>French</span>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    {[1, 2, 3].map(j => <div key={j} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#db2777' }}></div>)}
                                    {[4, 5].map(j => <div key={j} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e5e7eb' }}></div>)}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default VibrantTemplate;
