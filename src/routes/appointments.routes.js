import { Router } from "express";
import {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} from "../controllers/appointment.controller.js";

const router = Router();

router.post("/", createAppointment);

router.get("/", getAppointments);

router.get("/:id", getAppointmentById);

router.patch("/:id", updateAppointment);

router.delete("/:id", deleteAppointment);

export default router;