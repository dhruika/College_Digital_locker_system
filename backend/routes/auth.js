import express from "express";
import { registerStudent, loginStudent, changePassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.put("/change-password", changePassword);

export default router;
