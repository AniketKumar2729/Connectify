import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useErrors } from '../../hooks/hook.jsx';
import { useAddGroupMembersMutation, useAvaliableFriendsQuery } from '../../redux/api/api.js';
import { setIsAddMember } from '../../redux/reducers/miscellaneous.reducers.js';
import UserItem from '../shared/UserItem';
const AddMemberDialog = ({ chatId }) => {
    const [selectedMembers, setSelectedMembers] = useState([])
    const { isAddMember } = useSelector(state => state.misc)
    const dispatch=useDispatch()
    const [addMember, isLoadingAddMember] = useAsyncMutation(useAddGroupMembersMutation)
    const {isLoading,isError,error,data}=useAvaliableFriendsQuery(chatId)
    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [
            ...prev,
            id
        ]);
    }
    const addMemberSubmitHandler = () => {
        addMember("Add Members...",{groupId:chatId, members:selectedMembers})
    }
    const closeHandler = () => {
        dispatch(setIsAddMember(false))
    }
    useErrors([{isError,error}])
    return (
        <Dialog open={isAddMember} onClose={closeHandler} sx={{ position: 'absolute', bottom: '10%', left: '27%' }} >
            <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
                <DialogTitle textAlign={'center'}>Add Members</DialogTitle>
                <Stack spacing={'1rem'}>
                    {
                       isLoading?<Skeleton/>: data?.availableFriends?.length > 0 ? data?.availableFriends?.map((i) =>
                            <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)} />
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