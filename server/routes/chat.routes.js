import express from "express";
import { addMembers, deleteChat, getGroupDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachments } from "../controllers/chat.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { attachmentsMulter } from "../middlewares/multer.middleware.js";
import { addNewMemberValidator, deleteChatValidator, getGroupDetailsValidator, getMessageValidator, leaveGroupValidator, newGroupValidator, removeMemberValidator, renameGroupValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.lib.js";


const chatRouter = express.Router();

//After here user must be logged in to access the route
chatRouter.use(isAuthenticated);
chatRouter.post('/new',newGroupValidator(),validateHandler,newGroupChat)
chatRouter.get('/my',getMyChats)
chatRouter.get('/my/groups',getMyGroups)
chatRouter.put("/addMembers",addNewMemberValidator(),validateHandler,addMembers)
chatRouter.delete('/removeMember',removeMemberValidator(),validateHandler,removeMembers)
chatRouter.delete('/leave/:id',leaveGroupValidator(),validateHandler,leaveGroup)
//Send Attachments
chatRouter.post("/message",attachmentsMulter,sendAttachmentsValidator(),validateHandler,sendAttachments)
chatRouter.get("/message/:id",getMessageValidator(),validateHandler,getMessages)
//get chat details,rename and delete
//instead of doing
// chatRouter.get("/chat/:id",a)
// chatRouter.put("/chat/:id",b)
// chatRouter.delete("/chat/:id",c)
chatRouter.route("/:id").get(getGroupDetailsValidator(),validateHandler,getGroupDetails).put(renameGroupValidator(),validateHandler,renameGroup).delete(deleteChatValidator(),validateHandler,deleteChat)
export { chatRouter };
