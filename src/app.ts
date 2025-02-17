import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
console.log("hello");
app.use(cors());
app.use((req, res, next) => {
    // console.log("Request received from:", req.headers.origin);
    next();
});

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


app.get('/', (req, res) => { res.send('Hello from Express!') })
// const app=express();
//bringing routes
import userRouter from "./routes/user.routes"
app.use("/api/v1/user",userRouter)

import contentRouter from "./routes/content.routes"
app.use("/api/v1",contentRouter)
export {app}