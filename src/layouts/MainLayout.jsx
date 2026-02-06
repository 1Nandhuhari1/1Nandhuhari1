import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FileText, User, LogIn } from 'lucide-react';
import ThemeSwitcher from '../components/ThemeSwitcher';

const MainLayout = () => {
    const location = useLocation();
    const isDashboard = location.pathname.includes('/dashboard');

    return (
        <div className="layout-root">
            {/* Navigation */}
            <nav className="navbar" style={{
                borderBottom: '1px solid var(--color-border)',
                padding: 'var(--spacing-md) 0',
                backgroundColor: 'var(--color-bg-card)'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'var(--color-text-main)' }}>
                        <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '6px', borderRadius: '8px' }}>
                            <FileText size={24} />
                        </div>
                        <span>Resumer.com</span>
                    </Link>

                    <div className="nav-links" style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                        <ThemeSwitcher />
                        {isDashboard ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Welcome, User</span>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={18} />
                                </div>
                            </div>
                        ) : (
                            <Link to="/dashboard" className="btn btn-outline" style={{ display: 'flex', gap: '8px' }}>
                                <LogIn size={18} />
                                <span>Sign In</span>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main style={{ minHeight: 'calc(100vh - 140px)' }}>
                <Outlet />
            </main>

            {/* Footer */}
            <footer style={{
                backgroundColor: 'var(--color-bg-card)',
                borderTop: '1px solid var(--color-border)',
                padding: 'var(--spacing-lg) 0',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
                marginTop: 'auto'
            }}>
                <div className="container">
                    <p>© 2026 Resumer.com. Built for excellence.</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
