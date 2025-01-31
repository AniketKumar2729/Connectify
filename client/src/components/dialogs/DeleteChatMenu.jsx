import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducers/miscellaneous.reducers'
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../../hooks/hook';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api';
const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
    const navigate = useNavigate()
    const { isDeleteMenu, selectedDeleteChat } = useSelector(state => state.misc)
    const closeHandler = () => {
        dispatch(setIsDeleteMenu(false))
        deleteMenuAnchor.current = null
    }
    const [deleteChat, _, deleteChatData] = useAsyncMutation(useDeleteChatMutation)
    const [leaveGroup, __, leaveGroupData] = useAsyncMutation(useLeaveGroupMutation)
    const isGroup = selectedDeleteChat.groupChat
    const leaveGroupHandler = () => {
        leaveGroup("Leaving the Group...",selectedDeleteChat.chatId)
        closeHandler()
    }
    const deleteChatHandler = () => {
        deleteChat("Deleting the Chat....", { chatId: selectedDeleteChat.chatId })
        closeHandler()
    }
    useEffect(() => {
        if (deleteChatData||leaveGroupData)
            navigate("/")
    }, [deleteChatData,leaveGroupData])

    return (
        <Menu open={isDeleteMenu} onClose={closeHandler} anchorEl={deleteMenuAnchor?.current ?? undefined} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{
            vertical: "center", horizontal: "center"
        }}>
            <Stack sx={{
                width: "10rem",
                padding: "0.6rem",
                cursor: "pointer"
            }}
                direction={"row"}
                alignItems={"center"}
                spacing={"0.5rem"}
                onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
            >
                {
                    isGroup ? <>
                        <GroupRemoveIcon />
                        <Typography>Leave Group</Typography>
                    </> :
                        <>
                            <DeleteIcon />
                            <Typography>Delete Chat</Typography>
                        </>
                }
            </Stack>
        </Menu>
    )
}

export default DeleteChatMenu