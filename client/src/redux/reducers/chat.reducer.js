import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    notificationCount: 0
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
    }
})
export default chatSlice
export const {
    incrementNotificaiton,
    resetNotificaiton
} = chatSlice.actions