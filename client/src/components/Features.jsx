// src/components/Features.jsx
import React from "react";
import {
    IdentificationIcon,
    AcademicCapIcon,
    SunIcon,
    FolderIcon,
    ShieldCheckIcon,
    DevicePhoneMobileIcon,
    MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";

const Features = () => {
    const topFeatures = [
        {
            title: "Student ID Card",
            description:
                "Quick access to your digital student ID with photo and verification",
            icon: <IdentificationIcon className="w-8 h-8 text-white" />,
            className: "bg-[#1E90FF] hover:opacity-90", // vivid blue
        },
        {
            title: "Mark Sheets",
            description: "All your semester results and transcripts in one place",
            icon: <AcademicCapIcon className="w-8 h-8 text-white" />,
            className: "bg-[#4CAF50] hover:opacity-90", // vivid green
        },
        {
            title: "Certificates",
            description:
                "Course completion, achievement, and skill certificates",
            icon: <SunIcon className="w-8 h-8 text-white" />,
            className: "bg-[#FFC107] hover:opacity-90", // vivid yellow
        },
        {
            title: "All Documents",
            description:
                "Browse and organize all your academic documents",
            icon: <FolderIcon className="w-8 h-8 text-white" />,
            className: "bg-[#FF9800] hover:opacity-90", // vivid orange
        },
    ];

    const bottomFeatures = [
        {
            title: "Bank-Level Security",
            description:
                "Your documents are encrypted with 256-bit SSL and stored in secure cloud infrastructure with multi-factor authentication.",
            icon: <ShieldCheckIcon className="w-8 h-8 text-blue-700" />,
        },
        {
            title: "Anywhere Access",
            description:
                "Access your documents from any device - smartphone, tablet, or computer. Works offline with automatic sync.",
            icon: <DevicePhoneMobileIcon className="w-8 h-8 text-green-700" />,
        },
        {
            title: "Smart Organization",
            description:
                "AI-powered search and automatic categorization makes finding any document instant and effortless.",
            icon: <MagnifyingGlassCircleIcon className="w-8 h-8 text-green-700" />,
        },
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Everything You Need in One{" "}
                        <span className="text-blue-700">Secure Place</span>
                    </h2>
                    <p className="mt-2 text-gray-500 max-w-2xl mx-auto">
                        Access your academic documents instantly with military-grade security and seamless organization
                    </p>
                </div>

                {/* Top features */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topFeatures.map((feature, index) => (
                        <div
                            key={index}
                            tabIndex={0}
                            className={`${feature.className} text-white rounded-lg p-6 shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer outline-none`}
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold">
                                {feature.title}
                            </h3>
                            <p className="text-sm mt-1 opacity-90">{feature.description}</p>
                            <a
                                href="#"
                                className="mt-3 inline-flex items-center text-sm underline"
                            >
                                {feature.link || "View"} →
                            </a>
                        </div>
                    ))}
                </div>

                {/* Bottom features */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {bottomFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="mb-4 p-4 rounded-full bg-blue-100 flex items-center justify-center">
                                {feature.icon}
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">
                                {feature.title}
                            </h4>
                            <p className="mt-2 text-sm text-gray-700">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
