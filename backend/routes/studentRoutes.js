import express from "express";
import { authenticateStudent } from "../middleware/authMiddleware.js";
import { registerStudent, loginStudent, changePassword } from "../controllers/studentController.js";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
    res.send("Student route working ✅");
});

// Register new student
router.post("/register", async (req, res, next) => {
    console.log("📥 /register request body:", req.body); // Debug incoming data
    try {
        await registerStudent(req, res, next);
    } catch (err) {
        console.error("❌ Error in /register route:", err);
        res.status(500).json({ message: "Error in student register route" });
    }
});

// Login student using PNR
router.post("/login", async (req, res, next) => {
    console.log("📥 /login request body:", req.body);
    try {
        await loginStudent(req, res, next);
    } catch (err) {
        console.error("❌ Error in /login route:", err);
        res.status(500).json({ message: "Error in student login route" });
    }
});

// ✅ First-time password setup
router.post("/set-password", async (req, res, next) => {
    console.log("📥 /set-password request body:", req.body);
    try {
        await changePassword(req, res, next);
    } catch (err) {
        console.error("❌ Error in /set-password route:", err);
        res.status(500).json({ message: "Error in password setup route" });
    }
});

export { router as studentRoutes };
