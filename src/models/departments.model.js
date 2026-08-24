import mongoose from "mongoose";
const departmentschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:string,
        required:true,
    },
    headOfDepartment:{
        type:string,
        required:true,
    }

},{timestamps:true})
export const departmentmodel = mongoose.model("department",departmentschema);
