import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import documentRoutes from './routes/document.js';


// Routes
import { studentRoutes } from "./routes/studentRoutes.js";
import authRoutes from "./routes/auth.js"; // ensure auth.js exports { router }
import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/documents', documentRoutes);

app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true
}));

app.use(express.json());

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
