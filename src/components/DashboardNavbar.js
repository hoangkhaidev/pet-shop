import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { useDispatch } from "react-redux";

import { onLogout } from "src/features/authentication/authentication";
import Logo from './Logo';

const DashboardNavbar = ({ setMobileNavOpen, setOpenMenu, openMenu, ...rest }) => {
  const [notifications] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onUserLogout = () => {
    dispatch((onLogout()));
    navigate("/");
  };

  const onOpenMenu = () => {
    setOpenMenu(!openMenu);
  }

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => onOpenMenu()}
          sx={{
            display: {
              lg: "block",
              md: "none",
              sm: "none",
              xs: "none"
            }
          }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          color="inherit"
          sx={{
            display: {
              lg: "block",
              md: "none"
            }
          }}
        >
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          onClick={onUserLogout}
          color="inherit"
          sx={{
            display: {
              lg: "block",
              md: "none"
            }
          }}
        >
          <InputIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => setMobileNavOpen(true)}
          sx={{
            display: {
              lg: 'none',
              md: 'block'
            }
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
