import React, { useState } from "react";
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

const Search = () => {
  const search = useInputValidation("");
  const isLoadingSendFriendRequest = false;
  const [users, setUsers] = useState(sampleUser);

  const addFriendHandler = (id) => {
    console.log(id);
  };

  return (
    <Dialog open>
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
