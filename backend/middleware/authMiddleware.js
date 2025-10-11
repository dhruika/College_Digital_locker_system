import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

export const authenticateStudent = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

        // Fetch full student document
        const student = await Student.findById(decoded.id);

        if (!student) {
            return res.status(401).json({ message: "Student not found" });
        }

        req.student = student; // attach full student doc to request
        next();
    } catch (err) {
        console.error("❌ Auth middleware error:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
