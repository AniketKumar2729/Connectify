import React, { lazy, memo, Suspense, useEffect, useState } from 'react';
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';  // Standard Grid from MUI
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from '../components/styles/StyledComponent';
import AvatarCard from '../components/shared/AvatarCard';
import { sampleChats } from '../constants/sampleData';
//lazzy load
const DeleteDialog=lazy(()=>import("../components/dialogs/DeleteDialog.jsx"))
const AddMemberDialog=lazy(()=>import("../components/dialogs/AddMemberDialog.jsx"))
//lazzy load
const Group = () => {
  const groupId = useSearchParams()[0].get('group')
  console.log(groupId);
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [updatedgroupName, setUpdatedGroupName] = useState("");
  const [confirmDeleteDialog,setConfirmDeleteDialog]=useState(false)
  const isAddMember=true;
  const hanldeMobile = () => {
    setIsMobileMenuOpen(prev => !prev)
  }
  const hanldeMobileClose = () => {
    setIsMobileMenuOpen(false)
  }
  const updateGroupNameHandler = () => {
    setIsEdit(false)
  }
  const deleteHandler=()=>{
    setConfirmDeleteDialog(true);
  }
  const dltHandler=()=>{
    console.log('delete handler for delete dialog box');
    closeDialog();
    
  }
  const closeDialog=()=>{
    setConfirmDeleteDialog(false)
  }
  const openAddHandler=()=>{}
  useEffect(() => {
    setGroupName("Group Name")
    setUpdatedGroupName("groupname");
  }, [])
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

  const GroupNames = (
    <Stack direction={'row'} spacing={'1rem'} alignContent={'center'} justifyContent={'center'} padding={'3rem'}>
      {
        isEdit ? <>

          <TextField value={updatedgroupName} onChange={e => setUpdatedGroupName(e.target.value)} />
          <IconButton onClick={updateGroupNameHandler}><DoneAllIcon /></IconButton>
        </> : <>
          <Typography variant='h4'>{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}><EditIcon /></IconButton>
        </>
      }
    </Stack>
  )
  const ButtonGroup=(
    <Stack direction={{sm:'row',xs:'column-reverse'}} p={{xs:'0',sm:'1rem',md:'1rem 3rem'}} spacing={'1rem'}>
    <Button size='large' variant='contained' endIcon={<AddIcon/>} onClick={openAddHandler} >Add Members</Button>
    <Button size='large' color='error' variant='outlined' endIcon={<DeleteIcon/>} onClick={deleteHandler}> Delete Group</Button>
    </Stack>
  )
  return (
    <Grid
      container
      height={'100vh'}
      // sx={{ width: '100%' }}  // Ensure the container takes the full width
      bgcolor={'#229799'}
    >
      <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: 'none',  // Hide on extra-small and small screens
            sm: 'block'  // Show on medium and larger screens
          },
          backgroundColor: "#424242"
        }}
      >
        <GroupList myGroups={sampleChats} groupId={groupId} />
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
        {
          groupName && <>
            {GroupNames}
            <Typography margin={'2rem'} alignSelf={'flex-start'} variant='body1'>Members</Typography>
            <Stack maxWidth={'45rem'} width={'100%'} boxSizing={'border-box'} padding={{ sm: '1rem', xs: '0', md: '1rem 4rem' }} spacing={'2rem'} bgcolor={'#48CFCB'} height={'50vh'} overflow={'auto'}>
            </Stack>
            {/** members*/}
            {ButtonGroup}
          </>
        }
      </Grid>
      {
        isAddMember && <Suspense fallback={<Backdrop open/>}>
          <AddMemberDialog/>
        </Suspense>
      }
      {
        confirmDeleteDialog&&<Suspense fallback={<Backdrop open/>}><DeleteDialog open={confirmDeleteDialog} handleClose={closeDialog} deleteHandler={dltHandler}/></Suspense>
      }
      <Drawer open={isMobileMenuOpen} onClose={hanldeMobileClose} sx={{ display: { xs: 'block', sm: 'none' } }} >
        <GroupList w={'50vw'} myGroups={sampleChats} groupId={groupId} />
      </Drawer>
    </Grid>
  );
}
const GroupList = ({ w = '100%', myGroups = [], chatId }) => {
  return <>
    <Stack width={w} >
      {
        myGroups.length > 0 ? myGroups.map((group) => <GroupListItem group={group} groupId={chatId} key={group._id} />) : <Typography textAlign='center' padding='1rem'>No Groups</Typography>
      }
    </Stack>
  </>
}
const GroupListItem = memo(({ group, groupId }) => {
  const { name, avatar, _id } = group
  return <Link to={`?group=${_id}`} onClick={(e) => {
    if (groupId === _id) e.preventDefault()
  }}>
    <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
      <AvatarCard avatar={avatar} />
      <Typography>{name}</Typography>
    </Stack>
  </Link>
}
)
export default Group;
