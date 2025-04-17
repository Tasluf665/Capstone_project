import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  NatureOutlined,
  AssessmentOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  SpeedOutlined,
  LocalFlorist,
  Eco,
  DeleteOutline,
  PowerOutlined,
  WaterOutlined,
  AdminPanelSettingsOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

import { FlexBetween } from ".";
import profileImage from "assets/profile.jpeg";

// Nav items
const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Sustainability Backlog",
    icon: <NatureOutlined />,
  },
  {
    text: "Environmental Impact",
    icon: null,
  },
  {
    text: "Carbon Footprint",
    icon: <LocalFlorist />,
  },
  {
    text: "Energy Efficiency",
    icon: <PowerOutlined />,
  },
  {
    text: "Water Conservation",
    icon: <WaterOutlined />,
  },
  {
    text: "Waste Management",
    icon: <DeleteOutline />,
  },
  {
    text: "Sustainability Metrics",
    icon: null,
  },
  {
    text: "Overview",
    icon: <AssessmentOutlined />,
  },
  {
    text: "Daily Impact",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "Monthly Report",
    icon: <PieChartOutlined />,
  },
  {
    text: "Breakdown",
    icon: <SpeedOutlined />,
  },
  {
    text: "Performance",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
];

// Sidebar
const Sidebar = ({
  user,
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  // config
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  // set active path
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        // Sidebar
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
            "& .MuiDrawer-paper::-webkit-scrollbar": {
              width: 0,
            },
          }}
        >
          <Box width="100%">
            {/* Brand Info */}
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    onClick={() => {
                      navigate("/dashboard");
                      setActive("dashboard");
                    }}
                    sx={{
                      cursor: "pointer",
                    }}
                    title="Sustainability Dashboard"
                  >
                    Sustainability Dashboard
                  </Typography>
                </Box>
                {/* Mobile Sidebar Toggle Icon */}
                {!isNonMobile && (
                  <IconButton
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    title="Close Sidebar"
                  >
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            {/* Sidebar items */}
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }

                return (
                  <ListItem key={text} title={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        const path = `/${text.toLowerCase().replace(/\s+/g, '-')}`;
                        navigate(path);
                        setActive(path.substring(1));
                      }}
                      sx={{
                        backgroundColor:
                          active === text.toLowerCase().replace(/\s+/g, '-')
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === text.toLowerCase().replace(/\s+/g, '-')
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      {/* icon */}
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === text.toLowerCase().replace(/\s+/g, '-')
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>

                      {/* text */}
                      <ListItemText primary={text} />
                      {active === text.toLowerCase().replace(/\s+/g, '-') && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* User */}
          <Box pb="1rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
