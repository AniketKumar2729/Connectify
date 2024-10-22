import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Groups3Icon from "@mui/icons-material/Groups3";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import {
    Box,
    Drawer,
    Grid,
    IconButton,
    Stack,
    styled,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link as LinkComponent, Navigate, useLocation } from "react-router-dom";
const Link = styled(LinkComponent)`
text-decoration:none;
border-radius:2rem;
padding:1rem 2rem;
color:black;
&:hover{
    color:rgba(0,0,0,0.54);
}
`
const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <SpaceDashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/user-management ",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats-management",
    icon: <Groups3Icon />,
  },
  {
    name: "Messages",
    path: "/admin/messages-management",
    icon: <QuestionAnswerIcon />,
  },
];
const isAdmin=true;
const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  const handleClose = () => {
    setIsMobile((prev) => !prev);
  };
  if(!isAdmin) return <Navigate to='/admin'/>
  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid item sx={{ display: { xs: "none", md: "block" } }} md={4} lg={3}>
        <SideBar />
      </Grid>
      <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: "#3B1E54" }}>
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <SideBar w={"50vw"} />
      </Drawer>
    </Grid>
  );
};
const SideBar = ({ w = "100%" }) => {
  const location = useLocation();
  const logoutHandler=()=>{
    console.log('logout');    
  }
  return (
    <Stack
      width={w}
      direction={"column"}
      p={"3rem"}
      spacing={"3rem"}
      bgcolor={"#9B7EBD"}
    >
      <Typography variant="h5" textTransform={"uppercase"}>
        Connectify
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link key={tab.path} to={tab.path} sx={location.pathname===tab.path&&{bgcolor:'#D4BEE4',color:'white',"&:hover":{color:'#EEEEEE'}}}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography fontSize={'1.2rem'}>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={logoutHandler}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon/>
              <Typography fontSize={"1.2rem"}>Logout</Typography>
            </Stack>
          </Link>
      </Stack>
    </Stack>
  );
};
export default AdminLayout;
