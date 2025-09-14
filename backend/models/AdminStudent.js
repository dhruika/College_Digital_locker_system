import mongoose from "mongoose";

const adminStudentSchema = new mongoose.Schema(
    {
        pnr: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        department: { type: String, required: true },
        year: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("AdminStudent", adminStudentSchema);
