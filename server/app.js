import express from "express";
import { connectDB } from "./utils/features.utils.js";
import cookieParser from "cookie-parser";
import { chatRouter } from "./routes/chat.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { adminRouter } from "./routes/admin.routes.js";
import { Server } from 'socket.io'
import { createServer } from "http"
import { NEW_MESSAGE } from "./constants/event.constants.js";
import { v4 as uuid } from "uuid"
import { getSockets } from "./lib/helper.lib.js";
import { Message } from "./models/message.model.js";
import cors from 'cors'

// import { createSampleGroupChat, createSampleMessage, createSampleMessageInAGroup, createSampleSingleChat, createUser } from "./seeders/users.seeders.js";
connectDB()
const app = express();
export const userSocketIDs=new Map()
const server = createServer(app)
const io = new Server(server, {})
io.on("connection", (socket) => {
    const tempUser = {
        _id: 'abcd',
        name: "efgh"
    }
    userSocketIDs.set(tempUser._id.toString(),socket.id)
    console.log(userSocketIDs);
    console.log("An user connected", socket.id)
    socket.on('NEW_MESSAGE', async ({ chatId, members, message }) => {
        const membersSockets=getSockets(members)
        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: tempUser._id,
                name: tempUser.name
            },
            chat: chatId,
            createdAt: new Date().toISOString()
        }
        const messageForDB = {
            content: message,
            sender: tempUser._id,
            chat: chatId
        }
        io.to(membersSockets).emit("NEW_MESSAGE",{
            chatId,
            message:messageForRealTime
        }) 
        io.to(membersSockets).emit("NEW_MESSAGE_ALERT",{
            chatId
        })      
        try {
            await Message.create9(messageForDB)
        } catch (error) {
            console.log(error);
            
        }

    })
    socket.on("disconnect", () => {
        userSocketIDs.delete(tempUser._id.toString())
        console.log("User Disconnect");
    })
})
server.listen(3000, () => {
    console.log("server is listening");
})
// createSampleSingleChat(10)
// createSampleGroupChat(10)
// createSampleMessage(5)
// createSampleMessageInAGroup("675c111d568bfe0f23b33821",4)

//using middleware
//express.json() is used when we hit the endpoint with thunder client we  type json in body
app.use(express.json());
//express.urlencoded() is used when we hit the endpoint with form data  from frontend
// app.use(express.urlencoded());
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173","http://localhost:4173",process.env.CLIENT_URL],
    credentials:true
}))
app.use('/api/user', userRouter)
app.use('/chat', chatRouter)
app.use('/admin', adminRouter)
app.get('/', (req, res) => {
    res.send("hello user")
})
//Error handling middleware
app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    if (err.code === 11000) {
        const error = Object.keys(err.keyPattern).join(",")
        message = `Duplicate field -> ${error}`
        statusCode = 400
    }
    if (err.name === "CastError") {
        const errorPath = err.path
        message = `Invalid format of -> ${errorPath}`
        statusCode = 400
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        // err
        message,
    });
})
