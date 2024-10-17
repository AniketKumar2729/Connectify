import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material';

function Home() {
  return (<>
  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}} height={'100%'} bgcolor={"rgba(0,0,0,0.1)"}>

    <Typography p={'2rem'} variant='h5' textAlign={'center'}   fontSize={'4rem'}> Select an Friend to Chat</Typography>
  </Box>
  </>
  )
}

export default AppLayout()(Home);