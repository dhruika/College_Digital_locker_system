import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [pnr, setPNR] = useState("");
    const [email, setEmail] = useState(""); // optional
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Call backend auth route
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                pnr,
                email,
                password,
            });

            const { success, firstTime, user, message } = response.data;

            if (!success) {
                setError(message || "Invalid credentials");
                return;
            }

            // Save user locally for Navbar and further requests
            localStorage.setItem("user", JSON.stringify(user));

            // Navigate based on first-time login
            if (firstTime) {
                navigate("/set-password"); // new password setup page
            } else {
                if (user.role === "admin") {
                    console.log("➡️ Redirecting to admin dashboard");
                    navigate("/admin-dashboard");
                }
                else {
                    console.log("➡️ Redirecting to student dashboard");
                    navigate("/student-dashboard");
                }// student dashboard
            }
        } catch (err) {
            setError(err.response?.data?.message || "Server error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
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
                        type="email"
                        placeholder="Email (optional)"
                        className="w-full p-2 mb-4 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                </form>
            </div>
        </div>
    );
}
