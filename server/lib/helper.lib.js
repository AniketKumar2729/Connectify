import { userSocketIDs } from "../app.js"

export const getOtherMember= (members,userId)=>members.find((member)=>member._id !== userId._id )

export const getSockets=(users=[])=>{
    const sockets=users.map((user)=>userSocketIDs.get(user._id.toString()))
    return sockets
} 