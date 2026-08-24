import mongoose from "mongoose";
const doctorschema = new mongoose.Schema({
    name:{
        type:string,
        required:true,
    },
    userid:{
        type:string,
        required:true,
    },
    department:{
        type:string,
        required:true,
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
