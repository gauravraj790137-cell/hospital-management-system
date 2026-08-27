import { asyncHandler } from "../utils/asynchhandler";
import { departmentmodel } from "../models/departments.model";

 const createDepartment = asyncHandler(async (req,res)=>{
    const {name , description , headOfDepartment} = req.body;
    if(!name || !description || !headOfDepartment){
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const existedDepartment = await departmentmodel.findOne({
        $or:[{name: name}]
    });

    if(existedDepartment){
        res.status(400);
        throw new Error("Department already exists");
    }
    const department = await departmentmodel.create({
        name,
        description,
        headOfDepartment,
    })
    res.status(201).json(department);
 })


 const getAllDepartments = asyncHandler(async (req,res)=>{
    const departments = await departmentmodel.find();
    res.status(200).json(departments);
 })
 const getDepartmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const department = await departmentmodel.findById(id);

    if (!department) {
        res.status(404);
        throw new Error("Department not found");
    }

    res.status(200).json(department);
});


 





