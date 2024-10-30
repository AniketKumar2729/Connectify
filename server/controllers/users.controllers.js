import { User } from "../models/user.model.js";
//create new user and save it to database and return cookie
export const newUser = async (req, res) => {
    const avatar={
        public_id:'akhsdjk',
        url:"sfjkhdfjkhdsjhk"
    }
    await User.create({name:"Aniket",username:"aniket2729",password:"123456",avatar})
    res.status(201).json({message:"User created successfully"})
}
export const login = (req, res) => {
    res.send("user is trying to login")
}
