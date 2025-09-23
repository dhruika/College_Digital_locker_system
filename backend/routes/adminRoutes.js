import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import { loginAdmin } from "../controllers/adminController.js";
import XLSX from "xlsx";



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

// ✅ Upload LC Excel and generate PDFs
router.post("/upload-lc", upload.single("excel"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No Excel file uploaded" });
        }

        // Ensure directory exists
        const certDir = path.join("uploads", "certificates");
        if (!fs.existsSync(certDir)) fs.mkdirSync(certDir, { recursive: true });

        // 1. Read Excel

        const workbook = XLSX.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);

        // 2. Launch Puppeteer once
        const puppeteer = await import("puppeteer");
        const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
        const page = await browser.newPage();

        const results = [];
        for (const row of rows) {
            const { pnr, name, department, year, reason } = row;
            const student = await Student.findOne({ pnr });

            if (!student) {
                results.push({ pnr, status: "❌ Student not found in DB" });
                continue;
            }

            // Example LC HTML
            const html = `
                <html>
                <body style="font-family: Arial, sans-serif; padding:40px;">
                    <h1 style="text-align:center;">Leaving Certificate</h1>
                    <p><b>Name:</b> ${name}</p>
                    <p><b>PNR:</b> ${pnr}</p>
                    <p><b>Department:</b> ${department}</p>
                    <p><b>Year:</b> ${year}</p>
                    <p><b>Reason:</b> ${reason || "N/A"}</p>
                    <p>Date: ${new Date().toLocaleDateString()}</p>
                </body>
                </html>
            `;

            await page.setContent(html, { waitUntil: "networkidle0" });
            const pdfPath = path.join(certDir, `${pnr}-LC-${Date.now()}.pdf`);
            await page.pdf({ path: pdfPath, format: "A4", printBackground: true });

            // Save to DB
            student.documents.push({
                type: "LC",
                url: pdfPath,
                uploadedAt: new Date()
            });
            await student.save();

            results.push({ pnr, status: "✅ LC generated and saved" });
        }

        await browser.close();
        res.json({ message: "LC generation completed", results });

    } catch (err) {
        console.error("Error in LC upload:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});



export default router;



