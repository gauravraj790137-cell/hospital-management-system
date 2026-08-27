import express from "express";
const router = express.Router();


import{

} from "../controllers/departmentController.js";

router.post("/", createDepartment);

router.get("/", getAllDepartments);

router.get("/:id", getDepartmentById);

router.patch("/:id", updateDepartment);

router.delete("/:id", deleteDepartment);


export default router;