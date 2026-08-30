import mongoose from "mongoose";
const doctorschema = new mongoose.Schema({
    name:{
        type:string,
        required:true,
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },

    department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
    },

    
   
    experience:{
        type:number,
        required:true,
    },
    qualification:{
        type:string,
        required:true,
    }

},{timestamps:true})

export const doctormodel = mongoose.model("doctor",doctorschema);
