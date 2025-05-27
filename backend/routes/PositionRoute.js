import express from "express";
import {
  createPosition,
  getPositions,
  getPositionById,
  updatePosition,    // ADD: Import updatePosition
  deletePosition     // ADD: Import deletePosition
} from "../controllers/PositionController.js";

const router = express.Router();

// Position endpoints
router.post("/positions", createPosition);
router.get("/positions", getPositions);
router.get("/positions/:id", getPositionById);
router.patch("/positions/:id", updatePosition);  // ADD: Update route
router.delete("/positions/:id", deletePosition); // ADD: Delete route

export default router;