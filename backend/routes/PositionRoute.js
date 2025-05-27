import express from "express";
import {
  createPosition,
  getPositions,
  getPositionById,
  updatePosition,    
  deletePosition     
} from "../controllers/PositionController.js";

const router = express.Router();

// Position endpoints
router.post("/positions", createPosition);
router.get("/positions", getPositions);
router.get("/positions/:id", getPositionById);
router.patch("/positions/:id", updatePosition);  
router.delete("/positions/:id", deletePosition); 

export default router;