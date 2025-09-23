import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const navigate = useNavigate();

    // Keep navbar in sync with localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const savedUser = localStorage.getItem("user");
            setUser(savedUser ? JSON.parse(savedUser) : null);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login"); // redirect after logout
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow relative">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
                {/* Logo Image */}
                <img
                    src="src/assets/logo.png" // ✅ replace with your logo path
                    alt="DigiLocker Logo"
                    className="h-8 w-8 object-contain"
                />
                <span>DigiLocker</span>
            </Link>

            <div className="flex gap-4 items-center">
                {!user ? (
                    <>
                        {/* ⬇️ CHANGE: replaced plain Login <Link> with a dropdown */}
                        <div className="relative group inline-block">
                            {/* Login Button */}
                            <button className="hover:text-green-600">
                                Login ▾
                            </button>

                            {/* Dropdown Menu - now flush with button */}
                            <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-md rounded-md w-40 z-50">
                                <Link
                                    to="/students-login"
                                    className="block px-4 py-2 hover:bg-green-100 hover:text-green-600"
                                >
                                    Login as Student
                                </Link>
                                <Link
                                    to="/admin-login"
                                    className="block px-4 py-2 hover:bg-green-100 hover:text-green-600"
                                >
                                    Login as Admin
                                </Link>
                            </div>
                        </div>


                        {/* ⬆️ CHANGE END */}

                        <Link to="/register" className="hover:text-green-600">Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile" className="hover:text-green-600">My Profile</Link>
                        <Link to="/documents" className="hover:text-green-600">Documents</Link>
                        <Link to="/upload" className="hover:text-green-600">Upload Documents</Link>
                        <button
                            onClick={handleLogout}
                            className="text-red-500 hover:underline"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
