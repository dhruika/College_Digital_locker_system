import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Icons as SVG components
const DocumentIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14,2 14,8 20,8"></polyline>
    </svg>
);

const CheckCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22,4 12,14.01 9,11.01"></polyline>
    </svg>
);

const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12,6 12,12 16,14"></polyline>
    </svg>
);

const XCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
);

const DownloadIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7,10 12,15 17,10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3,6 5,6 21,6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

// Sample documents data
const documentsData = [
    {
        id: 1,
        name: 'Academic_Transcript_2023.pdf',
        type: 'Academic Transcript',
        uploadDate: '2024-01-15',
        status: 'approved',
        size: '2.3 MB'
    },
    {
        id: 2,
        name: 'Student_ID_Card.jpg',
        type: 'ID Document',
        uploadDate: '2024-01-20',
        status: 'pending',
        size: '1.8 MB'
    },
    {
        id: 3,
        name: 'Medical_Certificate.pdf',
        type: 'Medical Certificate',
        uploadDate: '2024-01-25',
        status: 'rejected',
        size: '1.2 MB'
    },
    {
        id: 4,
        name: 'Fee_Receipt_2024.pdf',
        type: 'Fee Receipt',
        uploadDate: '2024-02-01',
        status: 'approved',
        size: '0.9 MB'
    },
    {
        id: 5,
        name: 'Course_Certificate.pdf',
        type: 'Certificate',
        uploadDate: '2024-02-10',
        status: 'pending',
        size: '3.1 MB'
    }
];

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
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    cardHeader: {
        padding: '24px',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    documentsCount: {
        fontSize: '14px',
        color: '#64748b'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    tableHeader: {
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
    },
    tableHeaderCell: {
        padding: '16px 24px',
        textAlign: 'left',
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
        borderBottom: '1px solid #e2e8f0'
    },
    tableRow: {
        borderBottom: '1px solid #f1f5f9',
        transition: 'background-color 0.2s'
    },
    tableRowHover: {
        backgroundColor: '#f9fafb'
    },
    tableCell: {
        padding: '16px 24px',
        fontSize: '14px',
        color: '#374151',
        verticalAlign: 'middle'
    },
    documentName: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    documentIcon: {
        color: '#3b82f6',
        flexShrink: 0
    },
    documentDetails: {
        display: 'flex',
        flexDirection: 'column'
    },
    documentTitle: {
        fontWeight: '500',
        margin: '0 0 4px 0'
    },
    documentSize: {
        fontSize: '12px',
        color: '#6b7280',
        margin: 0
    },
    statusBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '500'
    },
    statusApproved: {
        backgroundColor: '#f0fdf4',
        color: '#16a34a',
        border: '1px solid #bbf7d0'
    },
    statusPending: {
        backgroundColor: '#fffbeb',
        color: '#d97706',
        border: '1px solid #fed7aa'
    },
    statusRejected: {
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        border: '1px solid #fecaca'
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    actionButton: {
        padding: '6px',
        backgroundColor: 'transparent',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        cursor: 'pointer',
        color: '#6b7280',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButtonHover: {
        backgroundColor: '#f3f4f6',
        borderColor: '#d1d5db'
    },
    actionButtonDanger: {
        color: '#dc2626',
        borderColor: '#fecaca'
    },
    actionButtonDangerHover: {
        backgroundColor: '#fef2f2',
        borderColor: '#fca5a5'
    },
    emptyState: {
        padding: '48px 24px',
        textAlign: 'center',
        color: '#6b7280'
    },
    emptyIcon: {
        color: '#d1d5db',
        marginBottom: '16px'
    },
    emptyTitle: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#374151',
        margin: '0 0 8px 0'
    },
    emptyDescription: {
        fontSize: '14px',
        color: '#6b7280',
        margin: 0
    }
};

export default function AllDocuments({ student }) {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (student?.studentId) {
            console.log('Student prop:', student);
            if (student?.studentId) {
                fetchDocuments();
            }
        }
    }, [student]);








    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/api/documents?studentId=${student.pnr}`);

            setDocuments(res.data); // assuming backend returns array of documents
        } catch (error) {
            console.error('Error fetching documents:', error);
            setDocuments([]);
        } finally {
            setLoading(false);
        }
    };



    // const getStatusIcon = (status) => {
    //     switch (status) {
    //         case 'approved':
    //             return <CheckCircleIcon />;
    //         case 'pending':
    //             return <ClockIcon />;
    //         case 'rejected':
    //             return <XCircleIcon />;
    //         default:
    //             return <ClockIcon />;
    //     }
    // };

    // const getStatusStyle = (status) => {
    //     switch (status) {
    //         case 'approved':
    //             return { ...styles.statusBadge, ...styles.statusApproved };
    //         case 'pending':
    //             return { ...styles.statusBadge, ...styles.statusPending };
    //         case 'rejected':
    //             return { ...styles.statusBadge, ...styles.statusRejected };
    //         default:
    //             return { ...styles.statusBadge, ...styles.statusPending };
    //     }
    // };

    const handleDownload = (document) => {
        // Simulate download
        console.log('Downloading:', document.name);
        alert(`Downloading ${document.name}...`);
        window.open(document.url, '_blank');
    };

    const handleDelete = async (documentId) => {
        if (!window.confirm('Are you sure you want to delete this document?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/documents/${documentId}`);
            setDocuments(documents.filter(doc => doc._id !== documentId));
        } catch (error) {
            console.error('Error deleting document:', error);
            alert('Failed to delete document.');
        }
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>All Documents</h1>
                <p style={styles.subtitle}>View and manage all your uploaded documents</p>
            </div>

            <div style={styles.card}>
                <div style={styles.cardHeader}>
                    <h2 style={styles.cardTitle}>
                        <DocumentIcon />
                        My Documents
                    </h2>
                    <span style={styles.documentsCount}>
                        {documents.length} document{documents.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {loading ? (
                    <p style={{ padding: '24px' }}>Loading documents...</p>
                ) : documents.length > 0 ? (






                    <table style={styles.table}>
                        <thead style={styles.tableHeader}>
                            <tr>
                                <th style={styles.tableHeaderCell}>Document</th>
                                <th style={styles.tableHeaderCell}>Type</th>
                                <th style={styles.tableHeaderCell}>Upload Date</th>
                                <th style={styles.tableHeaderCell}>Status</th>
                                <th style={styles.tableHeaderCell}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((document) => (
                                <tr key={document._id} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{document.type}</td>
                                    <td style={styles.tableCell}>{formatDate(document.uploadedAt)}</td>
                                    <td style={styles.tableCell}>
                                        <a
                                            href={`http://localhost:5000/${document.url.replace(/\\/g, "/")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: "blue", textDecoration: "underline" }}
                                        >
                                            View / Download
                                        </a>
                                    </td>
                                    <td style={styles.tableCell}>
                                        <button
                                            style={{ ...styles.actionButton, ...styles.actionButtonDanger }}
                                            onClick={() => handleDelete(document._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                ) : (
                    <div style={styles.emptyState}>
                        <div style={styles.emptyIcon}>
                            <DocumentIcon />
                        </div>
                        <h3 style={styles.emptyTitle}>No documents uploaded</h3>
                        <p style={styles.emptyDescription}>
                            Start by uploading your first document using the Add Documents page.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}