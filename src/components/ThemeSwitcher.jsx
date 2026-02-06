import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

const ThemeSwitcher = () => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('selectedTheme') || 'default';
    });

    const themes = [
        { id: 'default', name: 'Classic Indigo', icon: '🔹' },
        { id: 'aurora', name: 'Aurora Fluid', icon: '🌌' },
        { id: 'glass', name: 'Neon Glass', icon: '✨' },
        { id: 'swiss', name: 'Swiss Minimal', icon: '📐' },
        { id: 'brutalist', name: 'Neo-Brutalist', icon: '🎨' }
    ];

    useEffect(() => {
        // Remove all theme stylesheets
        const existingThemes = document.querySelectorAll('link[data-theme]');
        existingThemes.forEach(link => link.remove());

        // Add selected theme
        if (currentTheme !== 'default') {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `/src/themes/theme-${currentTheme}.css`;
            link.setAttribute('data-theme', currentTheme);
            document.head.appendChild(link);
        }

        // Save to localStorage
        localStorage.setItem('selectedTheme', currentTheme);
    }, [currentTheme]);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
                className="btn btn-outline"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px'
                }}
                onClick={(e) => {
                    const dropdown = e.currentTarget.nextElementSibling;
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }}
            >
                <Palette size={18} />
                <span>Theme</span>
            </button>
            <div
                style={{
                    display: 'none',
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    backgroundColor: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    minWidth: '150px',
                    zIndex: 1000
                }}
            >
                {themes.map(theme => (
                    <button
                        key={theme.id}
                        onClick={() => {
                            setCurrentTheme(theme.id);
                            // Close dropdown
                            document.querySelector('[style*="display: block"]').style.display = 'none';
                        }}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            background: currentTheme === theme.id ? 'var(--color-primary)' : 'transparent',
                            color: currentTheme === theme.id ? 'white' : 'var(--color-text-main)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: currentTheme === theme.id ? '600' : '400'
                        }}
                    >
                        <span>{theme.icon}</span>
                        <span>{theme.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeSwitcher;
