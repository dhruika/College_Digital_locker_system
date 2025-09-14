import { useState } from "react";
import axios from "axios";

export default function StudentLogin({ onLogin }) {
    const [pnr, setPnr] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/students/login", {
                pnr,
                password,
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isAdmin", false);

            if (res.data.firstTime) {
                onLogin("resetPassword", res.data.student); // redirect to reset page
            } else {
                onLogin("student"); // redirect to student dashboard
            }
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
                <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>
                {error && <p className="text-red-500 mb-3">{error}</p>}
                <input
                    type="text"
                    placeholder="PNR"
                    value={pnr}
                    onChange={(e) => setPnr(e.target.value)}
                    className="w-full p-3 border rounded mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded mb-4"
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
