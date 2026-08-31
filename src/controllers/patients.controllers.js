
import { asyncHandler } from "../utils/asynchhandler";
import { patientmodel } from "../models/patient.model";

const createPatient = asyncHandler(async (req, res) => {

    const { name, userid, DOB, bloodgroup, address } = req.body;

    if (!name || !userid || !DOB || !bloodgroup || !address) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const user = await usermodel.findById(userid);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const existingPatient = await patientmodel.findOne({ userid });

    if (existingPatient) {
        res.status(400);
        throw new Error("Patient profile already exists for this user");
    }

    const patient = await patientmodel.create({
        name,
        userid,
        DOB,
        bloodgroup,
        address
    });

    res.status(201).json({
        message: "Patient created successfully",
        patient
    });

});

const getAllPatients = asyncHandler(async (req, res) => {

    const patients = await patientmodel.find();

    res.status(200).json(patients);

});



const getPatientById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const patient = await patientmodel.findById(id);

    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }

    res.status(200).json(patient);

});


const updatePatient = asyncHandler(async (req, res) => {

    const { name, userid, DOB, bloodgroup, address } = req.body;
    const { id } = req.params;

    const patient = await patientmodel.findByIdAndUpdate(
        id,
        {
            name,
            userid,
            DOB,
            bloodgroup,
            address
        },
        { new: true }
    );

    if (!patient) {
        res.status(404);
        throw new Error("Patient not found");
    }

    res.status(200).json({
        message: "Patient details updated successfully",
        patient
    });

});