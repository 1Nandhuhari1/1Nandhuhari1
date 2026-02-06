import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowRight, Lock, Loader, AlertTriangle, CheckCircle } from 'lucide-react';

const LoginPage = () => {
    const [step, setStep] = useState('email'); // 'email' or 'otp'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const { sendOtp, verifyOtp, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Where to redirect after login (default to dashboard)
    const from = location.state?.from?.pathname || '/dashboard';

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        const result = await sendOtp(email);
        if (result.success) {
            setStep('otp');
        } else {
            setError(result.error || 'Failed to send OTP. Check console/keys.');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');

        const result = verifyOtp(otp);
        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setError(result.error);
        }
    };

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
                        {step === 'email' ? 'Welcome Back' : 'Verify Login'}
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        {step === 'email'
                            ? 'Enter your email to receive a login code.'
                            : `We sent a code to ${email}`}
                    </p>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#fef2f2',
                        color: '#ef4444',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <AlertTriangle size={16} /> {error}
                    </div>
                )}

                {step === 'email' ? (
                    <form onSubmit={handleSendOtp}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="input"
                                    style={{ width: '100%', paddingLeft: '40px' }}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center' }}
                            disabled={loading}
                        >
                            {loading ? <Loader className="spin" size={20} /> : <>Send Login Code <ArrowRight size={18} style={{ marginLeft: '8px' }} /></>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Enter 6-Digit Code</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="123456"
                                    className="input"
                                    style={{ width: '100%', paddingLeft: '40px', letterSpacing: '2px', fontSize: '18px' }}
                                    maxLength={6}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            Verify & Login <CheckCircle size={18} style={{ marginLeft: '8px' }} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep('email')}
                            style={{
                                display: 'block',
                                margin: '20px auto 0',
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-text-muted)',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            Change Email
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
