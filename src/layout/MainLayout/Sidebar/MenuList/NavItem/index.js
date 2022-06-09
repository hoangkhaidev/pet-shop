/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-fallthrough */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useRouter from "../../../../../utils/hooks/useRouter";


// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
// import { MENU_OPEN, SET_MENU } from 'store/actions';
import config from 'config';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { menuOpen, setMenu, setTitlePage } from 'features/customization/customization';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const router = useRouter();
    const customization = useSelector((state) => state.customization);
    const pageName = useSelector((state) => state.parentParam.pageName);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={`${config.basename}${item.url}`} target={itemTarget} />)
    };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id, titlePage) => {
        // dispatch({ type: MENU_OPEN, id });
        dispatch(menuOpen(id));
        dispatch(setTitlePage(titlePage));
        if (matchesSM) dispatch(setMenu(false));
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.url);

        if (currentIndex > -1) {
            // dispatch({ type: MENU_OPEN, id: item.id });
            dispatch(menuOpen(item.url));
            dispatch(setTitlePage(item.name));
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        switch (router.pathname) {
            case '/brand/list':
                dispatch(setTitlePage('Brand List'));
                break;
            case '/home/dashboard':
                dispatch(setTitlePage('Dashboard'));
                break;
            case '/players/players':
                dispatch(setTitlePage('Players List'));
                break;
            case '/global/failed_transaction':
                dispatch(setTitlePage('Failed Transaction'));
                break;
            case '/configuration/games':
                dispatch(setTitlePage('Games'));
                break;
            default: 
                break;
        }
        dispatch(menuOpen(router.pathname));
    }, [router.pathname]);

    useEffect(() => {
        switch (pageName) {
            case 'role_add':
                document.title = 'Add Role';
                break;
            case 'role_edit':
                document.title = 'Edit Role';
                break;
            case 'sub_create':
                document.title = 'Create Sub Account';
                break;
            case 'sub_edit':
                document.title = 'Edit Sub Account';
                break;
            case 'sub_view':
                document.title = 'Sub Account Detail';
                break;
            case 'player_summary':
                document.title = 'Player Summary';
                break;
            case 'game_details':
                document.title = 'Games Details';
                break;
            case 'player_info':
                document.title = 'Player Information';
                break; 
            case 'brand_edit':
                document.title = 'Brand Edit';
                break; 
            case 'brand_view':
                document.title = 'Brand View';
                break; 
            case 'operator_edit':
                document.title = 'Edit Operator';
                break;
            case 'operator_view':
                document.title = 'Operator Detail';
                break;   
            default: 
                document.title = customization.titlePage[0];
                break;
        }
        
        return () => {
            document.title = '';
        }
    }, [customization.titlePage, pageName]);

    return (
        <ListItemButton
            {...listItemProps}
            disableRipple
            disabled={item.disabled}
            sx={{
                borderRadius: `${customization.borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`
            }}
            selected={customization.isOpen.findIndex((id) => id === item.url) > -1}
            onClick={() => itemHandler(item.url, item.name)}
        >
            
            <ListItemIcon sx={{ my: 'auto', minWidth: 18}}>
                <FiberManualRecordIcon
                    sx={{
                        width: customization.isOpen.findIndex((id) => id === item?.url) > -1 ? 8 : 6,
                        height: customization.isOpen.findIndex((id) => id === item?.url) > -1 ? 8 : 6
                    }}
                    fontSize={level > 0 ? 'inherit' : 'medium'}
                />
            </ListItemIcon>
            <ListItemText
                
                primary={
                    <Typography variant={customization.isOpen.findIndex((id) => id === item.url) > -1 ? 'h5' : 'body1'} color="inherit">
                        {item.name}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
