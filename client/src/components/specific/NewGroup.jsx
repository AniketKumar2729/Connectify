import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { sampleUser } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useDispatch, useSelector } from "react-redux";
import { useAvaliableFriendsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/miscellaneous.reducers";
const NewGroup = () => {

  const {isNewGroup}=useSelector((state)=>state.misc)
const dispatch=useDispatch()

const {isError,isLoading,data,error}=useAvaliableFriendsQuery("")
console.log(data)

  const [selectedMembers, setSelectedMembers] = useState([])
  const groupName = useInputValidation("");

  const errors=[{
    isError:isError,
    error:error
  }]
useErrors(errors)

  const submitHandler = () => { 
    console.log(groupName.value,selectedMembers)
  }
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => prev.includes(id)?prev.filter((i)=>i!==id):[
      ...prev,
      id
    ]);
  }
const closeHandler=()=>{
  dispatch(setIsNewGroup(false))
}
  return (
    <Dialog  onClose={closeHandler} open={isNewGroup}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={'2rem'}>
        <DialogTitle textAlign={'center'} variant="h4">New Group</DialogTitle>
        <TextField value={groupName.value} onChange={groupName.changeHandler} label="Group Name" />
        <Typography variant="body1">Members</Typography>
        <Stack>
          { isLoading?<Skeleton/>:data?.friends.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={'space-between'}>
          <Button variant="outlined" color="error" size="large">Cancel</Button>
          <Button variant="contained" size="larges" onClick={submitHandler}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
