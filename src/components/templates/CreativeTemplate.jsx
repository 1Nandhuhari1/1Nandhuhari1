import React from 'react';

const CreativeTemplate = ({ data }) => {
    const { personalInfo, experience, skills, education } = data;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', minHeight: '800px', backgroundColor: 'white' }}>
            {/* Left Column (Yellow/Black) */}
            <div style={{ backgroundColor: '#FCD34D', padding: '40px 30px', color: '#1F2937' }}>
                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '42px', fontWeight: '900', lineHeight: '1', marginBottom: '15px' }}>
                        {personalInfo.fullName?.split(' ')[0]}<br />
                        <span style={{ color: 'white', textShadow: '2px 2px 0 #1F2937' }}>{personalInfo.fullName?.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>{personalInfo.jobTitle}</p>
                </div>

                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', borderBottom: '3px solid #1F2937', paddingBottom: '5px', marginBottom: '20px' }}>CONTACT</h3>
                    <div style={{ fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px', fontWeight: '500' }}>
                        {personalInfo.email && <div>{personalInfo.email}</div>}
                        {personalInfo.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo.portfolio && <div>{personalInfo.portfolio}</div>}
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', borderBottom: '3px solid #1F2937', paddingBottom: '5px', marginBottom: '20px' }}>SKILLS</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {skills.map(skill => (
                            <span key={skill} style={{ backgroundColor: '#1F2937', color: '#FCD34D', padding: '6px 12px', fontSize: '13px', fontWeight: 'bold' }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column (White) */}
            <div style={{ padding: '60px 40px', color: '#333' }}>
                <section style={{ marginBottom: '40px' }}>
                    <p style={{ fontSize: '16px', lineHeight: '1.7', fontWeight: '500' }}>{personalInfo.summary}</p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#1F2937', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '12px', height: '12px', backgroundColor: '#FCD34D' }}></span> EXPERIENCE
                    </h3>
                    {experience.map(exp => (
                        <div key={exp.id} style={{ marginBottom: '30px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #F3F4F6' }}>
                            <div style={{ marginBottom: '8px' }}>
                                <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{exp.title}</h4>
                                <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: '600' }}>
                                    {exp.company} | {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </div>
                            </div>
                            <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: '#4B5563' }}>{exp.description}</p>
                        </div>
                    ))}
                </section>

                {data.projects && data.projects.length > 0 && (
                    <section style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#1F2937', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '12px', height: '12px', backgroundColor: '#FCD34D' }}></span> PROJECTS
                        </h3>
                        {data.projects.map(proj => (
                            <div key={proj.id} style={{ marginBottom: '30px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #F3F4F6' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{proj.title}</h4>
                                    <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: '600' }}>
                                        {proj.role} {proj.technologies && `| ${proj.technologies}`}
                                    </div>
                                    {proj.link && <div style={{ fontSize: '14px', color: '#F59E0B' }}>{proj.link}</div>}
                                </div>
                                <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: '#4B5563' }}>{proj.description}</p>
                            </div>
                        ))}
                    </section>
                )}

                <section style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#1F2937', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '12px', height: '12px', backgroundColor: '#FCD34D' }}></span> EDUCATION
                    </h3>
                    {education.map(edu => (
                        <div key={edu.id} style={{ marginBottom: '15px' }}>
                            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{edu.school}</div>
                            <div style={{ color: '#4B5563' }}>{edu.degree}, {edu.field}</div>
                            <div style={{ fontSize: '13px', color: '#9CA3AF' }}>{edu.startDate} - {edu.endDate}</div>
                        </div>
                    ))}
                </section>

                {data.achievements && data.achievements.length > 0 && (
                    <section>
                        <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#1F2937', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ width: '12px', height: '12px', backgroundColor: '#FCD34D' }}></span> ACHIEVEMENTS
                        </h3>
                        {data.achievements.map(ach => (
                            <div key={ach.id} style={{ marginBottom: '15px' }}>
                                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{ach.title}</div>
                                <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: '600', marginBottom: '2px' }}>
                                    {ach.organization && <span>{ach.organization} | </span>}{ach.date}
                                </div>
                                <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: '#4B5563' }}>{ach.description}</p>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
};

export default CreativeTemplate;
