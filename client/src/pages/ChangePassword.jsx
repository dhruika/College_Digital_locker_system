import React, { useState } from 'react';
import axios from 'axios';

// Icons as SVG components
const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const ShieldIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);

const CheckCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22,4 12,14.01 9,11.01"></polyline>
    </svg>
);

const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const EyeOffIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
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
    inputWrapper: {
        position: 'relative'
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        paddingRight: '48px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#374151',
        backgroundColor: 'white',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxSizing: 'border-box'
    },
    inputFocus: {
        borderColor: '#3b82f6',
        outline: 'none',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    inputError: {
        borderColor: '#ef4444'
    },
    eyeButton: {
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#6b7280',
        padding: '4px'
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
        backgroundColor: '#f0fdf4',
        color: '#16a34a',
        border: '1px solid #bbf7d0'
    },
    alertError: {
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        border: '1px solid #fecaca'
    },
    errorText: {
        fontSize: '12px',
        color: '#ef4444',
        marginTop: '4px'
    },
    requirementsList: {
        margin: 0,
        padding: 0,
        listStyle: 'none'
    },
    requirementItem: {
        fontSize: '14px',
        color: '#6b7280',
        marginBottom: '4px',
        paddingLeft: '0'
    },
    requirementValid: {
        color: '#16a34a'
    },
    section: {
        marginBottom: '20px'
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '8px'
    }
};

export default function ChangePassword() {
    // At the top of ChangePassword component
    const userData = JSON.parse(localStorage.getItem("user"));
    const studentId = userData?.pnr; // optional chaining in case it's null




    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(null);

    const passwordRequirements = [
        { text: 'At least 8 characters long', validate: (pwd) => pwd.length >= 8 },
        { text: 'Contains uppercase letter', validate: (pwd) => /[A-Z]/.test(pwd) },
        { text: 'Contains lowercase letter', validate: (pwd) => /[a-z]/.test(pwd) },
        { text: 'Contains at least one number', validate: (pwd) => /\d/.test(pwd) },
        { text: 'Contains special character', validate: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
    ];

    const validatePassword = (password) => {
        return passwordRequirements.every(req => req.validate(password));
    };

    const handleInputChange = (field, value) => {
        setPasswords(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear field-specific errors when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSubmit = async () => {
        console.log("Logged-in student data from localStorage:", userData);
        console.log("pnr being sent:", studentId);
        console.log("Passwords object:", passwords);


        const newErrors = {};

        // Validate current password
        if (!passwords.current) {
            newErrors.current = 'Current password is required';
        }

        // Validate new password
        if (!passwords.new) {
            newErrors.new = 'New password is required';
        } else if (!validatePassword(passwords.new)) {
            newErrors.new = 'Password does not meet requirements';
        }

        // Validate confirm password
        if (!passwords.confirm) {
            newErrors.confirm = 'Please confirm your new password';
        } else if (passwords.new !== passwords.confirm) {
            newErrors.confirm = 'Passwords do not match';
        }

        // Check if new password is different from current
        if (passwords.current && passwords.new && passwords.current === passwords.new) {
            newErrors.new = 'New password must be different from current password';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Simulate password change
            try {
                // Make the PUT request to backend
                const response = await axios.put("http://localhost:5000/api/auth/change-password", {
                    pnr: studentId, // replace with the actual logged-in student ID
                    oldPassword: passwords.current,
                    newPassword: passwords.new
                });




                setAlert({
                    type: 'success',
                    message: 'Password changed successfully!'
                });

                // Reset form
                setPasswords({
                    current: '',
                    new: '',
                    confirm: ''
                });

                // Clear alert after 5 seconds
                setTimeout(() => {
                    setAlert(null);
                }, 5000);
            } catch (error) {
                console.error("Change Password Error:", error.response ? error.response.data : error.message);

                setAlert({
                    type: 'error',
                    message: error.response?.data?.message || "Something went  too wrong"
                });
            }

        }


        else {
            setAlert({
                type: 'error',
                message: 'Please correct the errors below'
            });
        }
    };

    const isFormValid = passwords.current && passwords.new && passwords.confirm &&
        validatePassword(passwords.new) && passwords.new === passwords.confirm &&
        passwords.current !== passwords.new;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Change Password</h1>
                <p style={styles.subtitle}>Update your account password to keep it secure</p>
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
                {/* Change Password Form */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h2 style={styles.cardTitle}>
                            <LockIcon />
                            Update Password
                        </h2>
                        <p style={styles.cardDescription}>
                            Enter your current password and choose a new secure password
                        </p>
                    </div>
                    <div style={styles.cardContent}>
                        <div style={styles.form}>
                            {/* Current Password */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Current Password</label>
                                <div style={styles.inputWrapper}>
                                    <input
                                        type={showPasswords.current ? 'text' : 'password'}
                                        style={{
                                            ...styles.input,
                                            ...(errors.current ? styles.inputError : {})
                                        }}
                                        placeholder="Enter current password"
                                        value={passwords.current}
                                        onChange={(e) => handleInputChange('current', e.target.value)}
                                        onFocus={(e) => {
                                            if (!errors.current) {
                                                e.target.style.borderColor = styles.inputFocus.borderColor;
                                                e.target.style.boxShadow = styles.inputFocus.boxShadow;
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (!errors.current) {
                                                e.target.style.borderColor = '#d1d5db';
                                                e.target.style.boxShadow = 'none';
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        style={styles.eyeButton}
                                        onClick={() => togglePasswordVisibility('current')}
                                    >
                                        {showPasswords.current ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {errors.current && (
                                    <span style={styles.errorText}>{errors.current}</span>
                                )}
                            </div>

                            {/* New Password */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>New Password</label>
                                <div style={styles.inputWrapper}>
                                    <input
                                        type={showPasswords.new ? 'text' : 'password'}
                                        style={{
                                            ...styles.input,
                                            ...(errors.new ? styles.inputError : {})
                                        }}
                                        placeholder="Enter new password"
                                        value={passwords.new}
                                        onChange={(e) => handleInputChange('new', e.target.value)}
                                        onFocus={(e) => {
                                            if (!errors.new) {
                                                e.target.style.borderColor = styles.inputFocus.borderColor;
                                                e.target.style.boxShadow = styles.inputFocus.boxShadow;
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (!errors.new) {
                                                e.target.style.borderColor = '#d1d5db';
                                                e.target.style.boxShadow = 'none';
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        style={styles.eyeButton}
                                        onClick={() => togglePasswordVisibility('new')}
                                    >
                                        {showPasswords.new ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {errors.new && (
                                    <span style={styles.errorText}>{errors.new}</span>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Confirm New Password</label>
                                <div style={styles.inputWrapper}>
                                    <input
                                        type={showPasswords.confirm ? 'text' : 'password'}
                                        style={{
                                            ...styles.input,
                                            ...(errors.confirm ? styles.inputError : {})
                                        }}
                                        placeholder="Confirm new password"
                                        value={passwords.confirm}
                                        onChange={(e) => handleInputChange('confirm', e.target.value)}
                                        onFocus={(e) => {
                                            if (!errors.confirm) {
                                                e.target.style.borderColor = styles.inputFocus.borderColor;
                                                e.target.style.boxShadow = styles.inputFocus.boxShadow;
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (!errors.confirm) {
                                                e.target.style.borderColor = '#d1d5db';
                                                e.target.style.boxShadow = 'none';
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        style={styles.eyeButton}
                                        onClick={() => togglePasswordVisibility('confirm')}
                                    >
                                        {showPasswords.confirm ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                                {errors.confirm && (
                                    <span style={styles.errorText}>{errors.confirm}</span>
                                )}
                            </div>

                            <button
                                type="button"
                                style={{
                                    ...styles.button,
                                    ...(!isFormValid ? styles.buttonDisabled : {})
                                }}
                                disabled={!isFormValid}
                                onClick={handleSubmit}
                                onMouseEnter={(e) => {
                                    if (isFormValid) {
                                        e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (isFormValid) {
                                        e.target.style.backgroundColor = styles.button.backgroundColor;
                                    }
                                }}
                            >
                                <LockIcon />
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>

                {/* Password Requirements */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h2 style={styles.cardTitle}>
                            <ShieldIcon />
                            Password Requirements
                        </h2>
                    </div>
                    <div style={styles.cardContent}>
                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>Your password must contain:</h4>
                            <ul style={styles.requirementsList}>
                                {passwordRequirements.map((requirement, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            ...styles.requirementItem,
                                            ...(passwords.new && requirement.validate(passwords.new) ? styles.requirementValid : {})
                                        }}
                                    >
                                        • {requirement.text}
                                        {passwords.new && requirement.validate(passwords.new) && ' ✓'}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>Security Tips:</h4>
                            <ul style={styles.requirementsList}>
                                <li style={styles.requirementItem}>• Use a unique password for your account</li>
                                <li style={styles.requirementItem}>• Avoid using personal information</li>
                                <li style={styles.requirementItem}>• Consider using a password manager</li>
                                <li style={styles.requirementItem}>• Change your password regularly</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}