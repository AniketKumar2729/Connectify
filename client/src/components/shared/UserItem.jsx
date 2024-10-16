import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

const UserItem = ({ user, handler, handlerIsLoading }) => {
    const { name, _id, avatar } = user;
    return (
        <ListItem  >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"} >
                <Avatar src={avatar[0]} />
                <Typography
                    variant="body1"
                    sx={{
                        
                        flexGrow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {name}
                </Typography>
                <IconButton
                    size="small"
                    sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        "&:hover": { bgcolor: "primary.dark" },
                    }}
                    onClick={() => handler(_id)}
                    disabled={handlerIsLoading}
                >
                    <AddCircleOutlineRoundedIcon />
                </IconButton>
            </Stack>
        </ListItem>
    );
};

export default memo(UserItem);