import express from "express";
import Student from "../models/Student.js";
const router = express.Router();

// GET documents of a student by PNR
router.get("/:pnr", async (req, res) => {
    try {
        const { pnr } = req.params;
        const student = await Student.findOne({ pnr });

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Return the nested documents array
        res.json(student.documents || []);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
