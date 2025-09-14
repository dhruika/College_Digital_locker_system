import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    HomeIcon,
    UserGroupIcon,
    DocumentArrowUpIcon,
    BuildingLibraryIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({ user, onLogout }) {
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, path: "/admin" },
        { name: "Manage Students", icon: <UserGroupIcon className="w-5 h-5" />, path: "/admin/manage-students" },
        { name: "Upload Documents", icon: <DocumentArrowUpIcon className="w-5 h-5" />, path: "/admin/upload-documents" },
        { name: "Department Overview", icon: <BuildingLibraryIcon className="w-5 h-5" />, path: "/admin/department-overview" },
        { name: "Settings", icon: <Cog6ToothIcon className="w-5 h-5" />, path: "/admin/settings" },
    ];

    return (
        <aside className="w-64 h-screen bg-blue-600 text-white flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-blue-500">
                DigiLocker Admin
            </div>

            <nav className="flex-1 mt-6">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3 px-6 py-3 hover:bg-blue-700 transition ${location.pathname === item.path ? "bg-blue-700" : ""
                            }`}
                    >
                        {item.icon}
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="p-6 border-t border-blue-500">
                <div className="mb-2 text-sm font-semibold">{user?.name || "Admin"}</div>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded transition"
                >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
