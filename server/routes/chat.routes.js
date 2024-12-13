import express from "express";
import { addMembers, deleteChat, getGroupDetails, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachments } from "../controllers/chat.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { attachmentsMulter } from "../middlewares/multer.middleware.js";


const chatRouter = express.Router();

//After here user must be logged in to access the route
chatRouter.use(isAuthenticated);
chatRouter.post('/new',newGroupChat)
chatRouter.get('/my',getMyChats)
chatRouter.get('/my/groups',getMyGroups)
chatRouter.put("/addMembers",addMembers)
chatRouter.delete('/removeMember',removeMembers)
chatRouter.delete('/leave/:id',leaveGroup)
//Send Attachments
chatRouter.post("/message",attachmentsMulter,sendAttachments)
//get chat details,rename and delete
//instead of doing
// chatRouter.get("/chat/:id",a)
// chatRouter.put("/chat/:id",b)
// chatRouter.delete("/chat/:id",c)
chatRouter.route("/:id").get(getGroupDetails).put(renameGroup).delete(deleteChat)
export { chatRouter };
