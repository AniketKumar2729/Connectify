import React, { useState } from 'react';
import { Box, Drawer, Grid, IconButton, Tooltip } from '@mui/material';  // Standard Grid from MUI
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
const Group = () => {
  const navigate = useNavigate()
  const[isMobileMenuOpen,setIsMobileMenuOpen]=useState(false);
const hanldeMobile=()=>{
  setIsMobileMenuOpen(prev=>!prev)
}
const hanldeMobileClose=()=>{
  setIsMobileMenuOpen(false)
}
  const IconsBtns = <>
    <Box sx={{
      display: {
        xs: 'block',
        sm: 'none',
        position: 'fixed',
        right: '1rem',
        top: '1rem'
      }
    }}>
      <Tooltip title="menu">

        <IconButton onClick={hanldeMobile}>
          <MenuIcon />
        </IconButton>
      </Tooltip>
    </Box>
    <Tooltip title="back">
      <IconButton onClick={() => navigate('/')} sx={{ position: 'absolute', top: '2rem', left: '2rem', backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', "&:hover": { bgcolor: 'black' } }}>

        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>
  </>
  return (
    <Grid
      container
      height={'100vh'}
      // sx={{ width: '100%' }}  // Ensure the container takes the full width
      bgcolor={'bisque'}
    >
      <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: 'none',  // Hide on extra-small and small screens
            sm: 'block'  // Show on medium and larger screens
          },
          backgroundColor: "red"
        }}
      >
        Group List
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem 3rem',
          position: 'relative'
        }}
      >
        {IconsBtns}
      </Grid>
      <Drawer open={isMobileMenuOpen} onClose={hanldeMobileClose} sx={{display:{xs:'block',sm:'none'}}}>
Grp List
      </Drawer>
    </Grid>
  );
}

export default Group;
