import React, { useState } from 'react';

// Icons as SVG components
const UploadIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7,10 12,15 17,10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

const CheckCircleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22,4 12,14.01 9,11.01"></polyline>
    </svg>
);

const FileTextIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14,2 14,8 20,8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10,9 9,9 8,9"></polyline>
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6,9 12,15 18,9"></polyline>
    </svg>
);

const styles = {
    container: {
        padding: '32px',
        backgroundColor: '#f8fafc',
        minHeight: 'calc(100vh - 73px)'
    },
    header: {
        marginBottom: '32px'
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#1e293b',
        margin: '0 0 8px 0'
    },
    subtitle: {
        fontSize: '16px',
        color: '#64748b',
        margin: 0
    },
    grid: {
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    cardHeader: {
        padding: '24px 24px 16px 24px',
        borderBottom: '1px solid #f1f5f9'
    },
    cardTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '20px',
        fontWeight: '600',
        color: '#1e293b',
        margin: '0 0 8px 0'
    },
    cardDescription: {
        fontSize: '14px',
        color: '#64748b',
        margin: 0
    },
    cardContent: {
        padding: '24px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151'
    },
    select: {
        position: 'relative'
    },
    selectButton: {
        width: '100%',
        padding: '12px 16px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        backgroundColor: 'white',
        color: '#6b7280',
        fontSize: '14px',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'border-color 0.2s'
    },
    selectDropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        marginTop: '4px'
    },
    selectOption: {
        padding: '12px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        color: '#374151',
        borderBottom: '1px solid #f3f4f6',
        transition: 'background-color 0.2s'
    },
    selectOptionHover: {
        backgroundColor: '#f9fafb'
    },
    fileInput: {
        display: 'none'
    },
    fileButton: {
        padding: '12px 16px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        backgroundColor: '#3b82f6',
        color: 'white',
        cursor: 'pointer',
        textAlign: 'left',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    fileButtonText: {
        color: '#6b7280'
    },
    fileInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: '#6b7280',
        marginTop: '8px'
    },
    textarea: {
        width: '100%',
        padding: '12px 16px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#374151',
        resize: 'vertical',
        fontFamily: 'inherit',
        minHeight: '80px',
        backgroundColor: '#f8fafc'
    },
    textareaFocus: {
        borderColor: '#3b82f6',
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 24px',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    buttonHover: {
        backgroundColor: '#2563eb'
    },
    buttonDisabled: {
        backgroundColor: '#9ca3af',
        cursor: 'not-allowed'
    },
    guidelinesList: {
        margin: 0,
        padding: 0,
        listStyle: 'none'
    },
    guidelinesItem: {
        fontSize: '14px',
        color: '#6b7280',
        marginBottom: '4px',
        paddingLeft: '0'
    },
    section: {
        marginBottom: '20px'
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '8px'
    },
    alert: {
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px'
    },
    alertSuccess: {
        backgroundColor: '#f0f9f0',
        color: '#16a34a',
        border: '1px solid #bbf7d0'
    },
    alertError: {
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        border: '1px solid #fecaca'
    }
};

export default function AddDocuments() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [docType, setDocType] = useState('');
    const [description, setDescription] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [alert, setAlert] = useState(null);

    const documentTypes = [
        { value: 'transcript', label: 'Academic Transcript' },
        { value: 'certificate', label: 'Certificate' },
        { value: 'id', label: 'ID Document' },
        { value: 'medical', label: 'Medical Certificate' },
        { value: 'fee-receipt', label: 'Fee Receipt' },
        { value: 'other', label: 'Other' }
    ];

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    const handleSubmit = () => {
        if (!selectedFile || !docType) {
            setAlert({
                type: 'error',
                message: 'Please select a file and document type.'
            });
            return;
        }

        // Simulate upload
        setAlert({
            type: 'success',
            message: `${selectedFile.name} has been uploaded for review.`
        });

        // Reset form
        setSelectedFile(null);
        setDocType('');
        setDescription('');

        // Clear alert after 5 seconds
        setTimeout(() => {
            setAlert(null);
        }, 5000);
    };

    const selectedDocType = documentTypes.find(type => type.value === docType);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Add Documents</h1>
                <p style={styles.subtitle}>Upload new documents to your profile</p>
            </div>

            {alert && (
                <div style={{
                    ...styles.alert,
                    ...(alert.type === 'success' ? styles.alertSuccess : styles.alertError)
                }}>
                    {alert.type === 'success' ? <CheckCircleIcon /> : '⚠️'}
                    {alert.message}
                </div>
            )}

            <div style={styles.grid}>
                {/* Upload Form */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h2 style={styles.cardTitle}>
                            <UploadIcon />
                            Upload Document
                        </h2>
                        <p style={styles.cardDescription}>
                            Select and upload your documents for verification
                        </p>
                    </div>
                    <div style={styles.cardContent}>
                        <div style={styles.form}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Document Type</label>
                                <div style={styles.select}>
                                    <button
                                        type="button"
                                        style={styles.selectButton}
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <span>{selectedDocType ? selectedDocType.label : 'Select document type'}</span>
                                        <ChevronDownIcon />
                                    </button>
                                    {isDropdownOpen && (
                                        <div style={styles.selectDropdown}>
                                            {documentTypes.map((option) => (
                                                <div
                                                    key={option.value}
                                                    style={styles.selectOption}
                                                    onClick={() => {
                                                        setDocType(option.value);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = styles.selectOptionHover.backgroundColor;
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = 'transparent';
                                                    }}
                                                >
                                                    {option.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Select File</label>
                                <input
                                    type="file"
                                    id="file"
                                    style={styles.fileInput}
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="file"
                                    style={styles.fileButton}
                                >
                                    Choose File <span style={styles.fileButtonText}>{selectedFile ? selectedFile.name : 'No file chosen'}</span>
                                </label>
                                {selectedFile && (
                                    <div style={styles.fileInfo}>
                                        <FileTextIcon />
                                        {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                                    </div>
                                )}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Description (Optional)</label>
                                <textarea
                                    style={styles.textarea}
                                    placeholder="Enter document description..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = styles.textareaFocus.borderColor;
                                        e.target.style.boxShadow = styles.textareaFocus.boxShadow;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#d1d5db';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            <button
                                type="button"
                                style={{
                                    ...styles.button,
                                    ...(!selectedFile || !docType ? styles.buttonDisabled : {})
                                }}
                                disabled={!selectedFile || !docType}
                                onClick={handleSubmit}
                                onMouseEnter={(e) => {
                                    if (selectedFile && docType) {
                                        e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedFile && docType) {
                                        e.target.style.backgroundColor = styles.button.backgroundColor;
                                    }
                                }}
                            >
                                <UploadIcon />
                                Upload Document
                            </button>
                        </div>
                    </div>
                </div>

                {/* Upload Guidelines */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h2 style={styles.cardTitle}>
                            <CheckCircleIcon />
                            Upload Guidelines
                        </h2>
                    </div>
                    <div style={styles.cardContent}>
                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>Accepted File Types:</h4>
                            <ul style={styles.guidelinesList}>
                                <li style={styles.guidelinesItem}>• PDF documents (.pdf)</li>
                                <li style={styles.guidelinesItem}>• Image files (.jpg, .jpeg, .png)</li>
                                <li style={styles.guidelinesItem}>• Word documents (.doc, .docx)</li>
                            </ul>
                        </div>

                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>File Requirements:</h4>
                            <ul style={styles.guidelinesList}>
                                <li style={styles.guidelinesItem}>• Maximum file size: 10MB</li>
                                <li style={styles.guidelinesItem}>• Clear, readable images</li>
                                <li style={styles.guidelinesItem}>• Original documents preferred</li>
                                <li style={styles.guidelinesItem}>• Proper file naming recommended</li>
                            </ul>
                        </div>

                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>Processing Time:</h4>
                            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                                Documents are typically reviewed within 2-3 business days.
                                You will receive email notifications about the status.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}