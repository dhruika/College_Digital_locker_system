import express from 'express';
import Student from '../models/Student.js';
const router = express.Router();

// GET documents of a student by PNR
// GET all documents for a specific student
router.get("/:pnr", async (req, res) => {
    try {
        const { pnr } = req.params;
        console.log("PNR received:", pnr);

        const documents = await Document.find({ pnr });
        res.json(documents);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;
