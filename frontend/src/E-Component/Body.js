import React, { useEffect, useRef, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useNavigate, useLocation } from "react-router-dom";
import useQueryHooks from "../Api/useQueryHook";
import { environtment } from "../Environment/environment";
import useDialog from "../Api/useDialog";
import profile from "../Assets/profile.jpg";
import {
  faUser,
  faCog,
  faAdjust,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useAuth } from "../AuthGuard/Auth";

const Body = ({ showBar }) => {
  const {
    data,
    queryLoading,
    queryError,
    setError,
    createProfile,
    updateProfile,
    deleteProfile,
  } = useQueryHooks(environtment.api + "all-profile/", 0, 0, false);
  const { openDialog, DialogComponent } = useDialog();
  const profileImg = useRef(null);
  const [option, setOption] = useState(false);
  const refOption = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {user,login,logout} = useAuth()




  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const handleHideClick = () => {
    showBar.setNavBarVisible((showBar.navBarVisible = !showBar.navBarVisible));
  };

  useEffect(() => {
    if (queryError) {
      handleOpenDialog();
    }

    if (option) {
      refOption.current.classList.add("active");
    } else {
      refOption.current.classList.remove("active");
    }
  }, [location, option]);

  const options = [
    { text: "Profile", icon: faUser },
    { text: "Setting", icon: faCog },
    { text: "Contrast", icon: faAdjust },
    { text: "Log out", icon: faSignOutAlt },
  ];

  const handleOpenDialog = () => {
    if (queryError) {
      const dialogTitle = "Session Expired";
      const dialogMessage = "Please relogin to renew your session";
      const confirmCallback = () => {
        navigate("/");
        secureLocalStorage.clear();
        return;
      };

      const closeCallback = () => {
        navigate("/");
        secureLocalStorage.clear();
        return;
      };

      openDialog(dialogTitle, dialogMessage, confirmCallback, closeCallback);
      return;
    }
  };

  const showOption = () => {
    setOption((prevState) => (prevState = !prevState));
  };


  
  const gotoLogin = () => {
    handleClose()
    secureLocalStorage.clear();
    logout()
    navigate("/");
  };

  return (
    <>
      <div className="home-body">
        <header id="header-body-contain">
          <div className="header-body-block">
            <FontAwesomeIcon
              icon={faBars}
              className="navigation-icons"
              id="header-menu-bar"
              onClick={handleHideClick}
            />
            <h2 className="header-body-title">
              E-commerce 
            </h2>
          </div>
          <div className="headers-body-logged">
            <ul id="header-logged-option" ref={refOption}>
              {options.map((option, index) => (
                <li key={index} className="header-logged-list">
                  <FontAwesomeIcon
                    icon={option.icon}
                    className="header-logged-icons"
                  />
                  {option.text}
                </li>
              ))}
            </ul>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <img className="header-logged-image" src={profile} />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={gotoLogin}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </header>
        <div className="home-body-contain">
          <Outlet />
        </div>
      </div>
      <DialogComponent />
    </>
  );
};

export default Body;
