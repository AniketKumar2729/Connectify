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
        users:transformedUsers
    })
})