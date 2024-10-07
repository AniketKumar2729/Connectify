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
import { orange } from "@mui/material/colors";

import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleMobile = () => {
    console.log("Mobile");
  };
  const openSearchDialog = () => {
    console.log("Search");
  };
  const openNewGroup = () => {
    console.log("Group");
  };
  const navigateToGroup = () => {
    navigate("/group");
  };
  const handleLogout = () => {
   console.log("Logout");
   
  };
  const openNotification = () => {
   console.log("Notification");
   
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
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
            <Box sx={{ flexGrow: 1 }} />
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
