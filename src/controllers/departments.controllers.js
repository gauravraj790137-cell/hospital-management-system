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
 })