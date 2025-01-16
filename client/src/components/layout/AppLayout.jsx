import React, { useCallback } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid2, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../constants/sampleData.js";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile.jsx";
import { useMyChatsQuery } from "../../redux/api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobileMenu } from "../../redux/reducers/miscellaneous.reducers.js";
import { useErrors, useSocketEvent } from "../../hooks/hook.jsx";
import { getSocket } from "../../Socket.jsx";
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from "../../constants/event.constants.js";
import { incrementNotificaiton } from "../../redux/reducers/chat.reducer.js";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.id
    const socket = getSocket()
    const { isMobileMenu } = useSelector((state) => state.misc)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("")
    useErrors([{ isError, error }])

    const newMessageAlertHandler = useCallback(() => { }, [])
    const newRequestAlertHandler = useCallback(() => {
      dispatch(incrementNotificaiton())
    }, [dispatch])
    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestAlertHandler,
    }
    useSocketEvent(socket, eventHandlers)

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("delete chat", _id, groupChat);
    }
    const handleMobileClose = () => {
      dispatch(setIsMobileMenu(false))
    }
    return (
      <>
        <Title />
        <Header />
        {
          isLoading ? (<Skeleton />) : (<Drawer open={isMobileMenu} onClose={handleMobileClose}><ChatList w="70vw" chats={data.chats} chatId={chatId} handleDeleteChat={handleDeleteChat} /></Drawer>)
        }
        <Grid2 container height={`calc(100vh - 4rem)`}>
          <Grid2 md={3} sm={4} sx={{ display: { xs: 'none', sm: 'block' }, border: '2px solid red', overflow: 'auto' }} size={3} height={"100%"}>
            {
              isLoading ? (<Skeleton />) : (<ChatList chats={data.chats} handleDeleteChat={handleDeleteChat} />)
            }

          </Grid2>
          <Grid2 xs={12} sm={8} md={5} lg={6} size={6} sx={{ border: '2px solid blue' }} height={"100%"} >
            {<WrappedComponent {...props} chatId={chatId} user={user} />}
          </Grid2>
          <Grid2 md={4} lg={6} size={3} sx={{ display: { xs: 'none', md: 'block' }, padding: "2rem", bgcolor: "rgba(0,0,0,0.85)", border: '2px solid orange' }} height={"100%"}>
            <Profile />
          </Grid2>
        </Grid2>
      </>
    );
  };
};

export default AppLayout;
