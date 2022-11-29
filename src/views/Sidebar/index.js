/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import {
  SidebarContainer,
  SidebarWrapper,
  Icon,
  CloseIcon,
  SidebarMenu,
  SidebarLink
} from "./SidebarElements";

const SideBar = ({ isOpen, toggle }) => {

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/" onClick={toggle}>
            Trang chủ
          </SidebarLink>
          <SidebarLink to="/danh-muc/shop-cho-cho" onClick={toggle}>
            Shop cho chó 
          </SidebarLink>
          
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <SidebarLink to="/danh-muc/shop-cho-meo" onClick={toggle}>
                Shop cho mèo
            </SidebarLink>
            <ListItemButton 
                onClick={handleClick} 
                className='sadsasadsadsadsadsadsad'
                sx={{
                    background: 'none',
                    flexGrow: 'unset',
                    '&:hover': {
                        background: 'none !important',
                    },
                    '&:active': {
                        background: 'none !important',
                    },
                }}
            >
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </Box>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <SidebarLink to="/danh-muc/pate" onClick={toggle}>
                    <ListItemText 
                        primary="Pate" 
                        sx={{
                            '& span': {
                                fontSize: '20px'
                            }
                        }}
                    />
                </SidebarLink>
                <SidebarLink to="/danh-muc/hat" onClick={toggle}>
                    <ListItemText 
                        primary="Hat" 
                        sx={{
                            '& span': {
                                fontSize: '20px'
                            }
                        }}
                    />
                </SidebarLink>
            </List>
          </Collapse>
          
          <SidebarLink to="/dich-vu-cham-soc-thu-cung" onClick={toggle}>
            Dịch vụ spa
          </SidebarLink>
          <SidebarLink to="/lien-he" onClick={toggle}>
            Liên hệ
          </SidebarLink>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default SideBar;
