import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useInputValidation } from "6pp";
import UserItem from "../shared/UserItem";
import { sampleUser } from "../../constants/sampleData.js";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/miscellaneous.reducers.js";
import { useLazySearchUserQuery } from "../../redux/api/api.js";

const Search = () => {
  const isLoadingSendFriendRequest = false;
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch()
  const {isSearch}=useSelector((state)=>state.misc)
  const [searchUser]=useLazySearchUserQuery()
  const search = useInputValidation("");
  useEffect(()=>{
    const timeOutId=setTimeout(()=>{
      searchUser(search.value).then(({data})=>(setUsers(data.users))).catch((e)=>console.log(e))
    },1000)
    return ()=>{
      clearTimeout(timeOutId)
    }
  },[search.value])
  const addFriendHandler = (id) => {
    console.log(id);
  };
const handleSearchCloser=()=>{
  dispatch(setIsSearch(false))
}
  return (
    <Dialog open={isSearch} onClose={handleSearchCloser}>
      <Stack
        p={"2rem"}
        direction={"column"}
        alignItems={"center"}
        width={"25rem"}
      >
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
