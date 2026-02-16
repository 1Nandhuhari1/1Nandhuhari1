import React from 'react';

const MinimalistTemplate = ({ data }) => {
    const { personalInfo, experience, skills } = data;

    return (
        <div style={{ padding: '40px', backgroundColor: 'white', border: '1px solid #ddd', minHeight: '800px', color: '#333', fontFamily: 'Times New Roman, serif' }}>
            <header style={{ borderBottom: '1px solid #000', paddingBottom: '20px', marginBottom: '20px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '28px', textTransform: 'uppercase', marginBottom: '10px', color: '#000000', fontWeight: '900' }}>{personalInfo.fullName}</h1>
                <div style={{ fontSize: '14px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>| {personalInfo.phone}</span>}
                    {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
                </div>
            </header>

            <section style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#000000', fontWeight: 'bold' }}>Summary</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#000000' }}>{personalInfo.summary}</p>
            </section>

            <section style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#000000', fontWeight: 'bold' }}>Experience</h3>
                {experience.map(exp => (
                    <div key={exp.id} style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '15px', color: '#000000' }}>
                            <span>{exp.title}, {exp.company}</span>
                            <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                        </div>
                        <p style={{ fontSize: '14px', marginTop: '5px', lineHeight: '1.5', color: '#000000' }}>{exp.description}</p>
                    </div>
                ))}
            </section>

            {data.projects && data.projects.length > 0 && (
                <section style={{ marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#000000', fontWeight: 'bold' }}>Projects</h3>
                    {data.projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '15px', color: '#000000' }}>
                                <span>{proj.title}</span>
                                {proj.link && <span style={{ fontWeight: 'normal', fontSize: '14px', color: '#000000' }}>{proj.link}</span>}
                            </div>
                            <div style={{ fontSize: '14px', fontStyle: 'italic', marginBottom: '5px', color: '#000000' }}>{proj.role} • {proj.technologies}</div>
                            <p style={{ fontSize: '14px', marginTop: '5px', lineHeight: '1.5', color: '#000000' }}>{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {data.education && data.education.length > 0 && (
                <section style={{ marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#000000', fontWeight: 'bold' }}>Education</h3>
                    {data.education.map(edu => (
                        <div key={edu.id} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '15px', color: '#000000' }}>
                                <span>{edu.school}</span>
                                <span>{edu.startDate} - {edu.endDate}</span>
                            </div>
                            <div style={{ fontSize: '14px', color: '#000000' }}>{edu.degree} {edu.field && `in ${edu.field}`}</div>
                            {edu.description && <p style={{ fontSize: '14px', marginTop: '5px', lineHeight: '1.5', color: '#000000' }}>{edu.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            <section style={{ marginBottom: '25px' }}>
                <h3 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#000000', fontWeight: 'bold' }}>Skills</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#000000' }}>{skills.join(' • ')}</p>
            </section>

            {data.achievements && data.achievements.length > 0 && (
                <section>
                    <h3 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#000000', fontWeight: 'bold' }}>Achievements</h3>
                    {data.achievements.map(ach => (
                        <div key={ach.id} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', color: '#000000' }}>
                                <span>{ach.title}</span>
                                <span>{ach.date}</span>
                            </div>
                            {ach.organization && <div style={{ fontSize: '14px', fontStyle: 'italic', marginBottom: '2px', color: '#000000' }}>{ach.organization}</div>}
                            <p style={{ fontSize: '14px', marginTop: '2px', lineHeight: '1.5', color: '#000000' }}>{ach.description}</p>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};

export default MinimalistTemplate;
