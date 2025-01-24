import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, Skeleton, Stack } from '@mui/material';
import FileMenu from '../components/dialogs/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/styles/StyledComponent';
import { gray } from '../constants/color';
import { ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/event.constants.js";
import { useChatDetailsQuery, useGetOldMessagesQuery } from '../redux/api/api.js';
import { getSocket } from '../Socket';
import { useErrors, useSocketEvent } from '../hooks/hook.jsx';
import { useInfiniteScrollTop } from "6pp"
import { setIsFileMenu } from '../redux/reducers/miscellaneous.reducers.js';
import { removeNewMessagesAlert } from '../redux/reducers/chat.reducer.js';
import { TypingLoader } from '../components/layout/Loaders.jsx';
function Chat({ chatId, user }) {
  const dispatch = useDispatch()
  //message is used for storing whatever user have written
  const [message, setMessage] = useState("")
  //messages is used for storing what are the message are there in a particular chat
  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(1)
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null)

  const [IamTyping, setIamTyping] = useState(false)
  const [userTyping, setUserTyping] = useState(false)
  const typingTimeout = useRef(null)
  const bottomRef = useRef(null)

  const containerRef = useRef(null)
  const socket = getSocket()

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })
  const oldMessagesChunk = useGetOldMessagesQuery({ chatId, page })

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(containerRef, oldMessagesChunk.data?.totalPage, page, setPage, oldMessagesChunk.data?.messages)
  const errors = [{ isError: chatDetails.isError, error: chatDetails.error }, { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error }]
  const members = chatDetails?.data?.group?.members
  const newMessageListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setMessages(prev => [...prev, data.message])
  }, [chatId])

  const startTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    // console.count(" START typing")
    setUserTyping(true)
  }, [chatId])
  const stopTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    // console.count("STOP typing")
    setUserTyping(false)
  }, [chatId])

  const alertListener = useCallback((data) => {
    const messageForAlert = {
      content: data,
      sender: {
        _id: "randomId1",
        name: "Admin"
      },
      chat: chatId,
      createdAt: new Date().toISOString()
    }
    if (data.chatId !== chatId) return;
    setMessages((prev)=>[...prev,messageForAlert])
  }, [chatId])

  const eventHandler = { [NEW_MESSAGE]: newMessageListener, [START_TYPING]: startTypingListener, [STOP_TYPING]: stopTypingListener, [ALERT]: alertListener }
  useSocketEvent(socket, eventHandler)

  const handleSubmit = (e) => {
    e.preventDefault()
    // !message get out of the function when nothing is present & !message.trim() help in getting out of the function don't allowing blank space 
    if (!message.trim()) return
    //emitting message to server
    socket.emit(NEW_MESSAGE, { chatId, members, message })
    setMessage("")
  }
  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId))
    return () => {
      setMessage("")
      setMessages([])
      setOldMessages([])
      setPage(1)
    }
  }, [chatId])

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages])
  const messageChangeHandler = (e) => {
    setMessage(e.target.value)
    //  console.log(message)
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId })
      setIamTyping(true)
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current)
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId })
      setIamTyping(false)
    }, [2000])
  }
  const handleFileOpen = (e) => {
    // e.preventDefault()
    dispatch(setIsFileMenu(true))
    setFileMenuAnchor(e.currentTarget)
  }
  let allMessages = [...oldMessages || [], ...messages]
  // console.log("all Messsges are",allMessages)
  useErrors(errors)
  return chatDetails.isLoading ? <><Skeleton /></> : (
    <>

      <Stack ref={containerRef} boxSizing={'border-box'} padding={'1rem'} spacing={'1rem'} bgcolor={gray} height={'90%'} sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {/* messages  render */}
        {/* {
          !oldMessagesChunk.isLoading && oldMessagesChunk.data?.messages?.map(i => (<MessageComponent key={i._id} message={i} user={user} />))
        } */}
        {
          allMessages.map(i => (<MessageComponent key={i._id} message={i} user={user} />))
        }

        {
          userTyping && <TypingLoader />
        }

        <div ref={bottomRef} />
      </Stack>
      <form style={{ height: "10%" }} onSubmit={handleSubmit}>
        <Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'} position={'relative'}>
          <IconButton sx={{ position: 'absolute', left: '1.5rem', rotate: '-40deg' }} onClick={handleFileOpen}>
            <AttachmentIcon />
          </IconButton>
          <InputBox placeholder='Enter your message' value={message} onChange={messageChangeHandler} />
          <IconButton type='submit' sx={{ rotate: "-20deg", bgcolor: "#72BF78", color: 'white', marginLeft: '1rem', padding: '0.5rem', "&:hover": { bgcolor: "#A0D683" } }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchor={fileMenuAnchor} chatId={chatId} />
    </>
  )
}
export default AppLayout()(Chat);