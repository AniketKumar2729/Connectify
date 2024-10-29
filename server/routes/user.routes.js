import express from "express";
import { login } from "../controllers/users.controllers.js";


const userRouter = express.Router();
router.get('/login', login)

export { userRouter }