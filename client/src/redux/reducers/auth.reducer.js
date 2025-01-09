import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAdmin: false,
    isLoading: true
}
const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        userExist: (state, action) => {
            state.user = action.payload,
                state.isLoading = false
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        userNotExist: (state) => {
            state.user = null,
                state.isLoading = false
            localStorage.removeItem('user');
        }
    }
})
export default authSlice
export const { userExist, userNotExist } = authSlice.actions