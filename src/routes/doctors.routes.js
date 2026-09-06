import express from "express";
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} from "../controllers/doctorController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.post(
  "/",
  verifyJWT,
  authorizeRoles("admin"),
  createDoctor
);

router.get(
  "/",
  verifyJWT,
  authorizeRoles("admin", "doctor"),
  getAllDoctors
);

router.get(
  "/:id",
  verifyJWT,
  authorizeRoles("admin", "doctor"),
  getDoctorById
);

router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles("admin"),
  updateDoctor
);

router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles("admin"),
  deleteDoctor
);

export default router;