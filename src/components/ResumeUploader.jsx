import React, { useState, useCallback } from 'react';
import { Upload, FileText, Check, AlertCircle, Loader } from 'lucide-react';
import { parseResume } from '../utils/resumeParser';
import { useResume } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';

const ResumeUploader = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const { importResumeData } = useResume();
    const navigate = useNavigate();

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    const processFile = async (file) => {
        if (!file) return;

        // Validate file type
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            setError('Please upload a PDF or DOCX file.');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            const parsedData = await parseResume(file);
            console.log('Parsed Data:', parsedData);
            importResumeData(parsedData);
            navigate('/create');
        } catch (err) {
            console.error(err);
            setError('Failed to parse resume. Please try again or create manually.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    return (
        <div
            style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '40px',
                border: `2px dashed ${isDragging ? 'var(--color-primary)' : '#e5e7eb'}`,
                borderRadius: '16px',
                backgroundColor: isDragging ? 'rgba(79, 70, 229, 0.05)' : 'white',
                textAlign: 'center',
                transition: 'all 0.2s',
                cursor: 'pointer'
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('resume-upload-input').click()}
        >
            <input
                type="file"
                id="resume-upload-input"
                style={{ display: 'none' }}
                accept=".pdf,.docx"
                onChange={handleChange}
            />

            {isProcessing ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <Loader className="spin" size={40} color="var(--color-primary)" />
                    <p>Analyzing your resume... This happens locally in your browser.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary)'
                    }}>
                        <Upload size={24} />
                    </div>

                    <div>
                        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>
                            Upload your resume to auto-fill
                        </h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                            Drag and drop or click to upload PDF or DOCX
                        </p>
                    </div>

                    {error && (
                        <div style={{
                            color: '#ef4444',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginTop: '10px'
                        }}>
                            <AlertCircle size={14} /> {error}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResumeUploader;
