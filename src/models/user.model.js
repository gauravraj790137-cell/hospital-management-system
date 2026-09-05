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
        enum:["patient","doctor","admin"],
        default:"patient"
    }

},{timestamps:true})

userschema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})

userschema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}



userschema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userschema.methods.generaterefreshtoken = function () {
    return jwt.sign({
        _id : this._id,

    },
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
}
)

}

export const usermodel = mongoose.model("user", userschema);