import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:null,
    isAdmin:false,
    isLoading:true
}
const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        userExist:(state,action)=>{
            state.user=action.payload,
            state.isLoading=false
        },
        userNotExist:(state)=>{
            state.user=null,
            state.isLoading=false
        }
    }
})
export default authSlice
export const {userExist,userNotExist}=authSlice.actions