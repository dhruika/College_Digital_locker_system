import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import documentRoutes from './routes/document.js';
import { studentRoutes } from "./routes/studentRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(cors());
app.use(express.json());

// Serve the uploads folder as static
app.use('/uploads', express.static(path.join(path.resolve(), "uploads")));

// Routes
import authRoutes from "./routes/auth.js"; // ensure auth.js exports { router }
import adminRoutes from "./routes/adminRoutes.js";





// app.use(cors({
//     origin: "http://localhost:5173", // frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));



// Prevent strict query warning
mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); // Stop server if DB fails
    });

// Routes
app.use('/api/documents', documentRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Health Check route
app.get("/", (req, res) => {
    res.send("🚀 DigiLocker Backend is Running with MongoDB!");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
