/* eslint-disable import/no-cycle */
import { useEffect, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  List,
} from '@material-ui/core';
import get from "lodash/get";
import api from "src/utils/api";
import { CurrentPageContext } from "src/App";
import { useDispatch } from "react-redux";
import { getUser } from "src/features/roleUser/roleUser";

import NavItem from './NavItem';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { onLogout } from "src/features/authentication/authentication";
// const user = {
//   avatar: '/static/images/avatars/avatar_6.png',
//   jobTitle: 'Senior Developer',
//   name: 'Katarina Smith'
// };

const DashboardSidebar = ({ onMobileClose, openMobile, openMenu }) => {
  const [listNav, setListNav] = useState({});
  const { currentMenu } = useContext(CurrentPageContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onUserLogout = () => {
    dispatch((onLogout()));
    navigate("/");
  };

  const getListNav = useCallback(async () => {
    const response = await api.post('/api/navigation', null);
    if (get(response, "success", false)) {
      setListNav(get(response, "data", {}));
    } else {
      // if (response?.err === 'err:invalid_token') {
      //   navigate("/login");
      //   toast.warn('Your account has been changed password. Please contact your upline to get new password ');
      // }
      console.log("response", response);
    }
  }, []);

  const getUserData = async() => {
    const response = await api.post('/api/auth', null);
    if (get(response, "success", false)) {
      let data = get(response, "data", "");
      dispatch(getUser(data));
    } else {
      if (response?.err === 'err:invalid_token') {
        // navigate("/login");
        onUserLogout();
        toast.warn('Your account has been changed password. Please contact your upline to get new password ');
        // return (
        //   <Navigate to="/login" />
        // )
      }
      console.log("response", response);
    }
  };

  useEffect(() => {
    getUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            lg: openMenu ? 'block' : 'none',
            md: "none",
            sm: "none",
            xs: "none"
          }
        }}
        PaperProps={{
          sx: {
            width: 256,
            paddingTop: '64px',
            position: 'unset',
            // top: 64,
            // height: 'calc(100% - 64px)'
            // height: 'auto'
          }
        }}
      >
        {content}
      </Drawer>
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
