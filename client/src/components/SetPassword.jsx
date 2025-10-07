import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SetPassword() {
    const [pnr, setPNR] = useState("");           // student PNR
    const [oldPassword, setOldPassword] = useState(""); // default password
    const [newPassword, setNewPassword] = useState(""); // new password
    const [confirmPassword, setConfirmPassword] = useState(""); // confirm new password
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/students/set-password",
                { pnr, oldPassword, newPassword }
            );

            const { success, message } = response.data;

            if (!success) {
                setError(message || "Failed to set password");
                return;
            }

            setSuccess("✅ Password updated successfully!");
            // Optionally, clear localStorage or save updated user info
            localStorage.setItem(
                "user",
                JSON.stringify({ pnr, firstTime: false })
            );

            // Redirect to dashboard after 1-2s
            setTimeout(() => {
                navigate("/students-login");
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Server error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Set New Password
                </h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
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
                        placeholder="Default Password"
                        className="w-full p-2 mb-4 border rounded"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full p-2 mb-4 border rounded"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full p-2 mb-4 border rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    >
                        Set Password
                    </button>
                </form>
            </div>
        </div>
    );
}
