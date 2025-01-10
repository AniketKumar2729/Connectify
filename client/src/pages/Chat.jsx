import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, Skeleton, Stack } from '@mui/material';
import React, { useRef, useState } from 'react';
import FileMenu from '../components/dialogs/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/styles/StyledComponent';
import { gray } from '../constants/color';
import { NEW_MESSAGE } from "../constants/event.constants.js";
import { sampleMessage } from '../constants/sampleData';
import { useChatDetailsQuery } from '../redux/api/api.js';
import { getSocket } from '../Socket';
const sampleUser = {
  _id: "akdlkas",
  name: "Hey"
}
function Chat({ chatId }) {
  const containerRef = useRef(null)
  const socket = getSocket()
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId }) 
  const [message, setMessage] = useState("")
  const members=chatDetails?.data?.group?.members
  const handleSubmit = (e) => {
    e.preventDefault()
    // !message get out of the function when nothing is present & !message.trim() help in getting out of the function don't allowing blank space 
    if (!message.trim()) return
    //emitting message to server
    socket.emit(NEW_MESSAGE, { chatId, members, message })
    setMessage("")
  }
  return chatDetails.isLoading ? <><Skeleton /></> : (
    <>

      <Stack ref={containerRef} boxSizing={'border-box'} padding={'1rem'} spacing={'1rem'} bgcolor={gray} height={'90%'} sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {/* messages  render */}
        {
          sampleMessage.map(i => (<MessageComponent key={i._id} message={i} user={sampleUser} />))
        }
      </Stack>
      <form style={{ height: "10%" }} onSubmit={handleSubmit}>
        <Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'} position={'relative'}>
          <IconButton sx={{ position: 'absolute', left: '1.5rem', rotate: '-20deg' }}>
            <AttachmentIcon />
          </IconButton>
          <InputBox placeholder='Enter your message' value={message} onChange={(e) => setMessage(e.target.value)} />
          <IconButton type='submit' sx={{ rotate: "-20deg", bgcolor: "#72BF78", color: 'white', marginLeft: '1rem', padding: '0.5rem', "&:hover": { bgcolor: "#A0D683" } }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  )
}
export default AppLayout()(Chat);