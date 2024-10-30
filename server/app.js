import express from "express";
import { userRouter } from "./routes/user.routes.js";
import { connectDB } from "./utils/features.utils.js";

const app=express();
connectDB()
app.use('/user',userRouter)
app.get('/',(req,res)=>{
    res.send("hello user")
})
app.listen(3000,()=>{
    console.log("server is listening");
    
})