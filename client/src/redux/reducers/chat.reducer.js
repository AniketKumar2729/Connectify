import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features.js";
import { NEW_MESSAGE_ALERT } from "../../constants/event.constants.js";
const initialState = {
    notificationCount: 0,
    newMessagesAlert: getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,get:true}) || [{
        chatId: "",
        count: 0
    }]
}
const chatSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        incrementNotificaiton: (state) => {
            state.notificationCount += 1
        },
        resetNotificaiton: (state) => {
            state.notificationCount = 0
        },
        setNewMessagesAlert: (state,action) => {
            const index=state.newMessagesAlert.findIndex((item)=>item.chatId===action.payload.chatId)
            if(index!==-1){
                state.newMessagesAlert[index].count+=1;
            }else{
                state.newMessagesAlert.push({
                    chatId:action.payload.chatId,
                    count:1
                })
            }
        },
        removeNewMessagesAlert:(state,action)=>{
            state.newMessagesAlert=state.newMessagesAlert.filter((item)=>item.chatId !==  action.payload)
        }
    }
})
export default chatSlice
export const {
    incrementNotificaiton,
    resetNotificaiton, setNewMessagesAlert, removeNewMessagesAlert
} = chatSlice.actions