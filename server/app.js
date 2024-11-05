import express from "express";
import { userRouter } from "./routes/user.routes.js";
import { connectDB } from "./utils/features.utils.js";

connectDB()
const app=express();
//using middleware
//express.json() is used when we hit the endpoint with thunder client we  type json in body
app.use(express.json());
//express.urlencoded() is used when we hit the endpoint with form data  from frontend
// app.use(express.urlencoded());
app.use('/user',userRouter)
app.get('/',(req,res)=>{
    res.send("hello user")
})
app.listen(3000,()=>{
    console.log("server is listening");
    
})