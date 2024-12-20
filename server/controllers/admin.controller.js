import { errorHandler, TryCatch } from "../middlewares/errorHandler.middleware.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import jwt from 'jsonwebtoken'
import { cookieOption } from "../utils/features.utils.js";
export const adminLogin = TryCatch(async (req, res, next) => {
    const { secretKey } = req.body
    const adminSecretKey = process.env.ADMIN_SECRET_KEY || "abcde"
    const isMatched = secretKey === adminSecretKey
    if (!isMatched)
        return next(errorHandler(401, "Invalid secret key"))
    const token = jwt.sign(secretKey, process.env.JWT_SECRET)
    return res.status(200).cookie("Connectify-admin-token", token, { ...cookieOption, maxAge: 1000 * 60 * 15 }).json({
        success: true,
        message: 'Authenticated successfully,Welcome boss'
    })

})
export const adminLogout = TryCatch(async (req, res, next) => {
    return res.status(200).cookie("Connectify-admin-token", "", { ...cookieOption, maxAge: 0 }).json({
        success: true,
        Message: "successfully logout admin"
    })
})
export const getAdminDetails = TryCatch(async (req, res, next) => {
    return res.status(200).json({
        success: true,
        admin: true
    })
})
export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find()
    const transformedUsers = await Promise.all(users.map(async ({ name, username, avatar, _id }) => {
        const [groupCount, friendCount] = await Promise.all([Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id })
        ])
        return {
            _id,
            username,
            name,
            avatar: avatar.url,
            groups: groupCount,
            friends: friendCount
        }
    }))
    return res.status(200).json({
        sucess: true,
        totalUser: users.length,
        users: transformedUsers
    })
})
export const getAllChats = TryCatch(async (req, res, next) => {
    const chat = await Chat.find({}).populate("members", "name avatar").populate("creator", "name avatar")
    const transFormedChats = await Promise.all(chat.map(async ({ members, _id, groupChat, name, creator }) => {
        const totalMessage = await Message.countDocuments({ chat: _id })
        return {
            _id,
            groupChat,
            name,
            avatar: members.slice(0, 3).map((member) => member.avatar.url),
            members: members.map(({ _id, name, avatar }) => ({
                _id,
                name,
                avatar: avatar.url
            }
            )),
            creator: {
                name: creator?.name || "None",
                avatar: creator?.avatar.url || ""
            },
            totalMembers: members.length,
            totalMessage
        }
    }))
    return res.status(200).json({
        sucess: true,
        totalChats: chat.length,
        chats: transFormedChats
    })
})

export const getAllMessage = TryCatch(async (req, res, next) => {
    const messages = await Message.find({}).populate('sender', 'name avatar').populate("chat", "groupChat")
    const transFormedMessages = messages.map(({ content, _id, attachments, sender, createdAt, chat }) => ({
        _id,
        attachments,
        content,
        createdAt,
        sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url
        },
        chatId: chat._id,
        groupChat: chat.groupChat
    }))
    return res.status(200).json({
        sucess: true,
        totolMessage: messages.length,
        messages: transFormedMessages
    })
})

export const getDashboardStats = TryCatch(async (req, res, next) => {
    const [groupsCount, usersCount, messagesCount, totalChatsCount] = await Promise.all([
        Chat.countDocuments({ groupChat: true }),
        User.countDocuments(),
        Message.countDocuments(),
        Chat.countDocuments()
    ])
    const today = new Date()
    const last7Days = new Date()
    last7Days.setDate(last7Days.getDate() - 7)
    console.log(last7Days);

    const last7DaysMessages = await Message.find({
        createdAt: {
            $gte: last7Days,
            $lte: today
        }
    }).select("createdAt")
    const messages = new Array(7).fill(0)
    const daysInMiliSecond = (1000 * 60 * 60 * 24)
    last7DaysMessages.forEach(message => {
        const index = Math.floor((today.getTime() - message.createdAt.getTime()) / daysInMiliSecond)
        messages[6 - index]++;
    })
    const stats = {
        groupsCount,
        usersCount,
        messagesCount,
        totalChatsCount,
        messagesChats: messages
    }
    return res.status(200).json({
        sucess: true,
        stats
    })
})