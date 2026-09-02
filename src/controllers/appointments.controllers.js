import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Appointment } from "../models/appointment.model.js";

const createAppointment = asyncHandler(async (req, res) => {
    const { patient, doctor, date, time, reason } = req.body;

    if (!patient || !doctor || !date || !time) {
        throw new ApiError(400, "Patient, doctor, date and time are required");
    }

    const appointment = await Appointment.create({
        patient,
        doctor,
        date,
        time,
        reason
    });

    return res.status(201).json({
        success: true,
        message: "Appointment created successfully",
        data: appointment
    });
});