import { Box, Typography } from '@mui/material'
import moment from 'moment'
import React, { memo } from 'react'
import { fileFormat } from '../../lib/features.js'

const MessageComponent = ({message,user}) => {
    const{sender,content,attachments=[],createdAt}=message
    const sameSender=sender?._id===user?._id
    const timeAgo=moment(createdAt).fromNow()
  return (
    <div style={{alignSelf:sameSender?'flex-end':'flex-start',background:sameSender?'#E88D67':'#006989',color:sameSender?'white':'black',borderRadius:'.5rem',padding:'.5rem',width:'fit-content'}}>
    {
        !sameSender&&<Typography color={'#FFFBE6'} fontWeight={'600'} variant={'caption'}>{sender.name}</Typography>
    }
    {
        content && <Typography>{content}</Typography>
    }
   {
    attachments.length>0&&(
        attachments.map((i,index)=>{
            const url=i.url;
            const file= fileFormat(url)
            return <Box key={index}>
            <a href='' target='_blank' download style={{color:'black'}}>
                
            </a>
            </Box>
        })
    )
   }
    <Typography variant={'caption'}>{timeAgo}</Typography>
    </div>
  )
}

export default memo(MessageComponent)