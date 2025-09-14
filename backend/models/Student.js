import mongoose from "mongoose";

// Document sub-schema
const documentSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., "ID Card", "Marksheet"
    url: { type: String, required: true },  // file storage path / cloud link
    uploadedAt: { type: Date, default: Date.now }
});

// Main Student schema
const studentSchema = new mongoose.Schema({
    pnr: { type: String, required: true, unique: true }, // Primary key
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    department: { type: String, required: true },
    year: { type: String, required: true },

    // Login-related fields
    password: { type: String, required: true },
    defaultPasswordHash: { type: String, required: false },
    isDefaultPassword: { type: Boolean, default: true }, // new field to track first-time login
    status: { type: String, enum: ["unregistered", "registered"], default: "unregistered" },
    lastLogin: { type: Date, default: null },

    // Array of documents
    documents: [documentSchema]
}, { timestamps: true });

// Export model safely (handles hot reloads)
const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
export default Student;
console.log("Student model collection:", Student.collection.name);

