/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unreachable */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@mui/icons-material/Settings';
import SummarizeIcon from '@mui/icons-material/Summarize';
import NotesIcon from '@mui/icons-material/Notes';
// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

const NavCollapse = ({ menu, level, indexCol, handleOnClick }) => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleClick = () => {
        handleOnClick(indexCol);
        setOpen(!open);

        console.log(selected);
        setSelected(selected === indexCol ? null : indexCol);
    };

    // console.log(customization.isOpen[0]);
    // console.log(menu)
    useEffect(() => {
        const navBar = menu?.children?.findIndex((item) => {
            return customization.isOpen[0] === item.url;
        });

        if (navBar !== -1) {
            setOpen(true);
            setSelected(indexCol);
        } else {
            setOpen(false);
            setSelected(null);
        }
    }, []);
 
    // menu collapse & item
    const menus = menu?.children?.map((item, index) => {
        // switch (item.type) {
        //     case 'collapse':
        //         return <NavCollapse key={item.id} menu={item} level={level + 1} />;
        //     case 'item':
        //         return <NavItem key={item.id} item={item} level={level + 1} />;
        //     default:
        //         return (
        //             <Typography key={item.id} variant="h6" color="error" align="center">
        //                 Menu Items Error
        //             </Typography>
        //         );
        // }
        return <NavItem key={index} item={item} level={level + 1} />;
    });

    return (
        <>
            <ListItemButton
                sx={{
                    borderRadius: `${customization.borderRadius}px`,
                    mb: 0.5,
                    alignItems: 'flex-start',
                    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                    py: level > 1 ? 1 : 1.25,
                    pl: `${level * 24}px`
                }}
                selected={selected === indexCol}
                onClick={handleClick}
            >
                {
                    (menu?.url === '/home') ? (
                        <ListItemIcon sx={{ my: 'auto', minWidth: !menu?.url ? 18 : 36 }}>
                            <DashboardIcon fontSize='small' sx={{mr: '5px'}}/>
                        </ListItemIcon>
                    ) : (menu?.url === '/sub') ? (
                        <ListItemIcon sx={{ my: 'auto', minWidth: !menu?.url ? 18 : 36 }}>
                            <GroupIcon fontSize='small' sx={{mr: '5px'}}/>
                        </ListItemIcon>
                    ) : (menu?.url === '/operator') ? (
                        <ListItemIcon sx={{ my: 'auto', minWidth: !menu?.url ? 18 : 36 }}>
                            <AccountBoxIcon fontSize='small' sx={{mr: '5px'}}/>
                        </ListItemIcon>
                    ) : (menu?.url === '/brand') ? (
                        <ListItemIcon sx={{ my: 'auto', minWidth: !menu?.url ? 18 : 36 }}>
                            <AssignmentIndIcon fontSize='small' sx={{mr: '5px'}}/>
                        </ListItemIcon>
                    ) : (menu?.url === '/players') ? (
                        <ListItemIcon sx={{ my: 'auto', minWidth: !menu?.url ? 18 : 36 }}>
                            <PersonIcon fontSize='small' sx={{mr: '5px'}}/>
                        </ListItemIcon>
                    ) : (menu?.url === '/global') ? (
                        <ListItemIcon sx={{ my: 'auto', minWidth: !menu?.url ? 18 : 36 }}>
                            <AccountBalanceIcon fontSize='small' sx={{mr: '5px'}}/>
                        </ListItemIcon>
                    ) : (menu?.url === '/configuration') ? (
                        <ListItemIcon sx={{ my: 'auto', minWidth: !menu?.url ? 18 : 36 }}>
                            <SettingsIcon fontSize='small' sx={{mr: '5px'}}/>
                        </ListItemIcon>
                    ) : (menu?.url === '/reports') ? (
                        <ListItemIcon sx={{ my: 'auto', minWidth: !menu?.url ? 18 : 36 }}>
                            <SummarizeIcon fontSize='small' sx={{mr: '5px'}}/>
                        </ListItemIcon>
                    ) : (menu?.url === '/action-log') ? (
                        <ListItemIcon sx={{ my: 'auto', minWidth: !menu?.url ? 18 : 36 }}>
                            <NotesIcon fontSize='small' sx={{mr: '5px'}}/>
                        </ListItemIcon>
                    ) : (
                        <ListItemIcon sx={{ my: 'auto', minWidth: 18 }}>
                            <FiberManualRecordIcon
                                sx={{
                                    width: selected === indexCol ? 8 : 6,
                                    height: selected === indexCol ? 8 : 6
                                }}
                                fontSize={level > 0 ? 'inherit' : 'medium'}
                            />
                        </ListItemIcon>
                    )
                }
                <ListItemText
                    primary={
                        <Typography variant={selected === indexCol ? 'h5' : 'body1'} color="inherit" sx={{ my: 'auto' }}>
                            {menu?.name}
                        </Typography>
                    }
                    secondary={
                        menu?.caption && (
                            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                {menu?.caption}
                            </Typography>
                        )
                    }
                />
                {open ? (
                    <IconChevronUp stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                ) : (
                    <IconChevronDown stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                )}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding
                    sx={{
                        position: 'relative',
                        '&:after': {
                            content: "''",
                            position: 'absolute',
                            left: '32px',
                            top: 0,
                            height: '100%',
                            width: '1px',
                            opacity: 1,
                            background: theme.palette.primary.light
                        }
                    }}
                >
                    {menus}
                </List>
            </Collapse>
        </>
    );
};

NavCollapse.propTypes = {
    menu: PropTypes.object,
    level: PropTypes.number
};

export default NavCollapse;
