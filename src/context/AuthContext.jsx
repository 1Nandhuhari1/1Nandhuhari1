import React, { createContext, useContext, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Persistent user state
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('authUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(false);

    // OTP State for Verification Flow
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [tempEmail, setTempEmail] = useState('');

    // --- Configuration ---
    const EMAILJS_SERVICE_ID = 'service_id3vfb7';
    const EMAILJS_TEMPLATE_ID = 'template_rbw9109';
    const EMAILJS_PUBLIC_KEY = 'ERU64xaM9_MiB5cyL';

    const sendOtp = async (email) => {
        setLoading(true);
        try {
            // Generate a random 6-digit code
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(code);
            setTempEmail(email);

            console.log("Dev Mode OTP:", code); // For testing if email fails

            // Initialize EmailJS
            emailjs.init(EMAILJS_PUBLIC_KEY);

            // Send Email
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    email: email,
                    passcode: code,
                    to_name: email.split('@')[0] // helpful context to keep
                },
                EMAILJS_PUBLIC_KEY // Explicitly pass public key
            );

            return { success: true };
        } catch (error) {
            console.error('Failed to send OTP:', error);
            // In dev mode, we might want to return success anyway if keys aren't set yet
            if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
                return { success: false, error: 'Configuration Missing: Please set your EmailJS Service ID, Template ID, and Public Key in AuthContext.jsx' };
            }
            return { success: false, error: error.text || 'Failed to send email' };
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = (code) => {
        if (!generatedOtp) return { success: false, error: 'No OTP generated' };

        if (code === generatedOtp) {
            // Success! Create session
            const userData = { email: tempEmail, id: Date.now() };
            setUser(userData);
            localStorage.setItem('authUser', JSON.stringify(userData));

            // Clear temp state
            setGeneratedOtp(null);
            setTempEmail('');
            return { success: true };
        } else {
            return { success: false, error: 'Invalid Code' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authUser');
        localStorage.removeItem('resumeData'); // Optional: Clear resume data on logout? Often better to keep separate.
        // For now, we only clear auth.
    };

    return (
        <AuthContext.Provider value={{ user, loading, sendOtp, verifyOtp, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
