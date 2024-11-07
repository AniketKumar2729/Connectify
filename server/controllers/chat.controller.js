import { ALERT, REFETCH_CHATS } from "../constants/event.constants.js";
import { errorHandler, TryCatch } from "../middlewares/errorHandler.middleware.js"
import { Chat } from "../models/chat.model.js";
import { emitEvent } from "../utils/features.utils.js";

const newGroupChat = TryCatch(async(req,res,next)=>{
    const { name, members } = req.body
    if (members.length < 2)
        return next(errorHandler(400, "Group must have atleast 2 members"))
    const allMembers = [...members, req.userId];
    await Chat.create({
        name, groupChat: true, creator: req.userId, members: allMembers
    })
    emitEvent(req,ALERT,allMembers,`Wellcome to ${name} group`)
    emitEvent(req,REFETCH_CHATS,members)
    return res.status(201).json({
        success:true,
        message:"Group  created successfully"
    })
})

export { newGroupChat }