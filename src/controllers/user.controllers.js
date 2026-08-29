
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


const refreshAccessToken = asyncHandler(async (req, res) => {

    // Get refresh token from cookies or request body
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    // Check if refresh token exists
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {

        // Verify refresh token
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        // Find user from decoded token
        const user = await User.findById(decodedToken?._id);

        // Check if user exists
        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        // Check if refresh token matches the one stored in DB
        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(
                401,
                "Refresh token is expired or already used"
            );
        }

        // Cookie options
        const options = {
            httpOnly: true,
            secure: true,
        };

        // Generate new access and refresh tokens
        const {
            accessToken,
            refreshToken: newRefreshToken,
        } = await generateAccessAndRefereshTokens(user._id);

        // Send new tokens
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: newRefreshToken,
                    },
                    "Access token refreshed successfully"
                )
            );

    } catch (error) {
        throw new ApiError(
            401,
            error?.message || "Invalid refresh token"
        );
    }

});





const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const user = await user.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const updateUser = asyncHandler(async (req, res) => {

    const { name, email, id, role } = req.body;

    const user = await usermodel.findByIdAndUpdate(
        req.params.id,
        {
            name,
            email,
            id,
            role
        },
        { new: true }
    ).select("-password -refreshToken");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        message: "User details updated successfully",
        user
    });
});


const deleteUser = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const user = await usermodel.findByIdAndDelete(id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        message: "User deleted successfully",
        user
    });

});