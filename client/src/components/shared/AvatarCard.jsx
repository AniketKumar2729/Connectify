import { Avatar, Box, Stack } from '@mui/material'
import React from 'react'

const AvatarCard = ({avatar=[],max=4}) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
    <Avatar max={max} position={'relative'}>
    <Box width={'5rem'} height={'3rem'}/>
    {
        avatar.map((src,idx)=>(
            <img key={Math.random()*100} src={src} alt={`Avatar ${avatar}`} style={{widt:'2rem',height:'2rem',position:'absolute',left:{xs:`${0.5 + idx}rem`,sm:`${idx}rem`}}}/>
        ))
    }

    </Avatar>

    </Stack>
  )
}

export default AvatarCard