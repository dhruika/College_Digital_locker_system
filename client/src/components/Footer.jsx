// src/components/Footer.jsx
export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Brand / Logo */}
                <div>
                    <h3 className="text-white text-xl font-bold mb-4">DigiLocker</h3>
                    <p className="text-sm leading-relaxed">
                        Securely store and access your important documents anywhere, anytime.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:text-white transition">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition">
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition">
                                How It Works
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-white transition">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                    <ul className="space-y-2 text-sm">
                        <li>Email: support@digilocker.com</li>
                        <li>Phone: +1 234 567 890</li>
                        <li>Address: 123 Secure Lane, Cloud City</li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-700 py-4 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} DigiLocker. All rights reserved.
            </div>
        </footer>
    );
}
