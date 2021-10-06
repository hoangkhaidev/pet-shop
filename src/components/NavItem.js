import { useState } from 'react';
import {
  NavLink as RouterLink
} from 'react-router-dom';
import PropTypes, { bool } from 'prop-types';
import {
  Button,
  ListItem,
  Collapse,
  List,
  makeStyles,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useRouter from "src/utils/hooks/useRouter";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
    fontFamily: 'Helvetica'
  },
  menuItemLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  mainHref: {
    color: "#6b778c !important",
    fontSize: "0.875rem !important",
    padding: "6px 8px !important",
    lineHeight: 2,
    fontFamily: "sans-serif",
    "&:hover": {
      backgroundColor: "rgba(86, 100, 210, 0.04) !important"
    }
  }
}));

const NavItem = ({
  item, isActiveMenu, ...rest
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onOpenCollapseMenu = () => {
    setIsOpen((open) => !open);
  };

  return (
    <>
      
      {item?.children ? (
        <>
          <ListItem
            disableGutters
            sx={{
              py: 0
            }}
            {...rest}
          >
            <Button
              onClick={onOpenCollapseMenu}
              sx={{
                color: isActiveMenu ? 'text.active' : 'text.secondary',
                fontWeight: isActiveMenu ? "bold" : "medium",
                justifyContent: 'space-between',
                letterSpacing: 0,
                py: 1.25,
                textTransform: 'none',
                width: '100%',
                '& svg': {
                  mr: 1
                }
              }}
            >
              <div className={classes.menuItemLeft}>
                <span>{item.name}</span>
              </div>
              {item?.children && (
                isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
              )}
            </Button>
          </ListItem>
          <Collapse
            in={isActiveMenu || isOpen}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {(item?.children || []).map((sub) => {
                let checkGroupBrand = router.pathname.indexOf('/global/group_brand');
                if (checkGroupBrand !== -1) {
                  return (
                    <ListItem
                      button
                      component={RouterLink}
                      to={sub.url}
                      key={sub.name}
                      className={classes.nested}
                      sx={{
                        py: 2,
                        color: sub?.url === '/global/group_brand' ? 'text.active' : 'text.secondary',
                      }}
                    >
                      {sub.name}
                    </ListItem>
                  )
                }
               
                return (
                  <ListItem
                    button
                    component={RouterLink}
                    to={sub.url}
                    key={sub.name}
                    className={classes.nested}
                    sx={{
                      py: 2,
                      color: sub?.url === router.pathname ? 'text.active' : 'text.secondary',
                    }}
                  >
                    {sub.name}
                  </ListItem>
                )
              })}
            </List>
          </Collapse>
        </>
      ) : (
        <ListItem
          button
          component={RouterLink}
          to={item.url}
          key={item.name}
          className={classes.mainHref}
          sx={{
            py: 2
          }}
        >
          {item.name}
        </ListItem>
      )}
    </>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  isActiveMenu: bool
};

NavItem.defaultProps = {
  isActiveMenu: false,
};

export default NavItem;
