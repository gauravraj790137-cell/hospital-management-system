import express from "express";
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from "../controllers/patientController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.post(
  "/",
  verifyJWT,
  authorizeRoles("admin", "doctor"),
  createPatient
);

router.get(
  "/",
  verifyJWT,
  authorizeRoles("admin", "doctor"),
  getAllPatients
);

router.get(
  "/:id",
  verifyJWT,
  authorizeRoles("admin", "doctor", "patient"),
  getPatientById
);

router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles("admin", "doctor"),
  updatePatient
);

router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles("admin"),
  deletePatient
);

export default router;