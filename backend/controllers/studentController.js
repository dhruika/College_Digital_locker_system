import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ============================
// Student Registration (Activation)
// ============================
export const registerStudent = async (req, res) => {
    try {
        const { pnr, email } = req.body;

        if (!pnr || !email) {
            return res.status(400).json({ message: "PNR and Email are required" });
        }

        const student = await Student.findOne({ pnr });
        if (!student) {
            return res.status(404).json({ message: "PNR not found. Please contact admin." });
        }

        if (student.email !== email) {
            return res.status(400).json({ message: "Email does not match the PNR record." });
        }

        // Registration is just validation; password is default
        if (student.status === "registered" && !student.isDefaultPassword) {
            return res.status(400).json({ message: "Student already registered." });
        }

        res.status(200).json({
            message: "Student exists. Please login using default password.",
            student: {
                pnr: student.pnr,
                name: student.name,
                email: student.email,
                department: student.department,
                year: student.year,
                status: student.status
            }
        });
    } catch (err) {
        console.error("❌ Error in registerStudent:", err);
        res.status(500).json({ message: "Error registering student", error: err.message });
    }
};

// ============================
// Student Login
// ============================
export const loginStudent = async (req, res) => {
    try {
        const { pnr, password, email } = req.body;

        if (!pnr || !password) {
            return res.status(400).json({ message: "PNR and Password are required" });
        }

        const student = await Student.findOne({ pnr });
        if (!student || !student.password) {
            return res.status(400).json({ message: "Invalid PNR or password" });
        }

        const DEFAULT_PASSWORD = "student@123";

        // Check if password matches stored hash
        let isMatch = await bcrypt.compare(password, student.password);

        // First-time login with default password (if student still has default)
        if (!isMatch && student.isDefaultPassword) {
            if (password === DEFAULT_PASSWORD) {
                return res.status(200).json({
                    success: true,
                    message: "You are using the default password. Please change it before continuing.",
                    firstTime: true,
                    user: {
                        pnr: student.pnr,
                        name: student.name,
                        email: student.email,
                        department: student.department,
                        year: student.year,
                        role: "student"
                    }
                });
            } else {
                return res.status(400).json({ success: false, message: "Invalid PNR or password" });
            }
        }



        // If password doesn't match at all
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid PNR or password" });
        }

        // Normal login
        const token = jwt.sign(
            { id: student._id, pnr: student.pnr },
            process.env.JWT_SECRET || "secretkey",
            { expiresIn: "1h" }
        );

        student.lastLogin = new Date();
        await student.save();

        //res.status(200).json({ message: "Login successful", token, student });
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                pnr: student.pnr,
                name: student.name,
                email: student.email,
                department: student.department,
                year: student.year,
                role: "student",   // <-- important
            },
            firstTime: student.isDefaultPassword,
        });


    } catch (err) {
        console.error("Error in loginStudent:", err);
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
};


// ============================
// Change Password (First-time or regular)
// ============================
export const changePassword = async (req, res) => {
    try {
        const { pnr, oldPassword, newPassword } = req.body;

        if (!pnr || !oldPassword || !newPassword) {
            return res.status(400).json({ message: "PNR, old password, and new password are required" });
        }

        const student = await Student.findOne({ pnr: pnr });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Check old password, also allow default password for first-time login
        const isDefaultPassword = student.isDefaultPassword && oldPassword === "student@123";
        const isMatch = isDefaultPassword || await bcrypt.compare(oldPassword, student.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        student.password = hashedPassword;
        student.isDefaultPassword = false; // mark as changed from default
        student.status = "registered";
        await student.save();

        res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error changing password", error: err.message });
    }
};

