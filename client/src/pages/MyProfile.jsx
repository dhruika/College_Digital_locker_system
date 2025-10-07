import React from 'react';

// Icons as SVG components
const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const HashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="4" y1="9" x2="20" y2="9"></line>
        <line x1="4" y1="15" x2="20" y2="15"></line>
        <line x1="10" y1="3" x2="8" y2="21"></line>
        <line x1="16" y1="3" x2="14" y2="21"></line>
    </svg>
);

const MailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const BuildingIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18"></path>
        <path d="M5 21V7l8-4v18"></path>
        <path d="M19 21V11l-6-4"></path>
        <path d="M9 9v1"></path>
        <path d="M9 12v1"></path>
        <path d="M9 15v1"></path>
    </svg>
);

const CalendarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

const BookOpenIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
);

const studentData = {
    name: "John Smith",
    pnr: "ST2024001234",
    email: "john.smith@university.edu",
    department: "Computer Science",
    year: "3rd Year",
    studentId: "CS2021-456",
    enrollmentDate: "August 2021",
    status: "Active"
};

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
    profileGrid: {
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
    },
    profileCard: {
        gridColumn: 'span 2',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    cardHeader: {
        padding: '24px',
        borderBottom: '1px solid #f1f5f9'
    },
    cardContent: {
        padding: '24px'
    },
    profileHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#3b82f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px'
    },
    profileInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    profileName: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#1e293b',
        margin: 0
    },
    profileId: {
        fontSize: '18px',
        color: '#64748b',
        margin: 0
    },
    badge: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        backgroundColor: '#f1f5f9',
        color: '#475569',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500'
    },
    cardTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '20px',
        fontWeight: '600',
        color: '#1e293b',
        margin: 0
    },
    infoList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    infoIcon: {
        color: '#64748b',
        flexShrink: 0
    },
    infoContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    },
    infoLabel: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151',
        margin: 0
    },
    infoValue: {
        fontSize: '14px',
        color: '#6b7280',
        margin: 0
    }
};
export default function MyProfile({ student }) {
    if (!student) return <p>Loading...</p>; // fallback if student data is missing

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>My Profile</h1>
                <p style={styles.subtitle}>View your personal information and academic details</p>
            </div>

            <div style={styles.profileGrid}>
                {/* Profile Overview Card */}
                <div style={styles.profileCard}>
                    <div style={styles.cardHeader}>
                        <div style={styles.profileHeader}>
                            <div style={styles.avatar}>
                                <UserIcon />
                            </div>
                            <div style={styles.profileInfo}>
                                <h2 style={styles.profileName}>{student.name}</h2>
                                <p style={styles.profileId}>{student.studentId}</p>
                                <span style={styles.badge}>{student.status}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h3 style={styles.cardTitle}>
                            <UserIcon />
                            Personal Information
                        </h3>
                    </div>
                    <div style={styles.cardContent}>
                        <div style={styles.infoList}>
                            <div style={styles.infoItem}>
                                <div style={styles.infoIcon}>
                                    <HashIcon />
                                </div>
                                <div style={styles.infoContent}>
                                    <p style={styles.infoLabel}>PNR Number</p>
                                    <p style={styles.infoValue}>{student.pnr}</p>
                                </div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoIcon}>
                                    <MailIcon />
                                </div>
                                <div style={styles.infoContent}>
                                    <p style={styles.infoLabel}>Email Address</p>
                                    <p style={styles.infoValue}>{student.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic Information */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h3 style={styles.cardTitle}>
                            <BookOpenIcon />
                            Academic Information
                        </h3>
                    </div>
                    <div style={styles.cardContent}>
                        <div style={styles.infoList}>
                            <div style={styles.infoItem}>
                                <div style={styles.infoIcon}>
                                    <BuildingIcon />
                                </div>
                                <div style={styles.infoContent}>
                                    <p style={styles.infoLabel}>Department</p>
                                    <p style={styles.infoValue}>{student.department}</p>
                                </div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoIcon}>
                                    <CalendarIcon />
                                </div>
                                <div style={styles.infoContent}>
                                    <p style={styles.infoLabel}>Academic Year</p>
                                    <p style={styles.infoValue}>{student.year}</p>
                                </div>
                            </div>
                            <div style={styles.infoItem}>
                                <div style={styles.infoIcon}>
                                    <CalendarIcon />
                                </div>
                                <div style={styles.infoContent}>
                                    <p style={styles.infoLabel}>Enrollment Date</p>
                                    <p style={styles.infoValue}>{student.enrollmentDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
