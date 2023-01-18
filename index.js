import express, { application } from 'express';
import mongoose from "mongoose";
import * as dotenv from 'dotenv' ;
import authRouter from "./Routes/auth.js";
import userRouter from "./Routes/users.js";
import postRouter from "./Routes/Posts.js";



dotenv.config()
mongoose.connect(process.env.MONGO_URL).then((a)=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
})
const app = express();
//middleware

app.use(express.json());

app.use("/auth",authRouter);
app.use("/users", userRouter);
app.use("/posts",postRouter)








//instance of the model






app.listen(8800,()=>{
    console.log('listening on port '+8800)
})