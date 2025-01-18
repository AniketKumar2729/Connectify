import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";
import { useSelector } from "react-redux";

function ChatList({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  handleDeleteChat,
}) {
  const {newMessagesAlert}=useSelector((state)=>state.chat)
  // console.log("chats=[]",chats,"newMessageAlert :- ",newMessagesAlert);
  // console.log("ChatList received newMessagesAlert:", newMessagesAlert);
  return (
    <Stack width={w} direction={"column"}>
      {chats?.map((data, idx) => {
        const { _id, name, groupChat, avatar, members } = data;
        let newMessageAlert = newMessagesAlert?.find(
          ({ chatId }) => chatId == _id
        );

        const isOnline = members?.some((member) => onlineUsers.includes(_id));

        return (
            <ChatItem idx={idx} newMessageAlert={newMessageAlert} isOnline={isOnline} avatar={avatar} name={name} key={_id} _id={_id} groupChat={groupChat} sameSende={chatId===_id} handleDeleteChat={handleDeleteChat} />
        );
      })}
    </Stack>
  );
}
export default ChatList
