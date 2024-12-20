import express from "express";
import { adminLogin, adminLogout, getAdminDetails, getAllChats, getAllMessage, getAllUsers, getDashboardStats } from "../controllers/admin.controller.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.lib.js";
import { adminOnly } from "../middlewares/auth.middleware.js";
const adminRouter = express.Router();
adminRouter.post('/adminLogin',adminLoginValidator(),validateHandler,adminLogin)
adminRouter.get("/adminLogout",adminLogout)
//only admin can access this route
adminRouter.use(adminOnly) 
adminRouter.get("/",getAdminDetails)
adminRouter.get('/allUsers',getAllUsers)
adminRouter.get("/allChats",getAllChats)
adminRouter.get('/allMessages',getAllMessage)
adminRouter.get('/stats',getDashboardStats)
export { adminRouter };


