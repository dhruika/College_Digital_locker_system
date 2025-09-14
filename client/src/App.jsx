import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import Testimonials from "./components/Testimonial";
import CallToAction from "./components/CTA";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from './pages/AdminDashboard';

import AdminLogin from "./pages/AdminLogin";
import AddStudent from "./pages/AddStudent";   // ✅ Import AddStudent page

// Landing Page Layout as a component
function LandingPage() {
  return (
    <div className="font-sans antialiased text-slate-900">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}

// Temporary dashboards
function StudentDashboard() {
  return <h1 className="text-center mt-10 text-2xl">Student Dashboard</h1>;
}

function Adminboard() {
  return <h1 className="text-center mt-10 text-2xl">Admin Dashboard</h1>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Dashboards */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* ✅ New route for Add Student page */}
        <Route path="/admin/add-student" element={<AddStudent />} />
      </Routes>
    </Router>
  );
}
