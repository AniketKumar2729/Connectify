import {
  AppBar,
  Backdrop,
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
import toast from "react-hot-toast";
import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from '../../constants/config.js'
import { userNotExist } from "../../redux/reducers/auth.reducer.js"
import { useDispatch, useSelector } from "react-redux";
import { setIsMobileMenu, setIsNotification, setIsSearch } from "../../redux/reducers/miscellaneous.reducers.js";
let Search = lazy(() => import("../specific/Search.jsx"));
let Notification = lazy(() => import("../specific/Notification.jsx"))
let NewGroup = lazy(() => import("../specific/NewGroup.jsx"))

const Header = () => {
  const navigate = useNavigate();
  let [group, setGroup] = useState(false);
  let [notification, setNotification] = useState(false);
  const dispatch = useDispatch()
  const { isSearch,isNotification } = useSelector((state) => state.misc)
  const handleMobile = () => {
    dispatch(setIsMobileMenu(true))
  };
  const openSearchDialog = () => {
    dispatch(setIsSearch(true))
  };
  const openNewGroup = () => {
    setGroup(prev => !prev)
  };
  const navigateToGroup = () => {
    navigate("/group");
  };
  const handleLogout = () => {
    const logout = async () => {
      try {
        const logoutResponse = await fetch(`${server}/api/v1/user/logout`, {
          credentials: 'include'
        })
        if (logoutResponse.ok) {
          const data = await logoutResponse.json()
          dispatch(userNotExist())
          console.log("Logout console.log", "Data\t", data);
          toast.success(data.message)
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
      }
    }
    logout()
    console.log("Logout");

  };
  const openNotification = () => {
    dispatch(setIsNotification(true))

  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: blue }}>
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
        isSearch && (<Suspense fallback={<Backdrop open />}><Search /></Suspense>)
      }
      {
        group && (<Suspense fallback={<Backdrop open />}><NewGroup /></Suspense>)
      }
      {
         isNotification && (<Suspense fallback={<Backdrop open />}><Notification /></Suspense>)
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
