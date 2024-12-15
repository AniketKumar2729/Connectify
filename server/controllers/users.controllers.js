import { compare } from "bcrypt";
import { errorHandler, TryCatch } from "../middlewares/errorHandler.middleware.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import { cookieOption, sendToken } from "../utils/features.utils.js";
//create new user and save it to database and return cookie
export const newUser = async (req, res) => {
    // console.log(req.body);
    //this is static data and it will store in database
    const avatar = {
        public_id: 'akhsdjk',
        url: "sfjkhdfjkhdsjhk"
    }
    // await User.create({name:"Aniket",username:"aniket2729",password:"123456",avatar})

    const { name, username, password, bio } = req.body;
    const newUser = await User.create({ name, username, password, bio, avatar })
    sendToken(res, newUser, 201, "User Created");
}
export const login = TryCatch(async (req, res, next) => {
    const { username, password } = req.body;
    const existedUser = await User.findOne({ username }).select("+password"); //.select is used because in our model we separated the password and then send the response due to select() we can get password also
    const isPasswordMatch = await compare(password, existedUser.password);
    if (!isPasswordMatch)
        return next(errorHandler(401, "Invalid password"))
    // return res.status(400).json({message:"Invalid password"})
    // else if (!(username === existedUser.username))
    //     return next(new Error('Invalid username'))
    // return res.status(400).json({message:"Invalid username"})
    //    const {password:pass,...rest}=existedUser._doc; //this is how we separate the password from the rest of the field
    sendToken(res, existedUser, 200, `Welcome back,${existedUser.name}`);
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
    const { name="" } = req.query
    //Finding All my chats
    const myChats = await Chat.find({
        groupChat:false,
        members:req.userId
    })
    //extracting all users from my chats means friends or people I chatted with
    const allUserFromMyChats=myChats.map((chat)=>chat.members).flat()
    //finding all users execpt me and my friends
    const allUserExceptMeAndFriends=await User.find({_id:{$nin:allUserFromMyChats},name:{$regex:name,$options:'i'}})
    //modifying response
    const users=allUserExceptMeAndFriends.map(({_id,name,avatar})=>({
        _id,
        name,
        avatar:avatar.url
    }))
    // console.log(allUserExceptMeAndFriends);
    const totalChats=myChats.length
    return res.status(200).json({
        success:true,
     users
    })
})