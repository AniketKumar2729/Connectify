import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotificaiton } from "../../constants/sampleData.js";
import { useGetNotificationQuery } from "../../redux/api/api.js";
import { useErrors } from "../../hooks/hook.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/miscellaneous.reducers.js";
const Notification = () => {
  const { isLoading, data, error, isError } = useGetNotificationQuery()
  const {isNotification}=useSelector(state=>state.misc)
  const dispatch=useDispatch()
  useErrors([{ error, isError }])
  const friendRequestHandler = ({ _id, accept }) => { };
  const onCloseHandler=()=>{
dispatch( setIsNotification(false))
  }
  return (
    <Dialog open={isNotification} onClose={onCloseHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notification</DialogTitle>
        {isLoading ? (<Skeleton />) : (<>
          {data?.request?.length > 0 ? (
            data.request.map((i) => (
              <NotificationItem
                sender={i.sender}
                _id={i._id}
                handler={friendRequestHandler}
                key={i._id}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>0 Notifications</Typography>
          )}
        </>)}

      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${name} sent you a friend requreset`}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }}>
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});
export default Notification;
