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

const getAllAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find()
        .populate("patient")
        .populate("doctor");

    return res.status(200).json({
        success: true,
        message: "Appointments fetched successfully",
        data: appointments
    });
});


const getAppointmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
        .populate("patient")
        .populate("doctor");

    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    return res.status(200).json({
        success: true,
        message: "Appointment fetched successfully",
        data: appointment
    });
});

export {
    createAppointment,
    getAllAppointments,
    getAppointmentById
};


const updateAppointment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { date, time, reason, status } = req.body;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    if (date !== undefined) appointment.date = date;
    if (time !== undefined) appointment.time = time;
    if (reason !== undefined) appointment.reason = reason;
    if (status !== undefined) appointment.status = status;

    await appointment.save();

    return res.status(200).json({
        success: true,
        message: "Appointment updated successfully",
        data: appointment
    });
});



const deleteAppointment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    await Appointment.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: "Appointment deleted successfully"
    });
});