/* eslint-disable prefer-const */
/* eslint-disable no-lonely-if */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
// import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
// import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons';
import { useEffect } from 'react';
import api from 'utils/api';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import APIUtils from 'api/APIUtils';
import { getUser } from 'features/roleUser/roleUser';
import { onLogout } from 'features/authentication/authentication';
import { useNavigate } from 'react-router';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getUserData();
    }, []);

    const onUserLogout = () => {
        dispatch((onLogout()));
        navigate("/");
    };

    const getUserData = async () => {
        const response = await api.post('/api/auth', null);
        if (get(response, "success", false)) {
            APIUtils.saveUserInfomation(JSON.stringify(response.data));
            let data = get(response, "data", "");
            dispatch(getUser(data));
        } else {
            if (response?.err === 'err:invalid_token') {
                onUserLogout();
            }
        }
    };

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification & profile */}
            {/* <NotificationSection /> */}
            <ProfileSection />
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
