import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Student from "./models/Student.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected...");

        const students = [
            {
                pnr: "1234567890",
                name: "Dhruvika Sharma",
                email: "dhruvika@example.com",
                department: "Computer Applications",
                year: 3,
                password: "123456",
            },
            {
                pnr: "9876543210",
                name: "Rohit Kumar",
                email: "rohit@example.com",
                department: "Computer Science",
                year: 2,
                password: "abcdef",
            },
        ];

        // Hash passwords before inserting
        for (let student of students) {
            const salt = await bcrypt.genSalt(10);
            student.password = await bcrypt.hash(student.password, salt);
        }

        await Student.deleteMany(); // clear old data
        await Student.insertMany(students);

        console.log("Dummy data inserted ✅");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
