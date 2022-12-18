/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

// material-ui
import '../MainLayout/style.scss';
import 'react-slideshow-image/dist/styles.css';
import { Pagination, Stack } from '@mui/material';
import RecentPosts from 'views/News/RecentPosts';
import ItemProduct from 'views/Product/ItemProduct';
// ==============================|| MAIN LAYOUT ||============================== //

const HomePage = () => {
    return (
        <div className="container site-content">
            <div className="content-primary">
                <main className="site-main">
                    <div className="recent-content">
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                    </div>
                    <Stack spacing={2} className="assadsadsad" sx={{ justifyContent: 'center', paddingTop: '20px' }}>
                        <Pagination count={10} color="primary" sx={{ justifyContent: 'center', display: 'flex' }}/>
                    </Stack>
                </main>
            </div>
            <RecentPosts />
        </div>
    );
};

export default HomePage;
