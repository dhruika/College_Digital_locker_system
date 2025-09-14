import { useState } from "react";
import axios from "axios";

export default function ResetPassword({ student, onReset }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/admin/change-password", {
                pnr: student.pnr,
                oldPassword,
                newPassword,
            });
            setSuccess("Password changed successfully! Please log in again.");
            setTimeout(() => onReset(), 1500); // go back to login
        } catch (err) {
            setError(err.response?.data?.message || "Reset failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleReset}
                className="bg-white p-8 rounded-2xl shadow-md w-96"
            >
                <h2 className="text-xl font-bold mb-6 text-center">
                    Reset Your Password
                </h2>
                {error && <p className="text-red-500 mb-3">{error}</p>}
                {success && <p className="text-green-500 mb-3">{success}</p>}
                <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full p-3 border rounded mb-4"
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 border rounded mb-4"
                />
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
}
