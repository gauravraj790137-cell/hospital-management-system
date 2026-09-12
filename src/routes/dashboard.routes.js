import express from "express";
import {
  getDashboardOverview,
  getAppointmentsByDepartment
} from "../controllers/dashboardController.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.get(
  "/overview",
  verifyJWT,
  authorizeRoles("admin"),
  getDashboardOverview
);

router.get(
  "/appointments-by-department",
  verifyJWT,
  authorizeRoles("admin"),
  getAppointmentsByDepartment
);

router.get(
  "/appointments-by-doctor",
  verifyJWT,
  authorizeRoles("admin"),
  getAppointmentsByDoctor
);

export default router;
