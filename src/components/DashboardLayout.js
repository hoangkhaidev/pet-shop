import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled, useMediaQuery } from '@material-ui/core';
import { useTheme } from "@material-ui/core/styles";

import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 0
    }
  })
);

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  padding: 16,
  fontFamily: 'Helvetica'
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const DashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));
  const [openMenu, setOpenMenu] = useState(true);

  useEffect(() => {
    setMobileNavOpen(matches);
  }, [matches]);

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar setMobileNavOpen={setMobileNavOpen} setOpenMenu={setOpenMenu} openMenu={openMenu} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMenu={openMenu}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
