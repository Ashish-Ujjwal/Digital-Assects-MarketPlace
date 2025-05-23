import { asyncHandler } from "../Utils/asyncHandler.js"
import { ApiError } from "../Utils/apiError.js"
import { ApiResponse } from "../Utils/apiResponse.js"
import { User } from '../Models/user.model.js';
import { generateToken, isTokenValid } from '../services/tokenServices.js';
import { sendVerificationEmail } from '../services/emailServices.js';
import jwt from "jsonwebtoken"


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId).select(
            "-password"
        );
        const accessToken = await user.generateAccessToken();
        // console.log('GeneratedAccessToken : ', accessToken);
        const refreshToken = await user.generateRefreshToken();
        // console.log('GeneratedRefreshToken : ', refreshToken);

        user.refreshToken = refreshToken; // Making Object in user
        await user.save({ validationBeforeSave: false }); // saving in the database not required validation

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError("Error generating access token & refresh token", 500, error);
    }
}

const generateOnlyAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId).select(
            "-password -refreshToken"
        );
        const accessToken = await user.generateAccessToken();
        return accessToken;
    } catch (error) {
        throw new ApiError("Error generating access token", 500, error);
    }
};


const registerUser = asyncHandler(async (req, res) => {
    // return res.status(200).json({
    //     message: "ok"
    // })
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);

        // check for required fields
        if ([name, email, password].some((field) =>
            typeof field === 'undefined')
        ) {
            throw new ApiError('All fields are required', 400);
        }

        // check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            // throw new ApiError("User Already Exists", 409);
            return res.status(409).json(
                new ApiResponse(409, "User Already Exist")
            )
        }

        const verificationToken = generateToken();
        const verificationExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        console.log(verificationToken, verificationExpiresAt);

        // Save the user object in the database.
        const newUser = await User.create({
            name,
            email,
            password,
            verificationToken,
            verificationExpiresAt,
        });
        console.log("object3");

        // Send verification email
        // const verificationLink = `${process.env.CORS_ORIGIN}/verify-email?token=${verificationToken}`;
        // await sendVerificationEmail(email, verificationLink);

        const createdUser = await User.findById(newUser._id).select(
            '-password -refreshToken'
        )
        if (!createdUser) {
            throw new ApiError('Failed to create user', 500);
        }
        console.log("object4");

        return res.status(201).json(
            new ApiResponse(200, "Registeration Successfull. Please verify your email.", createdUser)
        )
    } catch (error) {
        res.status(500).json({ message: "Error registering user.", error });
    }

});



// Controller to handle email verification
const verifyEmail = async (req, res) => {
    // console.log('hii');
    try {
        const { token } = req.params; // Extract the token from query params
        // console.log(token);

        if (!token) {
            return res.status(400).json({ message: "Verification token is required." });
        }

        // Find the user by the token
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(404).json({ message: "Invalid or expired verification token." });
        }

        // Check if the token is still valid
        const IsTokenValid = isTokenValid(user.verificationExpiresAt);
        if (!IsTokenValid) {
            // Token expired, delete user
            await User.deleteOne({ _id: user._id });
            return res.status(400).json({ message: "Verification token has expired. Please register again." });
        }

        // Mark the user as verified
        user.isVerified = true;
        user.verificationToken = null; // Clear the token
        user.verificationExpiresAt = null; // Clear expiration time
        await user.save();

        res.status(200).json({ message: "Email verified successfully. You can now log in." });
    } catch (error) {
        console.error("Error verifying email:", error.message);
        res.status(500).json({ message: "Error verifying email.", error: error.message });
    }
};

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const now = Date.now();
    // console.log(user);
    // if (!user.isVerified && user.verificationExpiresAt < now) {
    //     try {
    //         // Assuming deleteUser is a function that deletes the user from the database
    //         // Assuming you are using a function like findByIdAndDelete for MongoDB or similar
    //         const result = await User.findByIdAndDelete(user._id); // Replace `User` with your actual model
    //         if (result) {
    //             console.log(`User with ID ${user._id} deleted successfully.`);
    //             return res.status(500).json({ message: "User Deleted as Email not verified. Register Again" });
    //         } else {
    //             console.log(`User with ID ${user._id} not found.`);
    //             return res.status(500).json({ message: "User is not Deleted and Email not verified. Register Again" });
    //         }

    //         console.log(`User with ID ${user._id} has been deleted due to expired verification.`);
    //     } catch (error) {
    //         console.error(`Error deleting user with ID ${user._id}:`, error);
    //     }
    // }
    // if (!user.isVerified || user.verificationExpiresAt > now) {
    //     // throw new ApiError('User not found', 404);
    //     return res.status(404).json({ message: "Email is Not Verified. Pls. Verify it." });
    // }



    // validate the password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        // throw new ApiError('Invalid password', 401);
        return res.status(404).json({ message: 'Invalid password' });
    }
    // generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    // console.log("AccessToken : ", accessToken);
    // console.log("RefreshToken : ", refreshToken);

    const loggedInUser = await User.findById(user._id).select("-password");  // select command remove the give argument for accessing.
    console.log(loggedInUser.email);

    const options = {
        httpOnly: true,   // To make it accessible to JavaScript
        secure: true,  // to make it accessible to JavaScript
        sameSite: 'Strict', // To prevent CSRF attacks
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)  // key and value
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, "Logged In Successfully", {
            user: loggedInUser,
            accessToken: accessToken
        }));
});

// const logoutUser = asyncHandler(async (req, res) => {

//     await User.findByIdAndUpdate(
//         req.user._id,
//         {
//             $unset: { // updating refresh token from the database
//                 refreshToken: 1 // this remove the field from document
//             }
//         },
//         {
//             new: true
//         },
//     )

//     const options = {
//         // expires: new Date(0),  // cookie will expire when browser is closed
//         httpOnly: true,
//         secure: true
//     }

//     // console.log("Logged Out Successfully");
//     return res
//         .status(200)
//         .clearCookie("accessToken", options)
//         .clearCookie("refreshToken", options)
//         .json(new ApiResponse(200, "Logged Out Successfully"));
// });

const logoutUser = asyncHandler(async (req, res) => {
    const token = req.cookies.refreshToken;
    console.log(`Token :`, token);

    if (!token) {
        return res
            .status(400)
            .clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: 'None',     // Required for cross-site cookies
                secure: true,         // Required in production with HTTPS
            })
            .clearCookie("accessToken")
            .json(new ApiResponse(400, null, "No refresh token provided"));
    }

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
        const userId = decoded._id;

        // Remove refreshToken from DB
        await User.findByIdAndUpdate(userId, {
            $unset: { refreshToken: 1 },
        });

    } catch (err) {
        console.warn("Invalid or expired refresh token during logout.");
        // Continue anyway to clear cookies
    }

    // Clear cookies regardless
    return res
        .status(200)
        .clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        })
        .clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        })
        .json(new ApiResponse(200, null, "Logged out successfully"));
});


// Update User Controller
const updateUser = asyncHandler(async (req, res) => {
    const user = req.user;
    console.log(req.body);
    const { name, avatarUrl, location, bio, website, password } = req.body;

    try {
        // Find the user by ID
        // const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if they are provided
        if (name) user.name = name;
        if (avatarUrl) user.avatarUrl = avatarUrl;
        if (location) user.location = location;
        if (bio) user.bio = bio;
        if (website) user.website = website;

        // If password is provided, hash and update it
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


const refreshAccessToken = asyncHandler(async (req, res) => {
    // Implementing refresh token logic here...
    // 1. Validate the refresh token in the request cookies or body.
    // 2. If the refresh token is invalid, return an error.
    // 3. If the refresh token is valid, generate a new access token and refresh token.
    // 4. Set the new access token and refresh token in the response cookies.
    // 5. Return the user object as a response and send cookies.
    // 6. Remove the old refresh token from the database.

    // return res.status(200).json({
    //     message: "ok"
    // })
    // console.log("object");
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    // console.log(`icr`,incomingRefreshToken);
    if (!incomingRefreshToken) {
        // console.log("object");
        return res.status(500).json({
            error: "No refresh token provided",
            action: "CLEAR_STORAGE",
        });
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN);
        // console.log(decodedToken);
        const user = await User.findById(decodedToken?._id).select(
            "-password"
        );
        // console.log(user);
        if (!user) {
            throw new ApiError('Invalid refresh token', 401);
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError('RefreshToken is expired or used', 401);
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }

        const accessToken = await generateOnlyAccessToken(user?._id);
        // console.log('NewAccessToken : ', accessToken);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            // .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, "Refreshed Access Token", {
                user: user,
                accessToken: accessToken
            }));

    } catch (error) {
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',       // Required for cross-origin cookies
        }
        console.log("Invalid Refresh Token : ", error);
        res
            .status(401)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                error: "Refresh Token Expired",
                message: "Please login again",
                statusCode: 401,
                action: "CLEAR_STORAGE", // Signal to the client to clear local storage
            });
        // throw new ApiError(error?.message || "Invalid refresh token", 401);
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, "User retrieved successfully", {
            user: req.user
        }));
});

export {
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    updateUser,
    refreshAccessToken,
    getCurrentUser,
    generateAccessAndRefreshToken,
};