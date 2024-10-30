import { User } from "../models/user.model.js";
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
    await User.create({ name, username, password, bio, avatar })

    res.status(201).json({ message: "User created successfully" })
}
export const login = (req, res) => {
    res.send("user is trying to login")
}
