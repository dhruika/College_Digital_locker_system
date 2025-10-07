import React, { useState, useEffect } from 'react';
import MyProfile from './MyProfile';
import AddDocuments from './AddDocuments';
import AllDocuments from './AllDocument';
import ChangePassword from './ChangePassword';

// Icons as SVG components
const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const DocumentIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14,2 14,8 20,8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10,9 9,9 8,9"></polyline>
    </svg>
);

const UploadIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7,10 12,15 17,10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const LogoutIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16,17 21,12 16,7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
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
        display: 'flex',
        height: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#f8fafc'
    },
    sidebar: {
        width: '280px',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
        color: 'white',
        padding: '0',
        display: 'flex',
        flexDirection: 'column'
    },
    sidebarHeader: {
        padding: '24px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px'
    },
    logoIcon: {
        width: '40px',
        height: '40px',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px'
    },
    logoText: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: 0
    },
    logoSubtext: {
        fontSize: '14px',
        opacity: 0.8,
        margin: 0
    },
    studentInfo: {
        marginTop: '16px'
    },
    studentName: {
        fontSize: '18px',
        fontWeight: '600',
        margin: '0 0 4px 0'
    },
    studentId: {
        fontSize: '14px',
        opacity: 0.8,
        margin: '0 0 4px 0'
    },
    studentDept: {
        fontSize: '14px',
        opacity: 0.8,
        margin: 0
    },
    nav: {
        padding: '16px',
        flex: 1
    },
    navTitle: {
        fontSize: '12px',
        fontWeight: '600',
        opacity: 0.7,
        marginBottom: '16px',
        letterSpacing: '0.05em'
    },
    navList: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    navItem: {
        marginBottom: '8px'
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '8px',
        textDecoration: 'none',
        color: 'rgba(255,255,255,0.8)',
        transition: 'all 0.2s',
        fontSize: '14px',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'transparent',
        width: '100%',
        textAlign: 'left'
    },
    navLinkActive: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        color: 'white'
    },
    navLinkHover: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'white'
    },
    logoutSection: {
        padding: '16px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
    },
    logoutLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '8px',
        textDecoration: 'none',
        color: 'rgba(255,255,255,0.8)',
        fontSize: '14px',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'transparent',
        width: '100%',
        textAlign: 'left'
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    topBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0'
    },
    switchButton: {
        padding: '8px 16px',
        backgroundColor: '#e2e8f0',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#64748b',
        cursor: 'pointer'
    },
    notification: {
        position: 'relative',
        width: '24px',
        height: '24px',
        cursor: 'pointer'
    },
    notificationBadge: {
        position: 'absolute',
        top: '-4px',
        right: '-4px',
        width: '16px',
        height: '16px',
        backgroundColor: '#ef4444',
        borderRadius: '50%',
        color: 'white',
        fontSize: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export default function StudentDashboard() {
    const [activePage, setActivePage] = useState('profile');
    const [studentData, setStudentData] = useState(null);
    useEffect(() => {
        // Get student info from localStorage
        const storedStudent = localStorage.getItem("user");
        if (storedStudent) {
            setStudentData(JSON.parse(storedStudent));
        }
    }, []);

    const navItems = [
        { id: 'profile', icon: <UserIcon />, label: 'My Profile' },
        { id: 'add-documents', icon: <UploadIcon />, label: 'Add Documents' },
        { id: 'all-documents', icon: <DocumentIcon />, label: 'All Documents' },
        { id: 'change-password', icon: <LockIcon />, label: 'Change Password' }
    ];

    const handleNavClick = (pageId) => {
        setActivePage(pageId);
    };

    const loggedInStudent = JSON.parse(localStorage.getItem("user"));

    const renderActivePage = () => {
        switch (activePage) {
            case 'profile':
                return <MyProfile student={loggedInStudent} />;
            case 'add-documents':
                return <AddDocuments student={loggedInStudent} />;
            case 'all-documents':
                return <AllDocuments student={loggedInStudent} />;
            case 'change-password':
                return <ChangePassword student={loggedInStudent} />;
            default:
                return <MyProfile student={loggedInStudent} />;
        }
    };

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <div style={styles.sidebarHeader}>
                    <div style={styles.logo}>
                        <div style={styles.logoIcon}>📚</div>
                        <div>
                            <h2 style={styles.logoText}>StudentHub</h2>
                            <p style={styles.logoSubtext}>Student Portal</p>
                        </div>
                    </div>

                    <div style={styles.studentInfo}>
                        <h3 style={styles.studentName}>{loggedInStudent?.name || ''}</h3>
                        <p style={styles.studentId}>{loggedInStudent?.studentId || ''}</p>
                        <p style={styles.studentDept}>{loggedInStudent?.department || ''}</p>
                    </div>

                </div>

                <nav style={styles.nav}>
                    <p style={styles.navTitle}>NAVIGATION</p>
                    <ul style={styles.navList}>
                        {navItems.map((item) => (
                            <li key={item.id} style={styles.navItem}>
                                <button
                                    style={{
                                        ...styles.navLink,
                                        ...(activePage === item.id ? styles.navLinkActive : {})
                                    }}
                                    onClick={() => handleNavClick(item.id)}
                                    onMouseEnter={(e) => {
                                        if (activePage !== item.id) {
                                            e.target.style.backgroundColor = styles.navLinkHover.backgroundColor;
                                            e.target.style.color = styles.navLinkHover.color;
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (activePage !== item.id) {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = 'rgba(255,255,255,0.8)';
                                        }
                                    }}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div style={styles.logoutSection}>
                    <button style={styles.logoutLink}>
                        <LogoutIcon />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={styles.mainContent}>
                {/* Top Bar */}
                <div style={styles.topBar}>
                    <div></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button style={styles.switchButton}>Switch to Admin</button>
                        <div style={styles.notification}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                            <div style={styles.notificationBadge}>2</div>
                        </div>
                        <div style={{ width: '40px', height: '40px', backgroundColor: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <UserIcon />
                        </div>
                    </div>
                </div>

                {/* Dynamic Content */}
                {renderActivePage()}
            </div>
        </div>
    );
}