/* eslint-disable import/no-cycle */
import { useEffect, useState, useCallback, useContext } from 'react';
import { Link as RouterLink, useRoutes } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  Typography,
} from '@material-ui/core';
import get from "lodash/get";
import api from "src/utils/api";
import { CurrentPageContext } from "src/App";

import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const [listNav, setListNav] = useState({});
  const { currentMenu } = useContext(CurrentPageContext);

  const getListNav = useCallback(async () => {
    const response = await api.post('/api/navigation', null);
    if (get(response, "success", false)) {
      setListNav(get(response, "data", {}));
    } else {
      console.log("response", response);
    }
  }, []);

  useEffect(() => {
    getListNav();
  }, [getListNav]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {(listNav?.NavItems || []).map((item) => (
            <NavItem
              item={item}
              key={item.name}
              isActiveMenu={currentMenu?.name === item.name}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      {/* <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Need more?
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Upgrade to PRO version and access 20 more screens
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Button
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            See PRO version
          </Button>
        </Box>
      </Box> */}
    </Box>
  );

  return (
    <>
      <Drawer
        anchor="left"
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
        sx={{
          display: {
            xl: 'none',
            xs: 'block'
          }
        }}
        PaperProps={{
          sx: {
            width: 256
          }
        }}
      >
        {content}
      </Drawer>
      <Drawer
        anchor="left"
        open
        variant="persistent"
        onClose={onMobileClose}
        sx={{
          display: {
            lg: 'block',
            md: "none",
            sm: "none",
            xs: "none"
          }
        }}
        PaperProps={{
          sx: {
            width: 256,
            top: 64,
            height: 'calc(100% - 64px)'
          }
        }}
      >
        {content}
      </Drawer>
      {/* <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden> */}
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
