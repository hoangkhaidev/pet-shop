/* eslint-disable react-hooks/exhaustive-deps */
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
// import { useNavigate } from 'react-router-dom';
// import { onLogout } from "src/features/authentication/authentication";
import APIUtils from 'src/api/APIUtils';

const DashboardSidebar = ({ onMobileClose, openMobile, openMenu }) => {
  const [listNav, setListNav] = useState({});
  const { currentMenu } = useContext(CurrentPageContext);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const onUserLogout = () => {
  //   dispatch((onLogout()));
  //   navigate("/");
  // };

  const getListNav = useCallback(async () => {
    const response = await api.post('/api/navigation', null);
    if (get(response, "success", false)) {
      setListNav(get(response, "data", {}));
    } else {
      console.log("response", response);
    }
  }, []);

  const getUserData = async() => {
    const response = await api.post('/api/auth', null);
    if (get(response, "success", false)) {
      APIUtils.saveUserInfomation(JSON.stringify(response.data));
      let data = get(response, "data", "");
      dispatch(getUser(data));
    } else {
      if (response?.err === 'err:invalid_token') {
        // onUserLogout();
        APIUtils.logOut();
        // let messageToken = 'Your account has been changed password. Please contact your admin to get new password';
        // localStorage.setItem('messageToken', JSON.stringify(messageToken));
      }
      // if (response?.err === 'err:inactive_account') {
      //   onUserLogout();
      //   let messageToken = 'Your account has been inactivated. Please contact your admin to activate';
      //   localStorage.setItem('messageToken', JSON.stringify(messageToken));
      // }
    }
  };

  useEffect(() => {
    getUserData();
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
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {(listNav?.NavItems || []).map((item) => {
            let urlActive = '/' + currentMenu?.path;
            return (
              <NavItem
                item={item}
                key={item.name}
                isActiveMenu={urlActive === item.url}
              />
            )
          })}
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
