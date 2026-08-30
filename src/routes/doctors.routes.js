import express from "express";

const router = express.Router();

import {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
} from "../controllers/doctorController.js";

router.post("/", createDoctor);

router.get("/", getAllDoctors);

router.get("/:id", getDoctorById);

router.patch("/:id", updateDoctor);

router.delete("/:id", deleteDoctor);

export default router;