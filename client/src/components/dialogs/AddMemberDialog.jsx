import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React from 'react'
import { sampleUser } from "../../constants/sampleData.js";
import UserItem from '../shared/UserItem';
const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
    
    const addFriendHandler = (id) => {
        console.log(id, chatId);
    }
    const addMemberSubmitHandler = () => {
    }
    const closeHandler = () => {
    }
    return (
        <Dialog open onClose={closeHandler} sx={{ position: 'absolute', bottom: '10%', left: '27%' }} >
            <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
                <DialogTitle textAlign={'center'}>Add Members</DialogTitle>
                <Stack spacing={'1rem'}>
                    {
                        sampleUser.length > 0 ? sampleUser.map((i) =>
                            <UserItem key={i._id} user={i} handler={addFriendHandler} />
                        ) : <Typography textAlign={'center'}>No Friends </Typography>
                    }
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'} >
                    <Button color='error' onClick={closeHandler}>Cancel</Button>
                    <Button variant='outlined' onClick={addMemberSubmitHandler} disabled={isLoadingAddMember}>Submit</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog