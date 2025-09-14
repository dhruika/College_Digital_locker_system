import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import { loginAdmin } from "../controllers/adminController.js";



const router = express.Router();



// Admin login
router.post("/login", loginAdmin);

// Setup multer storage
// Setup multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join("uploads", "certificates");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const studentId = req.params.studentId || Date.now();
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname); // get file extension (.pdf, .jpg, etc.)
        cb(null, `${studentId}-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({ storage });

// ✅ Add Student Manually
router.post("/add-student", async (req, res) => {
    try {
        const { pnr, name, email, department, year } = req.body;
        if (!pnr || !name || !email || !department || !year) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingStudent = await Student.findOne({ $or: [{ pnr }, { email }] });
        if (existingStudent) {
            return res.status(400).json({ message: "Student with this PNR or Email already exists" });
        }

        const defaultPassword = "123456";
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        const newStudent = new Student({
            pnr,
            name,
            email,
            department,
            year,
            password: hashedPassword,
            isDefaultPassword: true
        });

        await newStudent.save();
        res.status(201).json({ message: "✅ Student record added by Admin successfully", student: newStudent });
    } catch (err) {
        console.error("Error adding student record:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// ✅ Get All Students
router.get("/all-students", async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.status(200).json({ count: students.length, students });
    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// ✅ Upload manual PDF for a student
// Upload multiple PDFs for a student
router.post("/upload-pdf/:pnr", upload.array("pdfs", 5), async (req, res) => {
    try {
        const pnr = req.params.pnr;
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No PDF uploaded" });
        }

        // Map uploaded files into document objects
        const newDocs = req.files.map(file => ({
            type: req.body.type || "Certificate", // default but can be custom
            url: path.join("uploads", "certificates", file.filename),
            uploadedAt: new Date()
        }));

        // Update student record
        const student = await Student.findOneAndUpdate(
            { pnr },
            { $push: { documents: { $each: newDocs } } }, // push multiple at once
            { new: true }
        );

        if (!student) return res.status(404).json({ message: "Student not found" });

        res.json({ message: "PDF(s) uploaded successfully", student });
    } catch (err) {
        console.error("Error uploading PDF:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;



