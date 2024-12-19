import express from "express";
import { acceptFriendRequrest, getMyNotificatoins, getMyProfile, login, logout, newUser, searchUser, sendFriendRequrest } from "../controllers/users.controllers.js";
import { friendRequestAcceptValidator, friendRequestValidator, loginValidator, registerValidator, validateHandler } from "../lib/validators.lib.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { singleAvatar } from "../middlewares/multer.middleware.js";


const userRouter = express.Router();
userRouter.post('/new',singleAvatar,registerValidator(),validateHandler,newUser)
userRouter.post('/login', loginValidator(),validateHandler,login)
//After here user must be logged in to access the route
userRouter.get('/me',isAuthenticated,getMyProfile)
userRouter.get('/search',isAuthenticated,searchUser)
userRouter.put('/sendRequest',friendRequestValidator(),validateHandler,isAuthenticated,sendFriendRequrest)
userRouter.put('/acceptRequest',friendRequestAcceptValidator(),validateHandler,isAuthenticated,acceptFriendRequrest)
userRouter.get("/notificaions",isAuthenticated,getMyNotificatoins)
userRouter.get('/logout',isAuthenticated,logout)
export { userRouter };

