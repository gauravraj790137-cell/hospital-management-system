import express from "express";

import {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord
} from "../controllers/medicalRecordController.js";

import { verifyJWT } from "../middlewares/verifyJWT.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.post(
  "/",
  verifyJWT,
  authorizeRoles("admin", "doctor"),
  createMedicalRecord
);

router.get(
  "/",
  verifyJWT,
  authorizeRoles("admin", "doctor"),
  getAllMedicalRecords
);

router.get(
  "/:id",
  verifyJWT,
  authorizeRoles("admin", "doctor", "patient"),
  getMedicalRecordById
);

router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles("admin", "doctor"),
  updateMedicalRecord
);

router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles("admin"),
  deleteMedicalRecord
);

export default router;