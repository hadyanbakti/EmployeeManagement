import express from "express";
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} from "../controllers/DepartmentController.js";

const router = express.Router();

// Department endpoints
router.post("/departments", createDepartment);
router.get("/departments", getDepartments);
router.get("/departments/:id", getDepartmentById);
router.patch("/departments/:id", updateDepartment);
router.delete("/departments/:id", deleteDepartment);

export default router;