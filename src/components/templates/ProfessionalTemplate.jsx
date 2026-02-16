import React from 'react';

const ProfessionalTemplate = ({ data }) => {
    const { personalInfo, experience, skills, education } = data;

    return (
        <div style={{ padding: '40px 50px', backgroundColor: 'white', minHeight: '800px', color: '#111', fontFamily: "'Merriweather', serif" }}>
            {/* Header */}
            <header style={{ borderBottom: '2px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '36px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px', color: '#000000', fontWeight: '900' }}>{personalInfo.fullName}</h1>
                <p style={{ fontSize: '18px', fontStyle: 'italic', marginBottom: '15px', color: '#555' }}>{personalInfo.jobTitle}</p>
                <div style={{ fontSize: '14px', display: 'flex', gap: '15px', color: '#333' }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                </div>
            </header>

            <section style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '15px', letterSpacing: '1px', color: '#000000' }}>Profile</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#000000' }}>{personalInfo.summary}</p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '15px', letterSpacing: '1px', color: '#000000' }}>Work Experience</h3>
                {experience.map(exp => (
                    <div key={exp.id} style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000000' }}>{exp.title}</h4>
                            <span style={{ fontSize: '14px', fontStyle: 'italic', color: '#000000' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: '#000000' }}>{exp.company}</div>
                        <p style={{ fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-line', color: '#000000' }}>{exp.description}</p>
                    </div>
                ))}
            </section>

            {data.projects && data.projects.length > 0 && (
                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '15px', letterSpacing: '1px', color: '#000000' }}>Projects</h3>
                    {data.projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                                <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000000' }}>{proj.title}</h4>
                                {proj.link && <span style={{ fontSize: '14px', color: '#000000' }}>{proj.link}</span>}
                            </div>
                            <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: '#000000' }}>{proj.role} <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}>({proj.technologies})</span></div>
                            <p style={{ fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-line', color: '#000000' }}>{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}

            <div style={{ display: 'flex', gap: '40px', marginBottom: '30px' }}>
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '15px', letterSpacing: '1px', color: '#000000' }}>Education</h3>
                    {education.map(edu => (
                        <div key={edu.id} style={{ marginBottom: '15px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#000000' }}>{edu.school}</div>
                            <div style={{ fontSize: '14px', color: '#000000' }}>{edu.degree} {edu.field && `in ${edu.field}`}</div>
                            <div style={{ fontSize: '13px', fontStyle: 'italic', marginTop: '2px', color: '#000000' }}>{edu.startDate} - {edu.endDate}</div>
                            {edu.description && <p style={{ fontSize: '14px', marginTop: '5px', lineHeight: '1.5', whiteSpace: 'pre-line', color: '#000000' }}>{edu.description}</p>}
                        </div>
                    ))}
                </div>

                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '15px', letterSpacing: '1px', color: '#000000' }}>Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {skills.map(skill => (
                            <span key={skill} style={{ fontSize: '14px', border: '1px solid #333', padding: '4px 8px', borderRadius: '4px', color: '#000000', borderColor: '#000000' }}>{skill}</span>
                        ))}
                    </div>
                </div>
            </div>

            {data.achievements && data.achievements.length > 0 && (
                <section>
                    <h3 style={{ fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '15px', letterSpacing: '1px', color: '#000000' }}>Achievements</h3>
                    {data.achievements.map(ach => (
                        <div key={ach.id} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                                <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#000000' }}>{ach.title}</h4>
                                <span style={{ fontSize: '14px', fontStyle: 'italic', color: '#000000' }}>{ach.date}</span>
                            </div>
                            {ach.organization && <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px', color: '#000000' }}>{ach.organization}</div>}
                            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#000000' }}>{ach.description}</p>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};

export default ProfessionalTemplate;
