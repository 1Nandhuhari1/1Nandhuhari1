import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, MessageSquare, Send } from 'lucide-react';

const FeedbackModal = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log({ rating, feedback });
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setRating(0);
            setFeedback('');
            onClose();
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(4px)'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{
                            backgroundColor: 'var(--color-bg-card)',
                            borderRadius: '24px',
                            padding: '32px',
                            width: '100%',
                            maxWidth: '450px',
                            position: 'relative',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            border: '1px solid var(--color-border)'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-text-muted)'
                            }}
                        >
                            <X size={20} />
                        </button>

                        {!submitted ? (
                            <>
                                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
                                        How was your experience?
                                    </h3>
                                    <p style={{ color: 'var(--color-text-muted)' }}>
                                        Your feedback helps us improve Resumer.ai
                                    </p>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    marginBottom: '24px'
                                }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: (hover || rating) >= star ? '#FFD700' : 'var(--color-border)',
                                                transition: 'color 0.2s'
                                            }}
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(0)}
                                            onClick={() => setRating(star)}
                                        >
                                            <Star size={32} fill={(hover || rating) >= star ? '#FFD700' : 'transparent'} />
                                        </button>
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {/* Show feedback text area if rating is selected and less than 3 */}
                                    {rating > 0 && rating < 3 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            style={{ marginBottom: '20px' }}
                                        >
                                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500' }}>
                                                What can we improve?
                                            </label>
                                            <textarea
                                                value={feedback}
                                                onChange={(e) => setFeedback(e.target.value)}
                                                placeholder="Please tell us what went wrong..."
                                                style={{
                                                    width: '100%',
                                                    minHeight: '100px',
                                                    padding: '12px',
                                                    borderRadius: '12px',
                                                    border: '1px solid var(--color-border)',
                                                    backgroundColor: 'var(--color-bg-body)',
                                                    color: 'var(--color-text-main)',
                                                    marginBottom: '8px',
                                                    resize: 'vertical'
                                                }}
                                                required
                                            />
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                                        disabled={rating === 0}
                                    >
                                        Submit Feedback <Send size={18} style={{ marginLeft: '8px' }} />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        background: '#ecfdf5',
                                        color: '#10b981',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 16px'
                                    }}
                                >
                                    <MessageSquare size={32} />
                                </motion.div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>
                                    Thank You!
                                </h3>
                                <p style={{ color: 'var(--color-text-muted)' }}>
                                    We appreciate your feedback.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FeedbackModal;
