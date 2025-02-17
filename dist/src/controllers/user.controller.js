"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const asynchandler_1 = require("../utils/asynchandler");
const ApiError_1 = require("../utils/ApiError");
const user_model_1 = require("../models/user.model");
// import { uploadOnCloudinary } from "../utils/cloudinary";
const ApiResponse_1 = require("../utils/ApiResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    // Validation part
    if (!username) {
        throw new ApiError_1.ApiError(400, "Username is required");
    }
    // Check whether this username already exists in the db or not 
    const existedUser = yield user_model_1.User.findOne({ $or: [{ username }] });
    if (existedUser) {
        throw new ApiError_1.ApiError(409, "User already exists");
    }
    // Check if password is at least 8 characters long
    if (password.length < 8) {
        throw new ApiError_1.ApiError(410, "Password is too short and weak");
    }
    // Create user in the database
    const user = yield user_model_1.User.create({ username, password });
    // Verify user creation
    const createdUser = yield user_model_1.User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError_1.ApiError(500, "Something went wrong during signup");
    }
    // Return response
    res.status(201).json(new ApiResponse_1.ApiResponse(200, createdUser, "User Signed Up successfully"));
}));
exports.signUp = signUp;
//signIn controller
const signIn = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    // console.log(username, password);
    // Validation part
    if (!username) {
        throw new ApiError_1.ApiError(400, "Username is required");
    }
    // Check whether this username already exists in the db or not 
    const existedUser = yield user_model_1.User.findOne({ username, password });
    if (existedUser) {
        //generate a jwt token with the user id
        const token = jsonwebtoken_1.default.sign({ id: existedUser._id }, process.env.JWT_SECRET);
        res.json({ token });
    }
    else {
        throw new ApiError_1.ApiError(403, "User entered wrong credentials");
    }
}));
exports.signIn = signIn;
