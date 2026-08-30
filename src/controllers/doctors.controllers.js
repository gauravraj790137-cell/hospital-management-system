import { asyncHandler } from "../utils/asynchhandler";
import { doctormodel } from "../models/doctors.model";



const createDoctor = asyncHandler(async (req, res) => {

    const { name, userId, department, experience, qualification } = req.body;

    if (!name || !userId || !department || !experience || !qualification) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const user = await usermodel.findById(userId);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const departmentExists = await departmentmodel.findById(department);

    if (!departmentExists) {
        res.status(404);
        throw new Error("Department not found");
    }

    const existingDoctor = await doctormodel.findOne({ userId });

    if (existingDoctor) {
        res.status(400);
        throw new Error("Doctor profile already exists for this user");
    }

    const doctor = await doctormodel.create({
        name,
        userId,
        department,
        experience,
        qualification
    });

    res.status(201).json({
        message: "Doctor created successfully",
        doctor
    });

});





const getAllDoctors = asyncHandler(async (req, res) => {

    const doctors = await doctormodel.find();

    res.status(200).json(doctors);

});
