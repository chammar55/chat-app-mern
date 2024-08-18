// note that:
// auth.routes.js is an optional name we also use any simple without . name like auth.js
import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/logout", logout);

export default router;
