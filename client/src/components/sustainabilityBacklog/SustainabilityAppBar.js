import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Divider,
} from '@mui/material';
import {
    Nature as NatureIcon,
    AccountCircle as AccountCircleIcon,
    Dashboard as DashboardIcon,
    Assessment as AssessmentIcon,
    TrendingUp as TrendingUpIcon,
    Logout as LogoutIcon,
    Login as LoginIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SustainabilityAppBarStyled = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#2E7D32',
    marginBottom: theme.spacing(4),
}));

const SustainabilityAppBar = ({ authenticated, handleLogout, handleLogin }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <SustainabilityAppBarStyled position="static">
            <Toolbar>
                <NatureIcon sx={{ mr: 2, color: 'white' }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                    Sustainability Backlog
                </Typography>
                <IconButton sx={{ color: 'white' }} onClick={handleMenu}>
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <DashboardIcon sx={{ mr: 1 }} /> Sustainability Metrics
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <AssessmentIcon sx={{ mr: 1 }} /> Environmental Impact
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <TrendingUpIcon sx={{ mr: 1 }} /> Green Initiatives
                    </MenuItem>
                    <Divider />
                    {authenticated ? (
                        <MenuItem onClick={() => { handleLogout(); handleClose(); }}>
                            <LogoutIcon sx={{ mr: 1 }} /> Logout
                        </MenuItem>
                    ) : (
                        <MenuItem onClick={() => { handleLogin(); handleClose(); }}>
                            <LoginIcon sx={{ mr: 1 }} /> Login
                        </MenuItem>
                    )}
                </Menu>
            </Toolbar>
        </SustainabilityAppBarStyled>
    );
};

export default SustainabilityAppBar;