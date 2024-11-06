import express from "express";
import { userRouter } from "./routes/user.routes.js";
import { connectDB } from "./utils/features.utils.js";
import cookieParser from "cookie-parser";
connectDB()
const app = express();
app.listen(3000, () => {
    console.log("server is listening");

})
//using middleware
//express.json() is used when we hit the endpoint with thunder client we  type json in body
app.use(express.json());
//express.urlencoded() is used when we hit the endpoint with form data  from frontend
// app.use(express.urlencoded());
app.use(cookieParser())
app.use('/user', userRouter)
app.get('/', (req, res) => {
    res.send("hello user")
})
//Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})
