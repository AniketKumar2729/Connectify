import express from "express";
import { getAllChats, getAllMessage, getAllUsers } from "../controllers/admin.controller.js";
const adminRouter = express.Router();
adminRouter.get('/allUsers',getAllUsers)
adminRouter.get("/allChats",getAllChats)
adminRouter.get('/allMessages',getAllMessage)
export { adminRouter };

