import express from "express";
import { register, login } from "../controllers/auth/userauth.js";
// jwt authentication for routes

const router = express.Router();

// user Auth
router.route("/user/login").post(login);
router.route("/user/signup").post(register);

router.route("/hospital/login").post(login);
router.route("/hospital/signup").post(register);

export default router;
