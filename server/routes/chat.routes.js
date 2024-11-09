import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getMyChats, getMyGroups, newGroupChat } from "../controllers/chat.controller.js";


const chatRouter = express.Router();

//After here user must be logged in to access the route
chatRouter.use(isAuthenticated);
chatRouter.post('/new',newGroupChat)
chatRouter.get('/my',getMyChats)
chatRouter.get('/my/groups',getMyGroups)
export { chatRouter };