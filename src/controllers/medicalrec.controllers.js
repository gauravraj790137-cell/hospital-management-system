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