import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import moment from 'moment';
import { useSelector } from "react-redux";


const Profile = () => {
  const {user}=useSelector(state=>state.auth)
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
    {/* profilePic=false */}
      {/* <Avatar sx={{ bgcolor: "orange" }} variant="square">
        A
      </Avatar> */}
      {/* profilePic=true */}
      <Avatar src={user?.avatar?.url} sx={{width:200,height:200,objectFit:'contain',marginBottom:'1rem',border:'5px solid white'}}/>
      <ProfileCard heading={"Bio"} text={user.bio||"Not Availabe"} />
      <ProfileCard heading={"Name"} text={user.name||"Not Availabe"} Icon={<TagFacesIcon/>} />
      <ProfileCard heading={"Username"} text={user.username}  Icon={<AlternateEmailOutlinedIcon/>} />
      <ProfileCard heading={"Joined"} text={moment(user.createAt).fromNow()}  Icon={<CalendarMonthIcon/>} />
    </Stack>
  );
};
const ProfileCard = ({text,Icon,heading}) => <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} textAlign={'center'} color={'white'}>
    {Icon&&Icon}
    <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography variant="caption" color={"gray"}>{heading}</Typography>
    </Stack>
</Stack>;

export default Profile;
