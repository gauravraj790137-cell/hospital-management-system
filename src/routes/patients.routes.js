import express from "express";

import {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient
} from "../controllers/patientController.js";

import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.post("/", verifyJWT, createPatient);

router.get("/", verifyJWT, getAllPatients);

router.get("/:id", verifyJWT, getPatientById);

router.patch("/:id", verifyJWT, updatePatient);

router.delete("/:id", verifyJWT, deletePatient);

export default router;