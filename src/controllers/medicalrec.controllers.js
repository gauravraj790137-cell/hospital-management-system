
import { asyncHandler } from "../utils/asyncHandler.js";
import { medicalrecordmodel } from "../models/medicalRecord.model.js";
import { patientmodel } from "../models/patient.model.js";
import { doctormodel } from "../models/doctor.model.js";
import { appointmentmodel } from "../models/appointment.model.js";





export const createMedicalRecord = asyncHandler(async (req, res) => {
  const {
    patientId,
    doctorId,
    appointmentId,
    diagnosis,
    symptoms,
    prescription,
    testReports,
    notes
  } = req.body;

  if (!patientId || !doctorId || !diagnosis || !symptoms || !prescription) {
    res.status(400);
    throw new Error("Please fill all the required fields");
  }

  const patient = await patientmodel.findById(patientId);

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  const doctor = await doctormodel.findById(doctorId);

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  if (appointmentId) {
    const appointment = await appointmentmodel.findById(appointmentId);

    if (!appointment) {
      res.status(404);
      throw new Error("Appointment not found");
    }
  }

  const medicalRecord = await medicalrecordmodel.create({
    patientId,
    doctorId,
    appointmentId,
    diagnosis,
    symptoms,
    prescription,
    testReports,
    notes
  });

  res.status(201).json({
    message: "Medical record created successfully",
    medicalRecord
  });
});



export const getAllMedicalRecords = asyncHandler(async (req, res) => {
  const medicalRecords = await medicalrecordmodel.find();

  res.status(200).json(medicalRecords);
});




export const getMedicalRecordById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const medicalRecord = await medicalrecordmodel.findById(id);

  if (!medicalRecord) {
    res.status(404);
    throw new Error("Medical record not found");
  }

  res.status(200).json(medicalRecord);
});



export const updateMedicalRecord = asyncHandler(async (req, res) => {
  const {
    patientId,
    doctorId,
    appointmentId,
    diagnosis,
    symptoms,
    prescription,
    testReports,
    notes
  } = req.body;

  const { id } = req.params;

  const medicalRecord = await medicalrecordmodel.findByIdAndUpdate(
    id,
    {
      patientId,
      doctorId,
      appointmentId,
      diagnosis,
      symptoms,
      prescription,
      testReports,
      notes
    },
    {
      new: true
    }
  );

  if (!medicalRecord) {
    res.status(404);
    throw new Error("Medical record not found");
  }

  res.status(200).json({
    message: "Medical record updated successfully",
    medicalRecord
  });
});


export const deleteMedicalRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const medicalRecord = await medicalrecordmodel.findByIdAndDelete(id);

  if (!medicalRecord) {
    res.status(404);
    throw new Error("Medical record not found");
  }

  res.status(200).json({
    message: "Medical record deleted successfully",
    medicalRecord
  });
});