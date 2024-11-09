import { ALERT, REFETCH_CHATS } from "../constants/event.constants.js";
import { getOtherMember } from "../lib/helper.lib.js";
import { errorHandler, TryCatch } from "../middlewares/errorHandler.middleware.js"
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { emitEvent } from "../utils/features.utils.js";

const newGroupChat = TryCatch(async(req,res,next)=>{
    const { name, members } = req.body
    if (members.length < 2)
        return next(errorHandler(400, "Group must have atleast 3 members"))
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
const getMyChats = TryCatch(async(req,res,next)=>{
    // const chats=await Chat.find({members:req.userId}); // this code simply take the userId and finds the chat collection in whichever chat document it will find, it will return the all details of chat
    // const chats=await Chat.find({members:req.userId}).populate("members","name avatar"); this code changes the members array,previously members contain all userId,but now it will contain name and the avatar of the different user from user collections
    const chats=await Chat.find({members:req.userId}).populate("members","name avatar");
    const transFormedChats= chats.map(({_id,name,members,groupChat})=>{
        const otherMember=getOtherMember(members,req.userId)
        return{
            _id,
            groupChat,
            avatar:groupChat?members.slice(0,3).map(({avatar})=>avatar.url):[otherMember.avatar.url],
            name:groupChat?name:otherMember.name,
            members:members.reduce((prev,curr)=>{
                if(curr._id !== req.userId)
                    prev.push(curr._id)
                return prev
            },[])
        }
    })
    return res.status(200).json({
        success:true,
        chats:transFormedChats
    })
})

const getMyGroups=TryCatch(async(req,res,next)=>{
    const groupCreatedByMe=await Chat.find({
        members:req.userId,
        groupChat:true,
        creator:req.userId
    }).populate("members",'name avatar')
    const groups=groupCreatedByMe.map(({members,_id,groupChat,name})=>({
        _id,
        groupChat,
        name,
        avatar:members.slice(0,3).map(({avatar})=>avatar.url)
    }))
    return res.status(200).json({
        success:true,
        groups
    })
})
const addMembers=TryCatch(async(req,res,next)=>{
    const {groupId,members}=req.body
    // const {chatId,members}=req.body;
    
    const verifiedGroup=await Chat.findById(groupId)
    if(!verifiedGroup)
        return next(errorHandler(404,"Group Not found"))
    if(!verifiedGroup.groupChat)
        return next(errorHandler(400,"This is not an Group Chat"))
    if(verifiedGroup.creator.toString()!==req.userId.toString())
        return next(errorHandler(403,'You are not allowed to add members'))
    const allNewMemberPromise=members.map(i=>User.findById(i,'name'))
    const allNewMembers=await Promise.all(allNewMemberPromise)
    verifiedGroup.members.push(...allNewMembers.map((i)=>i._id))
    if(verifiedGroup.members.length>100)
        return next(errorHandler(400,"Maximum members add into the group"))
    await verifiedGroup.save();
    const allUserName=allNewMembers.map((i)=>i.name).join(",")
    emitEvent(req,ALERT,verifiedGroup.members,`${allUserName} has been added to ${verifiedGroup.name} group`)
    emitEvent(req,REFETCH_CHATS,verifiedGroup.members)
    return res.status(200).json({
        success:true,
        message:"Members added successfully"
    })

})
export { newGroupChat,getMyChats,getMyGroups,addMembers }