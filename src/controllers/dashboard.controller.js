
import { asyncHandler } from "../utils/asyncHandler.js";
import { usermodel } from "../models/user.model.js";
import { doctormodel } from "../models/doctor.model.js";
import { patientmodel } from "../models/patient.model.js";
import { departmentmodel } from "../models/department.model.js";
import { appointmentmodel } from "../models/appointment.model.js";



export const getDashboardOverview = asyncHandler(async (req, res) => {
  const totalUsers = await usermodel.countDocuments();
  const totalDoctors = await doctormodel.countDocuments();
  const totalPatients = await patientmodel.countDocuments();
  const totalDepartments = await departmentmodel.countDocuments();
  const totalAppointments = await appointmentmodel.countDocuments();

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalDoctors,
      totalPatients,
      totalDepartments,
      totalAppointments
    }
  });
});