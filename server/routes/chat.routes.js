import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { newGroupChat } from "../controllers/chat.controller.js";


const chatRouter = express.Router();

//After here user must be logged in to access the route
chatRouter.use(isAuthenticated);
chatRouter.post('/new',newGroupChat)
export { chatRouter };