import express from "express";
import { getAllUsers } from "../controllers/admin.controller.js";
const adminRouter = express.Router();
adminRouter.get('/allUsers',getAllUsers)
export { adminRouter };

