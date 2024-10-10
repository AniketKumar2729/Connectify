import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import moment from 'moment';


const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
    {/* profilePic=false */}
      {/* <Avatar sx={{ bgcolor: "orange" }} variant="square">
        A
      </Avatar> */}
      {/* profilePic=true */}
      <Avatar sx={{width:200,height:200,objectFit:'contain',marginBottom:'1rem',border:'5px solid white'}}/>
      <ProfileCard heading={"PCB PCM "} text={"dfklsjdfslkdfj"} />
      <ProfileCard heading={"Arts Commerce "} text={"dfnldfsnkldsf"} Icon={<TagFacesIcon/>} />
      <ProfileCard heading={"Btech Bcom BBA BA "} text={"dfklsjdfslkdfj"}  Icon={<AlternateEmailOutlinedIcon/>} />
      <ProfileCard heading={"Btech Bcom BBA BA "} text={moment('2024-10-11T00:00:00.000Z').fromNow()}  Icon={<CalendarMonthIcon/>} />
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
