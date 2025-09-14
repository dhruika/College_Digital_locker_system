import axios from "axios";

const API_URL = "http://localhost:5000/api"; // your Express backend

// Auth
export const registerUser = async (email, password, role = "student", name = "") => {
    const res = await axios.post(`${API_URL}/auth/register`, { email, password, role, name });
    return res.data;
};

export const loginUser = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data; // should return token + role
};

export const logoutUser = async () => {
    localStorage.removeItem("token");
};

// Users
export const getUser = async (token) => {
    const res = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// Certificates
export const addCertificate = async (studentId, type, fileUrl, token) => {
    const res = await axios.post(`${API_URL}/certificates`,
        { studentId, type, fileUrl },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
};

export const getCertificatesByStudentId = async (studentId, token) => {
    const res = await axios.get(`${API_URL}/certificates/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};
