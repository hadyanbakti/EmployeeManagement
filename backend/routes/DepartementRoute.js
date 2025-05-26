import express from "express";
import {
  getAllDepartements,
  createDepartement,
  updateDepartement,
  deleteDepartement
} from "../controllers/DepartementController.js";

const router = express.Router();

router.get("/departements", getAllDepartements);
router.post("/departements", createDepartement);
router.patch("/departements/:id", updateDepartement);
router.delete("/departements/:id", deleteDepartement);

export default router; 