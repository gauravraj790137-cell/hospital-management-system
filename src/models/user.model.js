import mongoose from "mongoose";
const userschema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    id:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    }

},{timestamps:true})
export const usermodel = mongoose.model("user",userschema)