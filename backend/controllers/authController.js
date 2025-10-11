// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

// Register Student
export const registerStudent = async (req, res) => {
    try {
        const { pnr, name, email, department, year, password } = req.body;

        // Validate required fields
        if (!pnr || !name || !email || !department || !year || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if student already exists by PNR OR Email
        const existing = await Student.findOne({ $or: [{ pnr }, { email }] });
        if (existing) {
            return res.status(400).json({ message: "Student already registered" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new student
        const newStudent = new Student({
            pnr,
            name,
            email,
            department,
            year,
            password: hashedPassword,
        });

        await newStudent.save();
        res.status(201).json({ message: "Student registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error registering student", error: err.message });
    }
};

// Login Student
export const loginStudent = async (req, res) => {
    try {
        const { pnr, password } = req.body;

        if (!pnr || !password) {
            return res.status(400).json({ message: "PNR and password are required" });
        }

        // Find student
        const student = await Student.findOne({ pnr });
        if (!student) {
            return res.status(400).json({ message: "Invalid PNR or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid PNR or password" });
        }

        // Optional: If first-time login with default password, tell frontend to ask for password change
        const firstTime = student.isDefaultPassword;

        // Generate JWT
        const token = jwt.sign(
            { id: student._id, pnr: student.pnr },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            firstTime,  // send this flag to frontend
            student: {
                id: student._id,
                pnr: student.pnr,
                name: student.name,
                email: student.email,
                department: student.department,
                year: student.year,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
};

// Change Password Controller
export const changePassword = async (req, res) => {
    try {
        console.log("🟢 Password change request received:", req.body);  //hereeeee

        const { pnr, currentPassword, newPassword } = req.body;

        if (!pnr || !currentPassword || !newPassword) {
            console.log("❌ Student not found");// hereeeee

            return res.status(400).json({ message: "All fields are required" });
        }

        // Find student by ID
        const student = await Student.findById({ pnr });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Compare current password
        const isMatch = await bcrypt.compare(currentPassword, student.password);
        console.log("🟡 Password match result:", isMatch);
        if (!isMatch) {

            return res.status(401).json({ message: "Current password is incorrect" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        student.password = hashedPassword;
        await student.save();
        console.log("✅ Password updated successfully");
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("🔥 Error in changePassword:", error);
        console.error("Change password error:", error);
        res.status(500).json({ message: "Something went yo  wrong" });
    }
};