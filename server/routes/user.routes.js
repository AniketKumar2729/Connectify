import express from "express";
import { getMyProfile, login, logout, newUser } from "../controllers/users.controllers.js";
import {  singleAvatar } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";


const userRouter = express.Router();
userRouter.post('/new',singleAvatar,newUser)
userRouter.post('/login', login)
//After here user must be logged in to access the route
userRouter.get('/me',isAuthenticated,getMyProfile)
userRouter.get('/logout',isAuthenticated,logout)
export { userRouter }