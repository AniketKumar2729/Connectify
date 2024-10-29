import express from "express";
import { login } from "../controllers/users.controllers.js";


const router=express.Router();
router.get('/login',login)

export {router}