import express from "express";
import { login, newUser } from "../controllers/users.controllers.js";
import {  singleAvatar } from "../middlewares/multer.middleware.js";


const userRouter = express.Router();
userRouter.post('/new',singleAvatar,newUser)
userRouter.post('/login', login)

export { userRouter }