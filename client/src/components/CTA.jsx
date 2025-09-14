// src/components/CallToAction.jsx
import { Link } from "react-router-dom";

export default function CTA() {
    return (
        <section className="py-20 bg-blue-600">
            <div className="max-w-7xl mx-auto px-6 text-center text-white">
                {/* heading */}
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Secure Your Documents?
                </h2>
                <p className="text-lg mb-8 opacity-90">
                    Join thousands who trust DigiLocker to keep their important files
                    safe and accessible anywhere.
                </p>

                {/* button */}
                <Link
                    to="/Login"
                    className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
                >
                    Get Started For Free
                </Link>
            </div>
        </section>
    );
}
