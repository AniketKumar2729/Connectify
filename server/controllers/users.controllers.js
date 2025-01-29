import { compare } from "bcrypt";
import { errorHandler, TryCatch } from "../middlewares/errorHandler.middleware.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { cookieOption, emitEvent, sendToken, uploadFileIntoCloudinary } from "../utils/features.utils.js";
import { Request } from "../models/request.model.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/event.constants.js";
import { getOtherMember } from "../lib/helper.lib.js";
//create new user and save it to database and return cookie
export const newUser = TryCatch(async (req, res, next) => {
    const { name, username, password, bio } = req.body;
    const file = req.file;    
    if (!file) return next(errorHandler(400, "Please upload an image with the field name 'avatar' "))
    const resultCameFromCloudinary = await uploadFileIntoCloudinary([file])
    if (!resultCameFromCloudinary || resultCameFromCloudinary.length === 0) {
        console.log("coming form user.controller.js file", "Image upload failed");
        return next(errorHandler(500, "Image upload failed"));
    }
    const avatar = {
        public_id: resultCameFromCloudinary[0].public_id,
        url: resultCameFromCloudinary[0].url
    }
    const newUser = await User.create({ name, username, password, bio, avatar })
    sendToken(res, newUser, 201, "User Created");
}
)
export const login = TryCatch(async (req, res, next) => {
    const { username, password } = req.body;
    const existedUser = await User.findOne({ username }).select("+password"); //.select is used because in our model we separated the password and then send the response due to select() we can get password also    
    if (existedUser === null)
        return next(errorHandler(404, "Invalid Username"))
    const isPasswordMatch = await compare(password, existedUser.password);
    if (!isPasswordMatch)
        return next(errorHandler(401, "Invalid password"))
    // Exclude password from response
    const { password: _, ...safeUserData } = existedUser.toObject();
    // return res.status(400).json({message:"Invalid password"})
    // else if (!(username === existedUser.username))
    //     return next(new Error('Invalid username'))
    // return res.status(400).json({message:"Invalid username"})
    //    const {password:pass,...rest}=existedUser._doc; //this is how we separate the password from the rest of the field
    sendToken(res, safeUserData, 200, `Welcome back,${safeUserData.name}`);
})
export const getMyProfile = TryCatch(async (req, res) => {
    const verifiedUser = await User.findById(req.userId).select("-password")
    res.status(200).json({
        success: true,
        verifiedUser
    })
}
)

export const logout = TryCatch(async (req, res) => {
    return res.status(200).cookie("Connectify-token", "", { ...cookieOption, maxAge: 0 }).json({
        success: true,
        message: "Logout successfully"
    })
}
)
export const searchUser = TryCatch(async (req, res, next) => {
    const { name = "" } = req.query
    //Finding All my chats
    const myChats = await Chat.find({
        groupChat: false,
        members: req.userId
    })
    //extracting all users from my chats means friends or people I chatted with
    const allUserFromMyChats = myChats.map((chat) => chat.members).flat()
    //finding all users execpt me and my friends
    const allUserExceptMeAndFriends = await User.find({ _id: { $nin: allUserFromMyChats }, name: { $regex: name, $options: 'i' } })
    //modifying response
    const users = allUserExceptMeAndFriends.map(({ _id, name, avatar }) => ({
        _id,
        name,
        avatar: avatar.url
    }))
    // console.log(allUserExceptMeAndFriends);
    const totalChats = myChats.length
    return res.status(200).json({
        success: true,
        users
    })
})
export const sendFriendRequrest = TryCatch(async (req, res, next) => {
    const { receiverId } = req.body
    const request = await Request.findOne({
        $or: [
            { sender: req.userId, receiver: receiverId },
            { sender: receiverId, receiver: req.userId }
        ]
    })
    if (request)
        return next(errorHandler(400, "Request already sent"))
    await Request.create({
        sender: req.userId,
        receiver: receiverId
    })
    emitEvent(req, NEW_REQUEST, [receiverId])
    res.status(200).json({
        success: true,
        message: "Friend Request Sent"
    })
})
export const acceptFriendRequrest = TryCatch(async (req, res, next) => {

    const { requestId, accept } = req.body
    const request = await Request.findById(requestId).populate('sender', 'name').populate("receiver", "name")
    // console.log(req.userId)
    console.log(request)
    if (!request)
        return next(errorHandler(404, "Request not found"))
    if (request.receiver._id.toString() !== req.userId.toString())
        return next(errorHandler(401, "Unauthoried"))
    if (!accept) {
        await request.deleteOne()
        return res.status(200).json({
            success: true,
            message: "Friend Request Rejected"
        })
    }
    const members = [request.sender._id, request.receiver._id]
    await Promise.all([Chat.create({
        members,
        name: `${request.sender.name} -- ${request.receiver.name}`
    }), request.deleteOne()])
    emitEvent(req, REFETCH_CHATS, members)
    return res.status(200).json({
        success: true,
        message: "Friend Request accepted",
        senderId: request.sender._id
    })
})

export const getMyNotificatoins = TryCatch(async (req, res, next) => {
    const request = await Request.find({ receiver: req.userId }).populate("sender", "name avatar")
    const allRequest = request.map(({ _id, sender }) => ({
        _id, sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url
        }
    }))
    return res.status(200).json({
        success: true,
        request: allRequest
    })
})

export const getMyFriends = TryCatch(async (req, res, next) => {
    const chatId = req.query.chatId
    const chats = await Chat.find({ members: req.userId, groupChat: false }).populate("members", "name avatar")
    const friends = chats.map(({ members }) => {
        const otherUser = getOtherMember(members, req.userId)
        return {
            _id: otherUser._id,
            name: otherUser.name,
            avatar: otherUser.avatar.url
        }
    })
    if (chatId) {
        const chat = await Chat.findById(chatId)
        const availableFriends = friends.filter((friend) => !chat?.members?.includes(friend._id))
        return res.status(200).json({
            success: true,
            "availableFriends": availableFriends
        })
    } else {
        return res.status(200).json({
            success: true,
            "Friends": friends
        })
    }

})