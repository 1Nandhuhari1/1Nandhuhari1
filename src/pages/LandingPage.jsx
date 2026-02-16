import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles, Wand2, ShieldCheck, FileText, Zap } from 'lucide-react';
import ResumeUploader from '../components/ResumeUploader';

const LandingPage = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="landing-page" style={{ overflowX: 'hidden' }}>

            {/* --- HERO SECTION --- */}
            <section style={{
                position: 'relative',
                padding: '120px 0 100px',
                background: 'radial-gradient(ellipse at top, rgba(0, 255, 255, 0.1) 0%, transparent 60%)',
                textAlign: 'left'
            }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', alignItems: 'center', gap: '4rem' }}>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 16px',
                                backgroundColor: 'rgba(20, 24, 32, 0.6)',
                                border: '1px solid rgba(0, 255, 255, 0.2)',
                                borderRadius: '30px',
                                color: 'var(--color-primary)',
                                fontWeight: '600',
                                fontSize: '0.85rem',
                                marginBottom: 'var(--spacing-lg)',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 0 15px rgba(0, 255, 255, 0.15)'
                            }}
                        >
                            <Sparkles size={16} />
                            <span>AI-Powered Resume Builder v2.0</span>
                        </motion.div>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            lineHeight: '1.1',
                            fontWeight: '800',
                            marginBottom: 'var(--spacing-md)',
                            background: 'linear-gradient(to right, #fff, #b0b8c0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-1px'
                        }}>
                            Craft Your <br />
                            <span style={{
                                background: 'linear-gradient(90deg, #00FFFF, #FF69B4)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>Future Career</span>
                        </h1>

                        <p style={{
                            fontSize: '1.15rem',
                            color: 'var(--color-text-muted)',
                            marginBottom: '2.5rem',
                            maxWidth: '540px',
                            lineHeight: '1.6'
                        }}>
                            Stand out with ATS-friendly templates and smart AI suggestions.
                            Build a professional resume that gets you hired faster, designed for the modern job market.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/dashboard" className="btn btn-primary" style={{
                                padding: '14px 36px',
                                fontSize: '1.05rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                borderRadius: '50px'
                            }}>
                                Build My Resume <ArrowRight size={20} />
                            </Link>
                            <Link to="/templates" className="btn btn-outline" style={{
                                padding: '14px 36px',
                                fontSize: '1.05rem',
                                borderRadius: '50px'
                            }}>
                                View Templates
                            </Link>
                        </div>
                    </motion.div>

                    {/* Visual / 3D Element Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{
                            perspective: '1000px',
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '24px',
                            padding: '24px',
                            backdropFilter: 'blur(20px)',
                            transform: 'rotateY(-5deg) rotateX(2deg)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}>
                            {/* Abstract Resume Representation */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #00FFFF, #8A2BE2)' }}></div>
                                    <div>
                                        <div style={{ width: '200px', height: '20px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', marginBottom: '8px' }}></div>
                                        <div style={{ width: '140px', height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}></div>
                                    </div>
                                </div>
                                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }}></div>
                                {[1, 2, 3].map(i => (
                                    <div key={i} style={{ display: 'flex', gap: '12px' }}>
                                        <div style={{ width: '4px', height: '40px', background: 'rgba(0, 255, 255, 0.5)', borderRadius: '2px' }}></div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ width: '60%', height: '16px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', marginBottom: '8px' }}></div>
                                            <div style={{ width: '90%', height: '12px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Floating Badges */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-30px',
                                    background: '#16a34a',
                                    color: 'white',
                                    padding: '10px 20px',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontWeight: '600',
                                    boxShadow: '0 10px 25px rgba(22, 163, 74, 0.2)'
                                }}
                            >
                                <ShieldCheck size={18} /> ATS Score: 98
                            </motion.div>

                            <motion.div
                                animate={{ y: [10, -10, 10] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    position: 'absolute',
                                    bottom: '40px',
                                    left: '-40px',
                                    background: 'linear-gradient(135deg, #00FFFF, #8A2BE2)',
                                    color: '#000',
                                    padding: '12px 24px',
                                    borderRadius: '16px',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: '0 10px 30px rgba(138, 43, 226, 0.3)'
                                }}
                            >
                                <Wand2 size={18} /> AI Enhanced
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- ATS AUDIT SECTION --- */}
            <section id="ats-audit" style={{ padding: '80px 0', position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(20,24,32,0) 0%, rgba(22, 163, 74, 0.05) 50%, rgba(20,24,32,0) 100%)',
                    pointerEvents: 'none'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span style={{ color: '#4ade80', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                            Verify Your Resume
                        </span>
                        <h2 style={{ fontSize: '2.5rem', margin: '12px 0 20px', fontWeight: '700' }}>
                            Free ATS Compatibility Check
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                            Don't let an algorithm reject you. Scan your resume against modern ATS standards instantly.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            background: 'rgba(22, 163, 74, 0.03)',
                            border: '1px solid rgba(22, 163, 74, 0.2)',
                            borderRadius: '24px',
                            padding: '20px',
                            maxWidth: '800px',
                            margin: '0 auto',
                            boxShadow: '0 0 40px rgba(22, 163, 74, 0.05)'
                        }}
                    >
                        <ResumeUploader
                            title="Upload Resume for Analysis"
                        />
                    </motion.div>
                </div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section style={{ padding: '100px 0' }} ref={targetRef}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>
                            Why Choose <span style={{ color: 'var(--color-primary)' }}>Resumer.com</span>?
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)' }}>Everything you need to land your dream job.</p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '2rem'
                        }}
                    >
                        {[
                            {
                                icon: <Wand2 size={24} />,
                                title: 'AI Writer Assistant',
                                desc: 'Overcome writer\'s block. Our AI generates impactful bullet points tailored to your role.',
                                color: '#8A2BE2'
                            },
                            {
                                icon: <ShieldCheck size={24} />,
                                title: 'ATS Optimized',
                                desc: 'Templates rigorously tested against Applicant Tracking Systems to ensure you get seen.',
                                color: '#16a34a'
                            },
                            {
                                icon: <Zap size={24} />,
                                title: 'Real-time Preview',
                                desc: 'See your changes instantly. No more guessing how your PDF will look.',
                                color: '#FF69B4'
                            },
                            {
                                icon: <FileText size={24} />,
                                title: 'Smart Templates',
                                desc: 'Professionally designed templates that balance creativity with readability.',
                                color: '#00FFFF'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="card"
                                style={{
                                    padding: '30px',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: 0, right: 0,
                                    width: '100px', height: '100px',
                                    background: `radial-gradient(circle at top right, ${feature.color}20, transparent 70%)`
                                }}></div>

                                <div style={{
                                    width: '56px', height: '56px',
                                    borderRadius: '16px',
                                    backgroundColor: `${feature.color}15`,
                                    color: feature.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '20px'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: '600' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default LandingPage;


