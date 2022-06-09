/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';

// material-ui
import { Divider, List } from '@mui/material';

// project imports
// import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
// import NavCollapse from '../NavCollapse';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    // const theme = useTheme();
    // menu list collapse & items
    const handleOnClick = (index) => {
        console.log(index);
    }
    const items = item?.NavItems?.map((menu, index) => {
    
        return <NavCollapse key={index} handleOnClick={handleOnClick} menu={menu} level={1} indexCol={index}/>;
    });

    return (
        <>
            <List
                // subheader={
                //     item.name && (
                //         <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                //             {item.name}
                //             {item.caption && (
                //                 <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                //                     {item.caption}
                //                 </Typography>
                //             )}
                //         </Typography>
                //     )
                // }
            >
                {items}
            </List>
            {/* group divider */}
            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
        </>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
