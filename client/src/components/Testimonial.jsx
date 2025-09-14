// src/components/Testimonials.jsx
const testimonials = [
    {
        name: "Aarav Sharma",
        role: "Engineering Student",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        quote:
            "DigiLocker has made it so easy to keep all my certificates and mark sheets safe. I can access them during interviews instantly!",
    },
    {
        name: "Priya Verma",
        role: "Working Professional",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        quote:
            "No more worrying about losing my important documents. DigiLocker gives me peace of mind with its security features.",
    },
    {
        name: "Rohit Patel",
        role: "MBA Graduate",
        image: "https://randomuser.me/api/portraits/men/55.jpg",
        quote:
            "I love how simple it is to use. Upload once and access anywhere — it's a game changer for my career.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                        What Our Users Say
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Thousands of people trust DigiLocker with their documents.
                    </p>
                </div>

                {/* testimonials */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className="p-8 bg-slate-50 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition"
                        >
                            {/* profile */}
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                                />
                                <div>
                                    <h3 className="font-semibold text-slate-800">{t.name}</h3>
                                    <p className="text-sm text-slate-500">{t.role}</p>
                                </div>
                            </div>

                            {/* quote */}
                            <p className="text-slate-600 italic">"{t.quote}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
