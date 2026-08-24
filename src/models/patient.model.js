import mongoose from"mongoose";
const patientschema= new mongoose.Schema({
    name:{
        type:string,
        required:true,

    },
    userid:{
        type:string,
        required:true,
    },
    DOB:{
        type:Date,
        required:true,
    },
    bloodgroup:{
        type:String,
        required:true,
    },
    address:{
        type:string,
        required:true,
    },

},{timestamps:true})

export const patientmodel = mongoose.model("patient", patientschema);
