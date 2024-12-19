import { TryCatch } from "../middlewares/errorHandler.middleware.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
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
        const totalMessage=await Message.countDocuments({chat:_id})
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
            creator:{
                name:creator?.name||"None",
                avatar:creator?.avatar.url||""
            },
            totalMembers:members.length,
            totalMessage
        }
    }))
    return res.status(200).json({
        sucess: true,
        totalChats: chat.length,
        chats: transFormedChats
    })
})