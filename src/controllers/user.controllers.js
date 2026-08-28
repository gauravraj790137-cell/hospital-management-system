
import { usermodel } from "../models/user.model";
import { asyncHandler } from "../utils/asynchhandler";



const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await user.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}





const createUser  = asyncHandler(async (req, res) => {
    const { Name, email, password, role } = req.body;
    if (!Name || !email || !password || !role){
        res.status(400);;
        throw new Error("Please fill all the fields");
    }
    const existedUser = await usermodel.findOne({
        $or: [{email: email}]
    })
    if(existedUser){
        throw new Error ("user already exists")
    }
    const User = await usermodel.create({
        Name,
        email,
        password,
        role
    });
    res.status(200).json(User)
});



