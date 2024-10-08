import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from '@mui/icons-material/Logout';
import Diversity3Icon from "@mui/icons-material/Diversity3";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { blue } from "../../constants/color.js";

import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";

let Search =lazy(()=>import("../specific/Search.jsx"));
let Notification=lazy(()=>import("../specific/Notification.jsx"))
let NewGroup=lazy(()=>import("../specific/NewGroup.jsx"))

const Header = () => {
  const navigate = useNavigate();
  let [mobile,setMobile]=useState(false);
  let [search,setSearch]=useState(false);
  let [group,setGroup]=useState(false);
  let [notification,setNotification]=useState(false);
  const handleMobile = () => {
    console.log("Mobile");
    
  };
  const openSearchDialog = () => {
   setSearch(prev=>!prev)
  };
  const openNewGroup = () => {
    setGroup(prev=>!prev)
  };
  const navigateToGroup = () => {
    navigate("/group");
  };
  const handleLogout = () => {
   console.log("Logout");
   
  };
  const openNotification = () => {
   setNotification(prev=>!prev)
   
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor:blue}}>
          <Toolbar>
          {/* rightpart of header */}
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Connectify
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            {/* middlebox for taking all space so that leftpart of header can go to left */}
            <Box sx={{ flexGrow: 1 }} />
            {/* leftpart of header */}
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearchDialog}
              />
              <IconBtn
                title={"Add New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <Tooltip title="Manage Group">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={navigateToGroup}
                >
                  <Diversity3Icon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notification">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={openNotification}
                >
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={handleLogout}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {
        search&&(<Suspense fallback={<div>Loading...</div>}><Search/></Suspense>)
      }
      {
        group&&(<Suspense fallback={<div>Loading...</div>}><NewGroup/></Suspense>)
      }
      {
        notification&&(<Suspense fallback={<div>Loading...</div>}><Notification/></Suspense>)
      }
    </>
  );
};
const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
export default Header;
