import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersByCreator
} from "../controllers/UserController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// User endpoints
router.get("/users/by-creator/:creatorId", verifyToken, getUsersByCreator);
router.get("/users/:id", verifyToken, getUserById);
router.get("/users", verifyToken, getUsers);
router.post("/users", verifyToken, createUser);
router.patch("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

export default router;
