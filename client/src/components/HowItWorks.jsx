// src/components/HowItWorks.jsx
import React from "react";
import { LockClosedIcon, ShieldCheckIcon, ArrowPathIcon, ServerIcon } from "@heroicons/react/24/solid";

const HowItWorks = () => {
    const steps = [
        {
            number: "1",
            title: "Create Your Account",
            description: "Sign up with your student email and verify your identity through secure authentication. Setup takes less than 2 minutes.",
            color: "bg-[#1E63FF]" // vivid blue
        },
        {
            number: "2",
            title: "Upload Documents",
            description: "Drag and drop your documents or take photos. Our AI automatically categorizes and organizes everything for you.",
            color: "bg-[#2E8B57]" // vivid green
        },
        {
            number: "3",
            title: "Access Anywhere",
            description: "Your documents are now available 24/7 from any device. Search, share, and download whenever you need them.",
            color: "bg-[#FFC107]" // vivid yellow
        }
    ];

    const securityFeatures = [
        {
            icon: <LockClosedIcon className="w-6 h-6 text-white" />,
            title: "End-to-End Encryption",
            description: "Your data is encrypted before it leaves your device",
            color: "bg-[#1E63FF]"
        },
        {
            icon: <ShieldCheckIcon className="w-6 h-6 text-white" />,
            title: "Multi-Factor Auth",
            description: "Extra layers of protection for your account",
            color: "bg-[#2E8B57]"
        },
        {
            icon: <ArrowPathIcon className="w-6 h-6 text-white" />,
            title: "Version Control",
            description: "Track changes and restore previous versions",
            color: "bg-[#FFC107]"
        },
        {
            icon: <ServerIcon className="w-6 h-6 text-white" />,
            title: "Secure Servers",
            description: "ISO 27001 certified data centers",
            color: "bg-[#00C2B6]"
        }
    ];

    return (
        <section className="bg-[#F5F9FF] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">
                        How It <span className="text-blue-600">Works</span>
                    </h2>
                    <p className="mt-2 text-gray-500">
                        Get started in minutes and secure your academic documents forever
                    </p>
                </div>

                {/* Steps + Image */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-start">
                                <div className={`${step.color} text-white font-bold w-10 h-10 flex items-center justify-center rounded-lg shadow-md mr-4`}>
                                    {step.number}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                                    <p className="text-gray-600 text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <img
                            src="/src/assets/hiw.png"
                            alt="Security Illustration"
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-white rounded-2xl shadow-md mt-16 p-8">
                    <h3 className="text-center text-2xl font-bold text-gray-900 mb-2">
                        Your Security is Our <span className="text-blue-600">Priority</span>
                    </h3>
                    <p className="text-center text-gray-500 mb-10">
                        We use the same security standards as banks and government institutions
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {securityFeatures.map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className={`${feature.color} w-12 h-12 flex items-center justify-center rounded-lg mx-auto mb-4`}>
                                    {feature.icon}
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                                <p className="text-sm text-gray-500">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;
