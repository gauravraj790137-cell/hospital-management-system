import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment"
    },

    diagnosis: {
      type: String,
      required: true
    },

    symptoms: {
      type: String,
      required: true
    },

    prescription: {
      type: String,
      required: true
    },

    testReports: {
      type: String
    },

    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const medicalrecordmodel = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);