import fs from "fs";
import xlsx from "xlsx";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";

// ------------------------------
// Upload Excel and save student data to MongoDB
// ------------------------------
export const changePassword = async (req, res) => {
    try {
        const { pnr, oldPassword, newPassword } = req.body;

        if (!pnr || !oldPassword || !newPassword) {
            return res.status(400).json({ message: "PNR, old password, and new password are required" });
        }

        const student = await Student.findOne({ pnr });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Compare oldPassword with actual password or defaultPasswordHash
        let isMatch = await bcrypt.compare(oldPassword, student.password);
        if (!isMatch && student.defaultPasswordHash) {
            isMatch = await bcrypt.compare(oldPassword, student.defaultPasswordHash);
        }

        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        student.password = hashedPassword;
        student.defaultPasswordHash = student.defaultPasswordHash || hashedPassword; // ✅ quick fix
        student.isDefaultPassword = false;
        student.status = "registered";
        await student.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error changing password", error: err.message });
    }
};







// Admin login
export const loginAdmin = async (req, res) => {
    console.log("🔐 Admin login attempt:", req.body); // already there

    const { email, password } = req.body;

    // Log email and password types
    console.log("Email type:", typeof email, "Password type:", typeof password);

    const admin = await Admin.findOne({ email });
    if (!admin) {
        console.log("❌ Admin not found for this email");
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
        console.log("❌ Password does not match");
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
        { id: admin._id, email: admin.email, admin: true },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    console.log("✅ Login successful, token generated");
    res.status(200).json({
        message: "Admin login successful",
        token,
        admin: true,
        adminInfo: {
            id: admin._id,
            email: admin.email,
        },
    });
};
