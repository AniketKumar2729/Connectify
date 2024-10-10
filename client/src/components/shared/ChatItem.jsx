import React, { memo } from "react";
import { Link } from "../styles/StyledComponent";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
function ChatItem({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  idx = 0,
  handleDeleteChat,
}) {
  return (
    <Link to={`/chat/${_id}`} onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "black" : "unset",
          position: "relative",
        }}
      >
      {/* avatar card */}
      <AvatarCard avatar={avatar}/>
      <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} new message</Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height:"10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </Link>
  );
}

export default memo(ChatItem);
