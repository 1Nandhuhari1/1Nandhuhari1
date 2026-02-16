import React, { useState, useEffect, useRef } from 'react';
import { Palette, Check, AlertCircle, Loader } from 'lucide-react';

const ThemeSwitcher = () => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('selectedTheme') || 'default';
    });
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const dropdownRef = useRef(null);

    const themes = [
        { id: 'default', name: 'Classic Indigo', icon: '🔹' },
        { id: 'aurora', name: 'Aurora Fluid', icon: '🌌' },
        { id: 'glass', name: 'Neon Glass', icon: '✨' },
        { id: 'swiss', name: 'Swiss Minimal', icon: '📐' },
        { id: 'brutalist', name: 'Neo-Brutalist', icon: '🎨' }
    ];

    // Show notification helper
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // Handle clicks outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle theme changes
    useEffect(() => {
        const loadTheme = async () => {
            // Remove known theme stylesheets
            const existingThemes = document.querySelectorAll('link[data-theme]');
            existingThemes.forEach(link => link.remove());

            // Add selected theme
            if (currentTheme !== 'default') {
                setIsLoading(true);

                try {
                    // Check if theme file is accessible
                    const themeUrl = `/themes/theme-${currentTheme}.css`;
                    const response = await fetch(themeUrl, { method: 'HEAD' });

                    if (!response.ok) {
                        throw new Error(`Theme file not found: ${themeUrl}`);
                    }

                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = themeUrl;
                    link.setAttribute('data-theme', currentTheme);

                    // Handle successful load
                    link.onload = () => {
                        setIsLoading(false);
                        const themeName = themes.find(t => t.id === currentTheme)?.name || currentTheme;
                        showNotification(`${themeName} theme applied!`, 'success');
                    };

                    // Handle load error
                    link.onerror = () => {
                        setIsLoading(false);
                        console.error(`Failed to load theme: ${currentTheme}`);
                        showNotification('Failed to load theme. Reverting to default.', 'error');
                        // Fallback to default
                        setCurrentTheme('default');
                        localStorage.setItem('selectedTheme', 'default');
                    };

                    document.head.appendChild(link);
                } catch (error) {
                    setIsLoading(false);
                    console.error('Theme loading error:', error);
                    showNotification('Theme not available. Using default.', 'error');
                    // Fallback to default
                    setCurrentTheme('default');
                    localStorage.setItem('selectedTheme', 'default');
                }
            } else {
                setIsLoading(false);
                showNotification('Default theme applied!', 'success');
            }

            // Save to localStorage
            localStorage.setItem('selectedTheme', currentTheme);
        };

        loadTheme();
    }, [currentTheme]);

    return (
        <>
            <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
                <button
                    className="btn btn-outline"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        opacity: isLoading ? 0.7 : 1
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={isLoading}
                >
                    {isLoading ? <Loader size={18} className="spin" /> : <Palette size={18} />}
                    <span>Theme</span>
                </button>

                {isOpen && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: '8px',
                            backgroundColor: 'var(--color-bg-card)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-lg)',
                            minWidth: '200px',
                            zIndex: 1000,
                            overflow: 'hidden',
                            animation: 'fadeIn 0.2s ease-out'
                        }}
                    >
                        {themes.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => {
                                    setCurrentTheme(theme.id);
                                    setIsOpen(false);
                                }}
                                disabled={isLoading}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: 'none',
                                    background: currentTheme === theme.id ? 'var(--color-primary)' : 'transparent',
                                    color: currentTheme === theme.id ? 'white' : 'var(--color-text-main)',
                                    textAlign: 'left',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontWeight: currentTheme === theme.id ? '600' : '400',
                                    transition: 'background-color 0.2s',
                                    opacity: isLoading ? 0.5 : 1
                                }}
                                onMouseEnter={(e) => {
                                    if (currentTheme !== theme.id && !isLoading) e.currentTarget.style.backgroundColor = 'var(--color-bg-body)';
                                }}
                                onMouseLeave={(e) => {
                                    if (currentTheme !== theme.id) e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                <span>{theme.icon}</span>
                                <span style={{ flex: 1 }}>{theme.name}</span>
                                {currentTheme === theme.id && <Check size={16} />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Notification Toast */}
            {notification && (
                <div
                    style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        backgroundColor: notification.type === 'success' ? '#10b981' : '#ef4444',
                        color: 'white',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        zIndex: 9999,
                        animation: 'slideInRight 0.3s ease-out',
                        maxWidth: '300px'
                    }}
                >
                    {notification.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{notification.message}</span>
                </div>
            )}

            <style>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                .spin {
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
};

export default ThemeSwitcher;
