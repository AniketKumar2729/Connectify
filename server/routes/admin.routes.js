import express from "express";
import { getAllChats, getAllMessage, getAllUsers, getDashboardStats } from "../controllers/admin.controller.js";
const adminRouter = express.Router();
adminRouter.get('/allUsers',getAllUsers)
adminRouter.get("/allChats",getAllChats)
adminRouter.get('/allMessages',getAllMessage)
adminRouter.get('/stats',getDashboardStats)
export { adminRouter };