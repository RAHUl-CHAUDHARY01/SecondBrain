import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
console.log("hello");
app.use(cors());

app.options('*',cors());
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// const app=express();
//bringing routes
import userRouter from "./routes/user.routes"
app.use("/api/v1/user",userRouter)

import contentRouter from "./routes/content.routes"
app.use("/api/v1",contentRouter)
export {app}