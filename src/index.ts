import express from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import {app} from "./app"

dotenv.config({
    path: "./.env"
})
// const app= express();
connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`mongodb connected in port ${process.env.PORT}`);
  })
  app.on("error",()=>{
    console.log("application not able to talk to database");
  })
})
.catch((err)=>{
  console.log("error in mongodb connection");
  console.log(err);
})
