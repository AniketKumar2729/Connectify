import dotenv from "dotenv";
import mongoose from "mongoose"

dotenv.config();
export const connectDB = (uri) => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("database is connected");
    }).catch((error) => console.log(error)
    )
}
const cookieOption={
    maxAge:15*24*60*60*1000,
    sameSite:'none',
    httpOnly:true,
    secure:true
}
export const sendToken = (res, user, code, message) => {
    const token = 'jksndfjkasn';
    return res.status(code).cookie('Connectify-token',token,cookieOption).json({
        success: true,
        message,
        user
    })
}
