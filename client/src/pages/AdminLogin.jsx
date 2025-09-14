import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // ✅ initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/admin/login", {
                email,
                password,
            });

            // Save full admin info in localStorage
            localStorage.setItem(
                "user",
                JSON.stringify({ ...res.data.adminInfo, token: res.data.token, admin: true })
            );

            setError(""); // clear any previous error
            navigate("/admin-dashboard"); // ✅ redirect after successful login
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                {error && <p className="text-red-500 mb-3">{error}</p>}

                <input
                    type="email"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError(""); // clear error on typing
                    }}
                    className="w-full p-3 border rounded mb-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(""); // clear error on typing
                    }}
                    className="w-full p-3 border rounded mb-4"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
