import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import {
  AppBar,
  useTheme,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
} from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
  Timer,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { resetUser, $user } from "store/user";
import { useStore } from "@nanostores/react";
import secureLocalStorage from "react-secure-storage";
import { FlexBetween } from ".";
import FocusMode from "./FocusMode";

// Navbar
const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  // redux dispatch items
  const dispatch = useDispatch();
  // theme
  const theme = useTheme();
  const navigate = useNavigate();
  const usr = useStore($user);

  // nav state
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [isFocusModeActive, setIsFocusModeActive] = useState(false);

  // handle
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    secureLocalStorage.clear();
    resetUser();
    navigate("/");
  }

  const handleFocusModeChange = (active) => {
    setIsFocusModeActive(active);
    if (active) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <FlexBetween>
          {/* Sidebar Menu */}
          {!isFocusModeActive && (
            <IconButton
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title="Toggle Sidebar"
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Search */}
          {/* {!isFocusModeActive && (
            <FlexBetween
              backgroundColor={theme.palette.background.alt}
              borderRadius="9px"
              gap="2rem"
              p="0.1rem 1.5rem"
              title="Search"
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )} */}
        </FlexBetween>

        {/* Right Side */}
        <FlexBetween gap="1.5rem">
          {/* Source Code */}
          {/* {!isFocusModeActive && (
            <IconButton
              onClick={() =>
                window.open(
                  "http://www.github.com/sanidhyy/mern-admin/",
                  "_blank"
                )
              }
              title="Source Code"
            >
              <GitHub sx={{ fontSize: "25px" }} />
            </IconButton>
          )} */}

          {/* Focus Mode */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<Timer />}
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
              backgroundColor: isFocusModeActive
                ? theme.palette.error.main
                : theme.palette.mode === 'dark'
                  ? theme.palette.primary.main
                  : theme.palette.primary.dark,
              color: '#fff',
              '&:hover': {
                backgroundColor: isFocusModeActive
                  ? theme.palette.error.dark
                  : theme.palette.mode === 'dark'
                    ? theme.palette.primary.dark
                    : theme.palette.primary.main,
              },
            }}
            onClick={() => setIsFocusModeOpen(true)}
          >
            {isFocusModeActive ? 'Exit Focus Mode' : 'Focus Mode'}
          </Button>

          {/* Accessibility */}
          {!isFocusModeActive && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark,
                color: '#fff',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
                },
                ml: 2,
              }}
              onClick={() => navigate('/accessibility')}
            >
              Accessibility
            </Button>
          )}

          {/* Dark/Light Mode */}
          {!isFocusModeActive && (
            <IconButton onClick={() => dispatch(setMode())} title="Dark Mode">
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
          )}

          {/* Settings */}
          {!isFocusModeActive && (
            <IconButton title="Setting">
              <SettingsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>
          )}

          {/* User */}
          {!isFocusModeActive && (
            <FlexBetween>
              <Button
                onClick={handleClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
                title={user.name}
              >
                <Box
                  component="img"
                  alt="profile"
                  src={
                    usr.photo ? usr.photo : 'https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg'
                  }
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  referrerPolicy="no-referrer"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px",
                  }}
                />
              </Button>

              {/* DropDown */}
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                {/* log out */}
                <MenuItem onClick={handleClose} title="Log Out">
                  Log Out
                </MenuItem>
              </Menu>
            </FlexBetween>
          )}
        </FlexBetween>
      </Toolbar>

      {/* Focus Mode Dialog */}
      <FocusMode
        isOpen={isFocusModeOpen}
        onClose={() => setIsFocusModeOpen(false)}
        onFocusModeChange={handleFocusModeChange}
      />
    </AppBar>
  );
};

export default Navbar;
