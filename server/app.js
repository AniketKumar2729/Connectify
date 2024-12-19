import express from "express";
import { connectDB } from "./utils/features.utils.js";
import cookieParser from "cookie-parser";
import { chatRouter } from "./routes/chat.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { adminRouter } from "./routes/admin.routes.js";
import { createSampleGroupChat, createSampleMessage, createSampleMessageInAGroup, createSampleSingleChat, createUser } from "./seeders/users.seeders.js";
connectDB()
const app = express();
app.listen(3000, () => {
    console.log("server is listening");
})
// createSampleSingleChat(10)
// createSampleGroupChat(10)
// createSampleMessage(5)
// createSampleMessageInAGroup("675c111d568bfe0f23b33821",4)

//using middleware
//express.json() is used when we hit the endpoint with thunder client we  type json in body
app.use(express.json());
//express.urlencoded() is used when we hit the endpoint with form data  from frontend
// app.use(express.urlencoded());
app.use(cookieParser())
app.use('/user', userRouter)
app.use('/chat',chatRouter)
app.use('/admin',adminRouter)
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
