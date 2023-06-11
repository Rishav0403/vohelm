import express from "express";
import { register, login } from "../controllers/auth/userauth.js";
// jwt authentication for routes

const router = express.Router();

// user Auth
router.route("/user/login").post(login);
router.route("/user/register").post(register);

export default router;
