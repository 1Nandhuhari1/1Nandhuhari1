import React, { createContext, useContext, useState } from 'react';
import emailjs from '@emailjs/browser';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// --- Crypto helper: SHA-256 hash via Web Crypto API ---
const hashCode = async (code) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(code);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

export const AuthProvider = ({ children }) => {
    // Persistent user state
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('authUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(false);

    // OTP State — stores hash + expiry, NOT the raw code
    const [otpHash, setOtpHash] = useState(null);
    const [otpExpiry, setOtpExpiry] = useState(null);
    const [tempEmail, setTempEmail] = useState('');

    // --- Configuration (loaded from .env.local for local dev, Netlify env vars for production) ---
    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const emailJsConfigured = !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

    if (!emailJsConfigured) {
        console.warn('⚠️ EmailJS environment variables are missing. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.');
    }

    const sendOtp = async (email) => {
        setLoading(true);
        try {
            // Generate a cryptographically random 6-digit code
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);
            const code = String(100000 + (array[0] % 900000)); // always 6 digits

            // Hash the code — never store the raw OTP in state
            const hash = await hashCode(code);
            setOtpHash(hash);
            setOtpExpiry(Date.now() + OTP_EXPIRY_MS);
            setTempEmail(email);

            // Dev-mode fallback: always log OTP to console so local dev works
            if (import.meta.env.DEV) {
                console.log(`%c🔑 DEV MODE OTP for ${email}: ${code}`, 'color: #22c55e; font-size: 16px; font-weight: bold;');
            }

            if (!emailJsConfigured) {
                // In dev without keys, just return success so the OTP console log can be used
                if (import.meta.env.DEV) {
                    return { success: true };
                }
                return { success: false, error: 'Email service is not configured. Please contact the site administrator.' };
            }

            // Initialize & send via EmailJS
            emailjs.init(EMAILJS_PUBLIC_KEY);
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    email: email,
                    passcode: code,
                    to_name: email.split('@')[0]
                },
                EMAILJS_PUBLIC_KEY
            );

            return { success: true };
        } catch (error) {
            console.error('Failed to send OTP:', error);
            // Translate raw API errors into user-friendly messages
            const status = error?.status;
            if (status === 404 || error?.text?.toLowerCase().includes('account not found')) {
                return { success: false, error: 'Email service configuration error. Please contact the administrator.' };
            }
            if (status === 422 || error?.text?.toLowerCase().includes('invalid')) {
                return { success: false, error: 'Invalid email service configuration. Please check EmailJS settings.' };
            }
            const errorMsg = error?.text || error?.message || 'Failed to send login code. Please try again.';
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (code) => {
        if (!otpHash) return { success: false, error: 'No OTP generated. Please request a new code.' };

        // Check expiry
        if (Date.now() > otpExpiry) {
            setOtpHash(null);
            setOtpExpiry(null);
            return { success: false, error: 'OTP has expired. Please request a new code.' };
        }

        // Hash the entered code and compare — raw code never compared directly
        const enteredHash = await hashCode(code.trim());
        if (enteredHash === otpHash) {
            const userData = { email: tempEmail, id: crypto.randomUUID() };
            setUser(userData);
            localStorage.setItem('authUser', JSON.stringify(userData));

            // Clear temp OTP state
            setOtpHash(null);
            setOtpExpiry(null);
            setTempEmail('');
            return { success: true };
        }

        return { success: false, error: 'Invalid code. Please check and try again.' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authUser');
    };

    return (
        <AuthContext.Provider value={{ user, loading, sendOtp, verifyOtp, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
