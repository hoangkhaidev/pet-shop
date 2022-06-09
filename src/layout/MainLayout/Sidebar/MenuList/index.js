/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

// material-ui
// import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
// import menuItem from 'menu-items';
import { useCallback, useEffect, useState } from 'react';
import api from 'utils/api';
import { get } from 'lodash';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const [listNav, setListNav] = useState({});

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

    return <><NavGroup item={listNav} /></>;
};

export default MenuList;
