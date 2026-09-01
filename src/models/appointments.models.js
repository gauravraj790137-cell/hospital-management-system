import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true
        },

        appointmentDate: {
            type: Date,
            required: true
        },

        reason: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: ["scheduled", "completed", "cancelled", "rescheduled"],
            default: "scheduled"
        },

        notes: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);