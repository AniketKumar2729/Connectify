import { ALERT, NEW_ATTACHMENTS, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/event.constants.js";
import { getOtherMember } from "../lib/helper.lib.js";
import { errorHandler, TryCatch } from "../middlewares/errorHandler.middleware.js"
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { deleteFilesFromCloudinary, emitEvent, uploadFileIntoCloudinary } from "../utils/features.utils.js";

const newGroupChat = TryCatch(async (req, res, next) => {
    const { name, members } = req.body
    if (members.length < 2)
        return next(errorHandler(400, "Group must have atleast 3 members"))
    const allMembers = [...members, req.userId];
    await Chat.create({
        name, groupChat: true, creator: req.userId, members: allMembers
    })
    emitEvent(req, ALERT, allMembers, `Wellcome to ${name} group`)
    emitEvent(req, REFETCH_CHATS, members)
    return res.status(201).json({
        success: true,
        message: "Group  created successfully"
    })
})
const getMyChats = TryCatch(async (req, res, next) => {
    // const chats=await Chat.find({members:req.userId}); // this code simply take the userId and finds the chat collection in whichever chat document it will find, it will return the all details of chat
    // const chats=await Chat.find({members:req.userId}).populate("members","name avatar"); this code changes the members array,previously members contain all userId,but now it will contain name and the avatar of the different user from user collections
    const chats = await Chat.find({ members: req.userId }).populate("members", "name avatar");
    const transFormedChats = chats.map(({ _id, name, members, groupChat }) => {
        const otherMember = getOtherMember(members, req.userId)
        return {
            _id,
            groupChat,
            avatar: groupChat ? members.slice(0, 3).map(({ avatar }) => avatar.url) : [otherMember.avatar.url],
            name: groupChat ? name : otherMember.name,
            members: members.reduce((prev, curr) => {
                if (curr._id.toString() !== req.userId.toString())
                    prev.push(curr._id)
                return prev
            }, [])
        }
    })
    return res.status(200).json({
        success: true,
        chats: transFormedChats
    })
})
const oneToOneChat = TryCatch(async (req, res, next) => {
    const chats = await Chat.find({
        $and: [
            { members: { $size: 2 } },
            { members: req.userId }
        ]
    }).populate("members", "name avatar");
    let tranformedMember = {
        sender: {
            avatar: '',
            name: '',
            id:''
        },
        receiver: {
            avatar: '',
            name: '',
            id:''
        }
    }
    chats[0].members.map((chat, idx) => {
        if (chat._id.toString() === req.userId.toString()) {
            tranformedMember.sender = {
                avatar: chat.avatar.url,
                name: chat.name,
                id:chat._id
            }
        } else {
            tranformedMember.receiver = {
                avatar: chat.avatar.url,
                name: chat.name,
                id:chat._id
            }
        }
    })

    return res.status(200).json({
        success: true,
        message: 'api working well',
        tranformedMember
    })
})

const getMyGroups = TryCatch(async (req, res, next) => {
    const groupCreatedByMe = await Chat.find({
        members: req.userId,
        groupChat: true,
        creator: req.userId
    }).populate("members", 'name avatar')
    const groups = groupCreatedByMe.map(({ members, _id, groupChat, name }) => ({
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map(({ avatar }) => avatar.url)
    }))
    return res.status(200).json({
        success: true,
        groups
    })
})
const addMembers = TryCatch(async (req, res, next) => {
    const { groupId, members } = req.body
    const verifiedGroup = await Chat.findById(groupId)
    if (!verifiedGroup)
        return next(errorHandler(404, "Group Not found"))
    if (!verifiedGroup.groupChat)
        return next(errorHandler(400, "This is not an Group Chat"))
    if (verifiedGroup.creator.toString() !== req.userId.toString())
        return next(errorHandler(403, 'You are not allowed to add members'))
    const allNewMemberPromise = members.map(i => User.findById(i, 'name'))
    const allNewMembers = await Promise.all(allNewMemberPromise)
    const uniqueMembers = allNewMembers.filter(i => !verifiedGroup.members.includes(i._id.toString())).map(i => i._id)
    verifiedGroup.members.push(...uniqueMembers)
    if (verifiedGroup.members.length > 100)
        return next(errorHandler(400, "Maximum members add into the group"))
    await verifiedGroup.save();
    const allUserName = allNewMembers.map((i) => i.name).join(",")
    emitEvent(req, ALERT, verifiedGroup.members, `${allUserName} has been added to ${verifiedGroup.name} group`)
    emitEvent(req, REFETCH_CHATS, verifiedGroup.members)
    return res.status(200).json({
        success: true,
        message: "Members added successfully"
    })

})
const removeMembers = TryCatch(async (req, res, next) => {
    const { userId, groupId } = req.body
    const [group, userRemoved] = await Promise.all([Chat.findById(groupId), User.findById(userId, 'name')])
    if (!group)
        return next(errorHandler(404, "Group Not found"))
    if (!group.groupChat)
        return next(errorHandler(400, "This is not an Group Chat"))
    if (group.creator.toString() === userId)
        return next(errorHandler(403, 'You are not allowed to remove members'))
    if (group.members.length <= 3)
        return next(errorHandler(400, "Group must have atleast 3 members"))
    group.members = group.members.filter((membersId) => membersId.toString() !== userId.toString())
    await group.save()
    emitEvent(req, ALERT, group.members, `${userRemoved.name} has been removed from the group`)
    emitEvent(req, REFETCH_CHATS, group.members)
    return res.status(200).json({
        success: true,
        message: "Member removed successfully"
    })
})
const leaveGroup = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId)
    if (!chat)
        return next(errorHandler(404, "Group Not found"))
    if (!chat.groupChat)
        return next(errorHandler(400, "This is not an Group Chat"))
    const remainingMembers = chat.members.filter(member => member.toString() !== req.userId.toString())
    if (remainingMembers.length < 3)
        return next(errorHandler(400, "Group must have 3 members"))
    if (chat.creator.toString() === req.userId.toString()) {
        const randomNumber = Math.floor(Math.random() * remainingMembers.length)
        const newCreator = remainingMembers[randomNumber];
        chat.creator = newCreator;
    }
    chat.members = remainingMembers
    const [user] = await Promise.all([User.findById(req.userId, 'name'), chat.save()])
    emitEvent(req, ALERT, chat.members, `${user.name} has left the group`)
    return res.status(200).json({
        success: true,
        message: "Member leaved successfully"
    })
})
const sendAttachments = TryCatch(async (req, res, next) => {
    const { chatId } = req.body;
    const files = req.files || [];
    if (files.length < 1)
        return next(errorHandler(400, "Please upload attachments"))
    if (files.length > 5)
        return next(errorHandler(400, "Files can' be more than 5"))
    const [verifiedChat, verifiedUser] = await Promise.all([Chat.findById(chatId), User.findById(req.userId, 'name')])
    console.log(verifiedChat, verifiedUser)
    if (!verifiedChat)
        return next(errorHandler(404, "Chat not found"))
    if (files.length < 1)
        return next(errorHandler(400, "Please provide some attachments"))
    //upload file here
    const attachments = await uploadFileIntoCloudinary(files)
    const messageForRealTime = { content: "", attachments, sender: { _id: verifiedUser._id, name: verifiedUser.name }, chat: chatId } //this is for web socket(Socket.io)
    const messageForDB = { content: "", attachments, sender: verifiedUser._id, chat: chatId }//this is for database
    const message = await Message.create(messageForDB)
    emitEvent(req, NEW_ATTACHMENTS, verifiedChat.members, { message: messageForRealTime, chatId })
    emitEvent(req, NEW_MESSAGE_ALERT, verifiedChat.members, { chatId })
    return res.status(200).json({
        success: true,
        message
    })
}

)
//const chatDetails=TryCatch()
const getGroupDetails = TryCatch(async (req, res, next) => {
    if (req.query.populate === "true") {
        const group = await Chat.findById(req.params.id).populate("members", "name avatar").lean()
        if (!group)
            return next(errorHandler(404, "Group not found"));
        group.members = group.members.map(({ _id, name, avatar }) => ({
            _id,
            name,
            avatar: avatar.url
        }))
        return res.status(200).json({
            success: true,
            group
        })
    } else {
        const group = await Chat.findById(req.params.id)
        if (!group)
            return next(errorHandler(404, "Group not found"));
        return res.status(200).json({
            success: true,
            group
        })
    }
})
const renameGroup = TryCatch(async (req, res, next) => {
    const groupId = req.params.id;
    const { groupname } = req.body;
    const group = await Chat.findById(groupId)
    if (!group)
        return next(errorHandler(404, "Group not found"))
    if (!group.groupChat)
        return next(errorHandler(400, "This is not Group Chat"))
    if (group.creator.toString() !== req.userId.toString())
        return next(errorHandler(403, "You are not allowed to rename the group"))
    group.name = groupname;
    await group.save();
    emitEvent(req, REFETCH_CHATS, group.members)
    return res.status(200).json({
        success: true,
        message: "Group is renamed"
    })
})
const deleteChat = TryCatch(async (req, res, next) => {
    const verfiedUser = req.userId;
    const chatId = req.params.id
    const verifiedChat = await Chat.findById(chatId)
    if (!verifiedChat)
        return next(errorHandler(404, "Chat not found"))
    const members = verifiedChat.members;
    if (verifiedChat.groupChat && verifiedChat.creator.toString() !== verfiedUser.toString()) {
        return next(errorHandler(403, "You are not allowed to delete the group"))
    }
    if (!verifiedChat.groupChat && !verifiedChat.members.includes(verfiedUser.toString()))
        return next(errorHandler(403, "You are not allowed to delete the chat"))
    const messageWithAttachments = await Message.find({ chat: chatId, attachments: { $exists: true, $ne: [] } })
    const public_ids = [];
    messageWithAttachments.forEach(({ attachments }) =>
        attachments.forEach(({ public_id }) => {
            public_ids.push(public_id)
        })
    )
    await Promise.all([
        //delete files from cloudinary
        deleteFilesFromCloudinary(public_ids),
        verifiedChat.deleteOne(),
        Message.deleteMany({ chat: chatId })
    ])
    emitEvent(req, REFETCH_CHATS, members)
    return res.status(200).json({
        success: true,
        message: "Chat deleted successfully"
    })
})
const getMessages = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;
    const { page = 1 } = req.query
    const resultPerPage = 20
    const skip = (page - 1) * resultPerPage
    const [messages, totalMessagesCount] = await Promise.all([Message.find({ chat: chatId }).sort({ createdAt: -1 }).skip(skip).limit(resultPerPage).populate("sender", "name").lean(), Message.countDocuments({ chat: chatId })])
    const totalPage = Math.ceil(totalMessagesCount / resultPerPage)
    return res.status(200).json({ success: true, messages: messages, totalPage: totalPage })


})
export { newGroupChat, getMyChats, getMyGroups, addMembers, removeMembers, leaveGroup, sendAttachments, getGroupDetails, renameGroup, deleteChat, getMessages, oneToOneChat }