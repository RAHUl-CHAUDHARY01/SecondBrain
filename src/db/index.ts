import mongoose from "mongoose";
import express from "express";

import { MONGODB_URI } from "../constants.js";


const connectDB= async ()=>{
    try {
        console.log("after");
        console.log(process.env.MONGODB_URI)
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`mongo db conected !! DB HOST:${connectionInstance.connection.host}`); 

    } catch (error) {
        console.log("error:",error);
        // process.exit(1);
        
    }
}
export default connectDB