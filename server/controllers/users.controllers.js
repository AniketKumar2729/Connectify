import { User } from "../models/user.model.js";
import { sendToken } from "../utils/features.utils.js";
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
    const newUser=await User.create({ name, username, password, bio, avatar })
    sendToken(res,newUser,201,"User Created");
}
export const login = (req, res) => {
    res.send("user is trying to login")
}
