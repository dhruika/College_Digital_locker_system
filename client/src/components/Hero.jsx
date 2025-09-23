// src/components/Hero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import AdminDashboard from "../pages/AdminDashboard";
import StudentDashboard from "../pages/StudentDashboard";

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* LEFT */}
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                            Your Digital{" "}
                            <span className="text-blue-600">Student Locker</span> in the Cloud
                        </h1>

                        <p className="mt-4 text-gray-600">
                            Securely store, access, and manage all your academic documents
                            from anywhere. No more lost certificates or damaged mark sheets.
                        </p>

                        {/* Search bar */}
                        <div className="mt-6">
                            <label htmlFor="docSearch" className="sr-only">
                                Search your documents
                            </label>
                            <div className="max-w-md w-full bg-white rounded-md shadow-sm p-2 flex items-center gap-3
                              focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500
                              transition-shadow duration-200">
                                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 ml-2" />
                                <input
                                    id="docSearch"
                                    type="search"
                                    placeholder="Search your documents..."
                                    aria-label="Search your documents"
                                    className="flex-grow px-2 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 hover:-translate-y-0.5 transform transition">
                                Get Started
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-100 transition">
                                Learn More
                            </button>
                            <button
                                onClick={() => navigate("/admin-dashboard")}
                                className="bg-green-500 text-white px-5 py-2 rounded-md shadow hover:bg-green-600 transition">
                                Admin Dashboard (Test)
                            </button>
                            <button
                                onClick={() => navigate("/student-dashboard")}
                                className="bg-green-500 text-white px-5 py-2 rounded-md shadow hover:bg-green-600 transition">
                                Student Dashboard (Test)
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="mt-8 flex space-x-10">
                            <div>
                                <p className="text-blue-600 font-bold text-lg">1000+</p>
                                <p className="text-gray-500 text-sm">Active Students</p>
                            </div>
                            <div>
                                <p className="text-green-600 font-bold text-lg">99.9%</p>
                                <p className="text-gray-500 text-sm">Uptime</p>
                            </div>
                            <div>
                                <p className="text-orange-500 font-bold text-lg">24/7</p>
                                <p className="text-gray-500 text-sm">Access</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="relative">
                        <img
                            src="src/assets/slogan.jpg"
                            alt="Student using phone"
                            className="rounded-xl shadow-lg w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
