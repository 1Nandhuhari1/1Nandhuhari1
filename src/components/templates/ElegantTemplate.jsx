import React from 'react';

const ElegantTemplate = ({ data }) => {
    const { personalInfo, experience, skills, education, projects, achievements } = data;

    return (
        <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            backgroundColor: 'white',
            minHeight: '100%',
            display: 'flex'
        }}>
            {/* Sidebar Left - Photo & Contact */}
            <div style={{
                width: '35%',
                padding: '40px 30px',
                borderRight: '1px solid #eee',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {/* Photo Placeholder */}
                <div style={{
                    width: '180px',
                    height: '240px',
                    backgroundColor: '#e5e5e5',
                    marginBottom: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '14px'
                }}>
                    PHOTO
                </div>

                <div style={{ width: '100%', fontSize: '13px', color: '#555', lineHeight: '2' }}>
                    <div style={{ marginBottom: '20px' }}>{personalInfo.phone || '123-456-7890'}</div>
                    <div style={{ marginBottom: '20px' }}>{personalInfo.email || 'hello@reallygreatsite.com'}</div>
                    <div style={{ marginBottom: '20px' }}>{personalInfo.address || '123 Anywhere St., Any City'}</div>
                    <div style={{ marginBottom: '20px' }}>{personalInfo.portfolio || 'reallygreatsite.com'}</div>
                </div>

                <div style={{ width: '100%', marginTop: '40px' }}>
                    <h3 style={{
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        borderBottom: '2px solid #333',
                        paddingBottom: '5px',
                        marginBottom: '20px',
                        color: '#333'
                    }}>
                        Expertise Skills
                    </h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                        {skills.map((skill, i) => (
                            <li key={i} style={{ marginBottom: '5px' }}>{skill}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main Content - Beige Header & Body */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{
                    backgroundColor: '#e6e1d8',
                    padding: '60px 40px',
                    textAlign: 'center'
                }}>
                    <h1 style={{
                        fontSize: '32px',
                        letterSpacing: '3px',
                        color: '#4a4a4a',
                        textTransform: 'uppercase',
                        margin: '0 0 10px 0',
                        fontWeight: '400'
                    }}>
                        {personalInfo.fullName || 'JULIANA SILVA'}
                    </h1>
                    <p style={{
                        fontSize: '14px',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        color: '#666',
                        margin: 0
                    }}>
                        {personalInfo.jobTitle || 'FREELANCE MAKEUP ARTIST'}
                    </p>
                </div>

                {/* Body */}
                <div style={{
                    backgroundColor: '#e6e1d8', // Continuing the beige, split background
                    flex: 1,
                    display: 'flex'
                }}>
                    {/* Actually, looking at the reference, the right side is split vertically? No, it's just a background color block. 
                       Wait, the image shows a white left sidebar and a beige right main area. 
                       Let's adjust the layout to match that.
                    */}
                </div>
            </div>

        </div>
    );
};

// Re-implementing correctly based on layout observation
const ElegantTemplateRevised = ({ data }) => {
    const { personalInfo, experience, skills, education, projects } = data;

    return (
        <div style={{
            fontFamily: "'Inter', sans-serif",
            display: 'flex',
            minHeight: '100%',
            backgroundColor: 'white'
        }}>
            {/* Left Sidebar (White) */}
            <div style={{
                width: '32%',
                padding: '40px 30px',
                color: '#333'
            }}>
                <div style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    backgroundColor: '#d1d5db',
                    marginBottom: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280',
                    overflow: 'hidden'
                }}>
                    {personalInfo.photo ? (
                        <img src={personalInfo.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span style={{ fontSize: '48px' }}>
                            {personalInfo.fullName?.charAt(0) || 'IMG'}
                        </span>
                    )}
                </div>

                <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '50px' }}>
                    <div>
                        {personalInfo.phone}
                    </div>
                    <div>
                        {personalInfo.email}
                    </div>
                    <div>
                        {personalInfo.address}
                    </div>
                    <div>
                        {personalInfo.website || personalInfo.portfolio}
                    </div>
                </div>

                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        borderBottom: '1px solid #333',
                        paddingBottom: '8px',
                        marginBottom: '20px',
                        fontWeight: '700',
                        color: '#2d334a'
                    }}>
                        Expertise Skills
                    </h3>
                    <ul style={{ paddingLeft: '15px', fontSize: '13px', lineHeight: '1.8' }}>
                        {skills.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>

                {education.length > 0 && (
                    <div>
                        <h3 style={{
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            borderBottom: '1px solid #333',
                            paddingBottom: '8px',
                            marginBottom: '20px',
                            fontWeight: '700',
                            color: '#2d334a'
                        }}>
                            Education
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '13px' }}>
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div style={{ fontWeight: '600' }}>{edu.degree}{edu.field && `, ${edu.field}`}</div>
                                    <div>{edu.school}, {edu.startDate} - {edu.endDate}</div>
                                    {edu.description && <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', fontStyle: 'italic' }}>{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Main Area (Beige) */}
            <div style={{
                flex: 1,
                backgroundColor: '#e8e6e1',
                padding: '60px 50px'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{
                        fontSize: '36px',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        color: '#46403c',
                        margin: '0 0 15px 0',
                        fontWeight: '400'
                    }}>
                        {personalInfo.fullName}
                    </h1>
                    <p style={{
                        fontSize: '14px',
                        letterSpacing: '5px',
                        textTransform: 'uppercase',
                        color: '#2d334a',
                        fontWeight: '600',
                        margin: 0
                    }}>
                        {personalInfo.jobTitle}
                    </p>
                </div>

                <div style={{ marginBottom: '50px', fontSize: '14px', lineHeight: '1.6', color: '#46403c', textAlign: 'justify' }}>
                    {personalInfo.summary}
                </div>

                <section>
                    <h3 style={{
                        fontSize: '16px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: '700',
                        color: '#2d334a', // Dark blueish
                        borderBottom: '1px solid #bcbab5',
                        paddingBottom: '10px',
                        marginBottom: '30px',
                        display: 'inline-block'
                    }}>
                        Professional Experience
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <div style={{ fontWeight: '700', fontSize: '15px', color: '#2d334a' }}>{exp.company}</div>
                                    <div style={{ fontSize: '13px', color: '#666' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                                </div>
                                <div style={{ fontSize: '14px', fontStyle: 'italic', marginBottom: '10px', color: '#444' }}>{exp.title}</div>
                                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#46403c', margin: 0 }}>
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
};

export default ElegantTemplateRevised;
