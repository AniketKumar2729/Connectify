import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";
import cors from 'cors';
import express from "express";
import { createServer } from "http";
import { Server } from 'socket.io';
import { v4 as uuid } from "uuid";
import { corsOptions } from "./constants/config.constant.js";
import { getSockets } from "./lib/helper.lib.js";
import { socketAuthenticator } from "./middlewares/auth.middleware.js";
import { errorMiddleware } from "./middlewares/errorHandler.middleware.js";
import { Message } from "./models/message.model.js";
import { adminRouter } from "./routes/admin.routes.js";
import { chatRouter } from "./routes/chat.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { connectDB } from "./utils/features.utils.js";
// import { createSampleGroupChat, createSampleMessage, createSampleMessageInAGroup, createSampleSingleChat, createUser } from "./seeders/users.seeders.js";
// createSampleSingleChat(10)
// createSampleGroupChat(10)
// createSampleMessage(5)
// createSampleMessageInAGroup("675c111d568bfe0f23b33821",4)
connectDB()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const app = express();
export const userSocketIDs = new Map()
const server = createServer(app)
const io = new Server(server, {
    cors:
        corsOptions
})
// Using Middlewares Here

//express.json() is used when we hit the endpoint with thunder client we  type json in body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
//express.urlencoded() is used when we hit the endpoint with form data  from frontend
// app.use(express.urlencoded());
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/user', userRouter)
app.use('/api/v1/chat', chatRouter)
app.use('/api/v1/admin', adminRouter)
app.get('/', (req, res) => {
    res.send("hello user")
})

// Using Middlewares Here
io.use((socket, next) => {
    cookieParser()(socket.request, socket.request.res, async (err) => {
        await socketAuthenticator(err, socket, next)
    })
})
io.on("connection", (socket) => {
    const socketUser =socket.user
    // console.log(socketUser);    
    userSocketIDs.set(socketUser._id, socket.id)
    console.log(userSocketIDs);
    console.log("An user connected", socket.id)
    socket.on('NEW_MESSAGE', async ({ chatId, members, message }) => {
        const membersSockets = getSockets(members)
        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: socketUser._id,
                name: socketUser.name
            },
            chat: chatId,
            createdAt: new Date().toISOString()
        }
        const messageForDB = {
            content: message,
            sender: socketUser._id,
            chat: chatId
        }
        io.to(membersSockets).emit("NEW_MESSAGE", {
            chatId,
            message: messageForRealTime
        })
        io.to(membersSockets).emit("NEW_MESSAGE_ALERT", {
            chatId
        })
        try {
            await Message.create(messageForDB)
        } catch (error) {
            console.log(error);

        }

    })
    socket.on("disconnect", () => {
        userSocketIDs.delete(socketUser._id.toString())
        console.log("User Disconnect");
    })
})
//Error handling middleware
app.use(errorMiddleware)
server.listen(3000, () => {
    console.log("server is listening");
})


