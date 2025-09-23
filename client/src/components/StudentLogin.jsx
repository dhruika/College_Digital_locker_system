import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
console.log("📌 StudentLogin.jsx loaded");
export default function StudentLogin() {
    const [pnr, setPNR] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("📌 handleLogin triggered");

        setError("");

        try {
            const response = await axios.post(
                "http://localhost:5000/api/students/login",
                { pnr, password },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Full login response:", response.data);
            const { success, firstTime, user, message } = response.data;

            if (!success) {
                setError(message || "Invalid credentials");
                return;
            }

            localStorage.setItem("user", JSON.stringify(user));

            if (firstTime) {
                navigate("/change-password");
            } else {
                console.log("➡️ Redirecting to student dashboard");
                navigate("/student-dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Server error");
        }
    };

    console.log("📌 Rendered StudentLogin component");
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Student Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="PNR"
                        className="w-full p-2 mb-4 border rounded"
                        value={pnr}
                        onChange={(e) => setPNR(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-4 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => console.log("📌 Button clicked directly")}
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    >
                        Test Button
                    </button>
                </form>
            </div>
        </div>
    );
}
