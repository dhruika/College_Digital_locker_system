import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const email = "admin@example.com";
        const plainPassword = "Admin@123"; // change as needed

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            console.log("⚠️ Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const admin = new Admin({
            email,
            password: hashedPassword,
        });

        await admin.save();
        console.log("✅ Admin created successfully:", email);
        process.exit(0);
    } catch (err) {
        console.error("❌ Error creating admin:", err.message);
        process.exit(1);
    }
};

createAdmin();
