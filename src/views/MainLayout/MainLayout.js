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
            <div className="call-now-button" id="draggable">
				<div className="tr_pc"><p className="call-text"> 0707760796 </p>
					<a href="tel:0707760796" id="quickcallbutton" title="Call Now">
					<div className="quick-alo-ph-circle active" />
                    <div className="quick-alo-ph-circle-fill_tr active" />
                    <div className="quick-alo-ph-img-circle_tr shake" />
					</a>
				</div>
			</div>
        </>
    );
};

export default MainLayout;
