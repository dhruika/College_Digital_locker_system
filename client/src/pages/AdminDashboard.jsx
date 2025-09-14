import React, { useState } from 'react';
import ManageStudent from "../pages/ManageStudent";
import DepartmentOverview from '../pages/DepartmentOverview';
import Setting from '../pages/Setting';
import UploadDocuments from '../pages/UploadDocuments';
import { useNavigate } from "react-router-dom";

import AddStudent from '../pages/AddStudent';
import {
    LayoutDashboard,
    Users,
    Upload,
    Building2,
    Settings,
    LogOut,
    Menu,
    X,
    FileText,
    GraduationCap,
    TrendingUp
} from 'lucide-react';


// Admin Sidebar Component
const AdminSidebar = ({ isOpen, onClose, activeTab, setActiveTab }) => {
    const navigationItems = [
        { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
        { id: 'students', title: 'Manage Students', icon: Users },
        { id: 'documents', title: 'Upload Documents', icon: Upload },
        { id: 'departments', title: 'Department Overview', icon: Building2 },
        { id: 'settings', title: 'Settings', icon: Settings },
    ];

    const handleLogout = () => {
        console.log('Logging out...');
        // Add your logout logic here
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-screen bg-blue-600 text-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:static lg:z-auto w-64 shadow-lg flex flex-col`}>

                {/* Header */}
                <div className="p-6 border-b border-blue-500">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <LayoutDashboard className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold">AdminHub</h1>
                                <p className="text-sm text-blue-200">Management System</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="lg:hidden text-white hover:text-blue-200"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <div className="p-4 flex-1 overflow-y-auto">
                    <div className="text-blue-200 text-xs uppercase tracking-wide mb-4">
                        Navigation
                    </div>
                    <nav className="space-y-2">
                        {navigationItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    onClose();
                                }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === item.id
                                    ? 'bg-white text-blue-600 font-medium shadow-sm'
                                    : 'text-white hover:bg-blue-500 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0" />
                                <span>{item.title}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Logout Button */}
                <div className="p-4 border-t border-blue-500 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-blue-500 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        <span>Logout</span>
                    </button>
                </div>

            </div>
        </>
    );
};

// Dashboard Content Component
const DashboardContent = ({ setActiveTab }) => {
    const stats = [
        {
            title: "Total Students",
            value: "2,847",
            change: "+12%",
            changeType: "positive",
            icon: Users,
        },
        {
            title: "Active Courses",
            value: "164",
            change: "+4%",
            changeType: "positive",
            icon: GraduationCap,
        },
        {
            title: "Documents Uploaded",
            value: "1,293",
            change: "+23%",
            changeType: "positive",
            icon: FileText,
        },
        {
            title: "System Performance",
            value: "98.5%",
            change: "+0.1%",
            changeType: "positive",
            icon: TrendingUp,
        },
    ];

    const recentActivities = [
        {
            action: "New student registration",
            user: "Sarah Johnson",
            time: "2 minutes ago",
            type: "registration",
        },
        {
            action: "Document uploaded",
            user: "Prof. Martinez",
            time: "15 minutes ago",
            type: "upload",
        },
        {
            action: "Grade submitted",
            user: "Dr. Chen",
            time: "1 hour ago",
            type: "grade",
        },
        {
            action: "System backup completed",
            user: "System",
            time: "3 hours ago",
            type: "system",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Here's what's happening with your university today.
                    </p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Generate Report
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                            <stat.icon className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="flex items-center space-x-1 text-xs mt-1">
                            <span className={`font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                                }`}>
                                {stat.change}
                            </span>
                            <span className="text-gray-500">from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Activities */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
                        <p className="text-gray-600">Latest actions across your system</p>
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-blue-200">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                    <div className={`h-2 w-2 rounded-full ${activity.type === "registration" ? "bg-green-500" :
                                        activity.type === "upload" ? "bg-blue-600" :
                                            activity.type === "grade" ? "bg-orange-500" :
                                                "bg-gray-500"
                                        }`} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                    <p className="text-xs text-gray-500">
                                        by {activity.user} • {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                        <p className="text-gray-600">Common administrative tasks</p>
                    </div>
                    <div className="grid gap-3">

                        <button
                            onClick={() => setActiveTab("addStudent")}
                            className="flex items-center justify-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Users className="w-4 h-4 text-gray-600" />
                            <span>Add New Student</span>
                        </button>
                        <button className="flex items-center justify-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <FileText className="w-4 h-4 text-gray-600" />
                            <span>Upload Bulk Documents</span>
                        </button>
                        <button className="flex items-center justify-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <GraduationCap className="w-4 h-4 text-gray-600" />
                            <span>Create New Course</span>
                        </button>
                        <button className="flex items-center justify-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <TrendingUp className="w-4 h-4 text-gray-600" />
                            <span>View Analytics</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple content for other tabs
const SimpleTabContent = ({ title, description }) => (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600">{description}</p>
    </div>
);

// Main Admin Dashboard Component
const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardContent setActiveTab={setActiveTab} />;
            case 'students':
                return <ManageStudent />;
            case 'documents':
                return <UploadDocuments />;
            case 'departments':
                return <DepartmentOverview />;
            case 'settings':
                return <Setting />;
            case 'addStudent':                      // ✅ Add this
                return <AddStudent />;
            default:
                return <DashboardContent setActiveTab={setActiveTab} />;
        }
    };

    return (
        <div className="min-h-screen bg-blue-200 flex">
            {/* Sidebar */}
            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* Main Content */}
            <div className="flex-1 lg:ml-0">
                {/* Top Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden text-gray-600 hover:text-gray-900"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="hidden lg:block">
                            <h2 className="text-xl font-semibold text-gray-900 capitalize">
                                {activeTab === 'dashboard' ? 'Dashboard' : activeTab.replace(/([A-Z])/g, ' $1').trim()}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-600">Admin User</div>
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};
export default AdminDashboard;