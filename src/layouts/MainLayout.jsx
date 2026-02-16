import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const isDashboard = location.pathname.includes('/dashboard');

    return (
        <div className="layout-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Navigation */}
            <nav className="navbar" style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
                padding: 'var(--spacing-md) 0',
                backgroundColor: 'rgba(20, 24, 32, 0.8)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-xs)',
                        textDecoration: 'none',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        <img src="/logo.svg" alt="Resumer.com Logo" style={{ width: '48px', height: '48px', objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.3))' }} />
                        <span style={{
                            fontSize: '1.5rem',
                            fontWeight: '800',
                            background: 'linear-gradient(to right, #fff, #b0b8c0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.5px'
                        }}>Resumer<span style={{ color: 'var(--color-primary)' }}>.ai</span></span>
                    </Link>

                    <div className="nav-links" style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                        <ThemeSwitcher />
                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    padding: '4px 12px 4px 4px',
                                    borderRadius: '50px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                        color: '#000',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        {user.email.substring(0, 2).toUpperCase()}
                                    </div>
                                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-main)', fontWeight: '500' }}>Account</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="btn btn-outline"
                                    style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '30px', borderWidth: '1px' }}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-primary" style={{
                                display: 'flex',
                                gap: '8px',
                                alignItems: 'center',
                                padding: '8px 20px',
                                borderRadius: '30px',
                                fontSize: '0.9rem'
                            }}>
                                <LogIn size={18} />
                                <span>Sign In</span>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </main>

            {/* Footer */}
            <footer style={{
                backgroundColor: 'rgba(20, 24, 32, 0.95)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                padding: 'var(--spacing-xl) 0',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
                backdropFilter: 'blur(10px)'
            }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.8 }}>
                        <img src="/logo.svg" alt="Logo" style={{ width: '32px', height: '32px', opacity: 0.7 }} />
                        <span style={{ fontWeight: '600' }}>Resumer.ai</span>
                    </div>
                    <p style={{ fontSize: '0.9rem' }}>© 2026 Resumer.ai. Empowering careers with AI intelligence.</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
