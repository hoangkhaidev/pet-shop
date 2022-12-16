/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

// material-ui
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
