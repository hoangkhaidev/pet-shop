import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  makeStyles,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { onLogout } from "src/features/authentication/authentication";
import Logo from './Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const DashboardNavbar = ({ setMobileNavOpen, setOpenMenu, openMenu, ...rest }) => {
  const [notifications] = useState([]);
  const roleUser = useSelector((state) => state.roleUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

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

        <Button
          color="inherit"
          sx={{
            display: {
              lg: "flex",
              md: "none"
            }
          }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <AccountCircleIcon />
          </Badge>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginLeft: '5px' }}>
            <span style={{ marginRight: '5px' }}>{roleUser?.username}</span>| Level<span style={{ marginLeft: '5px' }}> {roleUser?.account_type}</span>
          </div>
        </Button>
        <Popper style={{ width: '200px' }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>
                      <IconButton
                        color="inherit"
                        sx={{
                          display: {
                            lg: "block",
                            md: "none"
                          }
                        }}
                      >
                        <PersonIcon />
                      </IconButton>
                      {/* <Link href={`/brand/list/${row.id}/edit`}>{cell}</Link> */}
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IconButton
                        color="inherit"
                        sx={{
                          display: {
                            lg: "block",
                            md: "none"
                          }
                        }}
                      >
                        <AssignmentIndIcon />
                      </IconButton>
                      All sub accounts
                    </MenuItem>
                    <MenuItem onClick={onUserLogout}>
                      <IconButton
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
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {/* <IconButton
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
        </IconButton> */}

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
