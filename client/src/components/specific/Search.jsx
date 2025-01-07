import { useInputValidation } from "6pp";
import SearchIcon from "@mui/icons-material/Search";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook.jsx";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api.js";
import { setIsSearch } from "../../redux/reducers/miscellaneous.reducers.js";
import UserItem from "../shared/UserItem";
const Search = () => {
  const [users, setUsers] = useState([]);
  const search = useInputValidation("");
  const dispatch = useDispatch()
  const { isSearch } = useSelector((state) => state.misc)
  const [searchUser] = useLazySearchUserQuery()
  const [sendFriendRequest, isLoadingSendFriendRequest,] = useAsyncMutation(useSendFriendRequestMutation)
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value).then(({ data }) => (setUsers(data.users))).catch((e) => console.log(e))
    }, 1000)
    return () => {
      clearTimeout(timeOutId)
    }
  }, [search.value])
  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...",{receiverId: id})
    // the below code can also be written in other way
    // try {
    //   const res = await sendFriendRequest({ receiverId: id })
    //   if (res.data) {
    //     toast.success(res.data.message)
    //     console.log(res.data);
    //   }
    //   else {
    //     toast.error(res?.error?.data?.message||"Something went wrong")
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Something went wrong")
    // }
  };
  const handleSearchCloser = () => {
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
