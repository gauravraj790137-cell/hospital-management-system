
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



const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Email and password are required");
    }

    const user = await usermodel.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        res.status(401);
        throw new Error("Invalid password");
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefereshTokens(user._id);

    const loggedInUser = await usermodel
        .findById(user._id)
        .select("-password -refreshToken");

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);

    res.status(200).json({
        user: loggedInUser,
        accessToken,
        refreshToken
    });

});


const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))


})
