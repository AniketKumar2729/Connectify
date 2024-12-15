import express from "express";
import { getMyProfile, login, logout, newUser, searchUser } from "../controllers/users.controllers.js";
import {  singleAvatar } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { loginValidator, registerValidator, validateHandler } from "../lib/validators.lib.js";


const userRouter = express.Router();
userRouter.post('/new',singleAvatar,registerValidator(),validateHandler,newUser)
userRouter.post('/login', loginValidator(),validateHandler,login)
//After here user must be logged in to access the route
userRouter.get('/me',isAuthenticated,getMyProfile)
userRouter.get('/search',isAuthenticated,searchUser)
userRouter.get('/logout',isAuthenticated,logout)
export { userRouter }