import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, Stack } from '@mui/material';
import React, { useRef } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { InputBox } from '../components/styles/StyledComponent';
import { gray } from '../constants/color';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const sampleUser={
  _id:"akdlkas",
  name:"Hey"
}
function Chat() {
  const containerRef=useRef(null)
  return (
    <>

    <Stack ref={containerRef} boxSizing={'border-box'} padding={'1rem'} spacing={'1rem'} bgcolor={gray} height={'90%'} sx={{overflowY:'auto',overflowX:'hidden'}}>
    {/* messages  render */}
    {
      sampleMessage.map(i=>(<MessageComponent message={i} user={sampleUser}/>))
    }
    </Stack>
    <form style={{height:"10%"}}>
      <Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'} position={'relative'}>
        <IconButton sx={{position:'absolute',left:'1.5rem',rotate:'-20deg'}}>
          <AttachmentIcon/>
        </IconButton>
        <InputBox placeholder='Enter your message'/>
        <IconButton type='submit' sx={{rotate:"-20deg",bgcolor:"#72BF78",color:'white',marginLeft:'1rem',padding:'0.5rem',"&:hover":{bgcolor:"#A0D683"}}}>
        <SendIcon/>
        </IconButton>
      </Stack>
    </form>
    <FileMenu/>
    </>
  )
}

export default AppLayout()(Chat);