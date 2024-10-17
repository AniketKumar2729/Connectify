import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { sampleUser } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
const NewGroup = () => {
  const [members, setMembers] = useState(sampleUser)
  const [selectedMembers, setSelectedMembers] = useState([])
  const groupName = useInputValidation("");
  const submitHandler = () => { }
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => prev.includes(id)?prev.filter((i)=>i!==id):[
      ...prev,
      id
    ]);
  }
const closeHandler=()=>{}
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={'2rem'}>
        <DialogTitle textAlign={'center'} variant="h4">New Group</DialogTitle>
        <TextField value={groupName.value} onChange={groupName.changeHandler} label="Group Name" />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {members.map((user) => (
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
