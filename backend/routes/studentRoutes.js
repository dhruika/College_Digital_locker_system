import express from "express";
import { authenticateStudent } from "../middleware/authMiddleware.js";
import { registerStudent, loginStudent, changePassword } from "../controllers/studentController.js";
import multer from "multer";
import Student from "../models/Student.js";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


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
console.log("✅ Student routes loaded successfully"),

    // Upload a new document (student)
    router.post(

        "/upload-document",
        authenticateStudent, // make sure student is logged in
        upload.single("file"), // 'file' is the key from frontend FormData
        async (req, res) => {
            try {
                const studentId = req.student.id; // from auth middleware
                const { docType, description } = req.body;

                const student = await Student.findById(studentId);
                if (!student) return res.status(404).json({ message: "Student not found" });

                const newDoc = {
                    type: docType,
                    url: `uploads/${req.file.filename}`,
                    uploadedAt: new Date(),
                    uploadedBy: "student",
                    description: description || ""
                };

                student.documents.push(newDoc);
                await student.save();

                res.json({ message: "Document uploaded successfully", document: newDoc });
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: "Upload failed" });
            }
        }
    );



export { router as studentRoutes };
