import express from "express";
import { getAllChats, getAllUsers } from "../controllers/admin.controller.js";
const adminRouter = express.Router();
adminRouter.get('/allUsers',getAllUsers)
adminRouter.get("/allChats",getAllChats)
export { adminRouter };

