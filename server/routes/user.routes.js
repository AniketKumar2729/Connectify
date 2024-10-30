import express from "express";
import { login, newUser } from "../controllers/users.controllers.js";


const userRouter = express.Router();
userRouter.post('/new', newUser)
userRouter.post('/login', login)

export { userRouter }