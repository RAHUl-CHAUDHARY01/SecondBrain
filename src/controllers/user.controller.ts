import { Request, Response } from "express";
import { asyncHandler } from "../utils/asynchandler"
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
// import { uploadOnCloudinary } from "../utils/cloudinary";
import { ApiResponse } from "../utils/ApiResponse";
import jwt from "jsonwebtoken";
const signUp = asyncHandler(async (req: Request, res: Response) => {
    const username: string = req.body.username;
    const password: string = req.body.password;
    console.log(username, password);
    
    // Validation part
    if (!username) {
        throw new ApiError(400, "Username is required");
    }
    
    // Check whether this username already exists in the db or not 
    const existedUser = await User.findOne({ $or: [{ username }] });
    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }
    
    // Check if password is at least 8 characters long
    if (password.length < 8) {
        throw new ApiError(410, "Password is too short and weak");
    }
    
    // Create user in the database
    const user = await User.create({ username, password });
    
    // Verify user creation
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong during signup");
    }
    
    // Return response
    res.status(201).json(
        new ApiResponse(200, createdUser, "User Signed Up successfully")
    );
});
//signIn controller
const signIn = asyncHandler(async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    // console.log(username, password);
    // Validation part
    if (!username) {
        throw new ApiError(400, "Username is required");
    }
    
    // Check whether this username already exists in the db or not 
    const existedUser = await User.findOne({ username,password });
    if(existedUser){

        //generate a jwt token with the user id
        const token =jwt.sign(
            {id:existedUser._id},
            process.env.JWT_SECRET as string);
            res.json({token});
        }
        else{
            throw new ApiError(403, "User entered wrong credentials");
        }
    
});




export { signUp,signIn };
