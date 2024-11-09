import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addMembers, getMyChats, getMyGroups, newGroupChat, removeMembers } from "../controllers/chat.controller.js";


const chatRouter = express.Router();

//After here user must be logged in to access the route
chatRouter.use(isAuthenticated);
chatRouter.post('/new',newGroupChat)
chatRouter.get('/my',getMyChats)
chatRouter.get('/my/groups',getMyGroups)
chatRouter.put("/addMembers",addMembers)
chatRouter.delete('/removeMember',removeMembers)
export { chatRouter };