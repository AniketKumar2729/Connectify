import express from "express";
import {router} from './routes/user.routes.js'
const app=express();
app.use('/user',router)
app.listen(3000,()=>{
    console.log("server is listening");
    
})