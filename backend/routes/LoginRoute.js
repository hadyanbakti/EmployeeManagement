import express from "express";
import {
  Register,
  LoginUser,
  Logout,
  refreshToken
} from "../controllers/LoginController.js";

const router = express.Router();

// Auth endpoints
router.post("/register", Register);
router.post("/login", LoginUser);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
