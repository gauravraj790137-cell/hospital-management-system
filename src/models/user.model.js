import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


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
export const usermodel = mongoose.model("user",userschema);





userschema.pre("save", async function (next){
    if(this.isModified("password")) return next;
    this.password = await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
