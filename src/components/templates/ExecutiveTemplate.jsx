import React from 'react';

const ExecutiveTemplate = ({ data }) => {
    const { personalInfo, experience, skills, education } = data;

    return (
        <div style={{ padding: '50px', backgroundColor: 'white', minHeight: '800px', color: '#0F172A', fontFamily: 'system-ui, sans-serif' }}>

            <div style={{ textAlign: 'center', borderBottom: '4px solid #0F172A', paddingBottom: '25px', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '32px', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: '900', margin: '0 0 10px 0', color: '#000000' }}>{personalInfo.fullName}</h1>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>
                    {personalInfo.email && <span>EMAIL: {personalInfo.email}</span>}
                    {personalInfo.phone && <span>PHONE: {personalInfo.phone}</span>}
                    {personalInfo.linkedin && <span>LINKEDIN: {personalInfo.linkedin}</span>}
                </div>
            </div>

            <section style={{ marginBottom: '30px' }}>
                <h3 style={{ backgroundColor: '#0F172A', color: 'white', padding: '5px 10px', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '15px' }}>Executive Summary</h3>
                <p style={{ fontSize: '15px', lineHeight: '1.6', textAlign: 'justify' }}>{personalInfo.summary}</p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h3 style={{ backgroundColor: '#0F172A', color: 'white', padding: '5px 10px', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '15px' }}>Professional Experience</h3>
                {experience.map(exp => (
                    <div key={exp.id} style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', borderBottom: '1px solid #E2E8F0', paddingBottom: '3px' }}>
                            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>{exp.company}</h4>
                            <span style={{ fontSize: '14px', fontWeight: '600' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#334155', marginBottom: '8px', textTransform: 'uppercase' }}>{exp.title}</div>
                        <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{exp.description}</p>
                    </div>
                ))}
            </section>

            {data.projects && data.projects.length > 0 && (
                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ backgroundColor: '#0F172A', color: 'white', padding: '5px 10px', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '15px' }}>Notable Projects</h3>
                    {data.projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', borderBottom: '1px solid #E2E8F0', paddingBottom: '3px' }}>
                                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>{proj.title}</h4>
                                {proj.link && <span style={{ fontSize: '14px', color: '#64748B' }}>{proj.link}</span>}
                            </div>
                            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#334155', marginBottom: '8px', fontStyle: 'italic' }}>{proj.role}</div>
                            <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '30px' }}>
                <section>
                    <h3 style={{ backgroundColor: '#0F172A', color: 'white', padding: '5px 10px', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '15px' }}>Education</h3>
                    {education.map(edu => (
                        <div key={edu.id} style={{ marginBottom: '15px' }}>
                            <div style={{ fontWeight: '800', fontSize: '15px' }}>{edu.school}</div>
                            <div style={{ fontSize: '14px' }}>{edu.degree}{edu.field && `, ${edu.field}`}</div>
                            <div style={{ fontSize: '13px', color: '#64748B' }}>{edu.startDate} - {edu.endDate}</div>
                            {edu.description && <p style={{ fontSize: '14px', marginTop: '5px', lineHeight: '1.5', margin: 0 }}>{edu.description}</p>}
                        </div>
                    ))}
                </section>

                <section>
                    <h3 style={{ backgroundColor: '#0F172A', color: 'white', padding: '5px 10px', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '15px' }}>Core Competencies</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {skills.map(skill => (
                            <span key={skill} style={{ fontSize: '13px', fontWeight: '600', backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '4px' }}>{skill}</span>
                        ))}
                    </div>
                </section>
            </div>

            {data.achievements && data.achievements.length > 0 && (
                <section>
                    <h3 style={{ backgroundColor: '#0F172A', color: 'white', padding: '5px 10px', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'inline-block', marginBottom: '15px' }}>Achievements</h3>
                    {data.achievements.map(ach => (
                        <div key={ach.id} style={{ marginBottom: '10px' }}>
                            <div style={{ fontWeight: '800', fontSize: '15px' }}>{ach.title}</div>
                            <div style={{ fontSize: '14px', color: '#334155', fontWeight: '600', marginBottom: '2px' }}>
                                {ach.organization && <span>{ach.organization} • </span>}{ach.date}
                            </div>
                            <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{ach.description}</p>
                        </div>
                    ))}
                </section>
            )}

        </div>
    );
};

export default ExecutiveTemplate;
