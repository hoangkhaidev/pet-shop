/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

// material-ui
import '../MainLayout/style.scss';
import 'react-slideshow-image/dist/styles.css';
// import { Pagination, Stack } from '@mui/material';
import RecentPosts from 'views/News/RecentPosts';
import ItemProduct from 'views/Product/ItemProduct';
import { useEffect, useState } from 'react';
// ==============================|| MAIN LAYOUT ||============================== //

const HomePage = () => {
    const [dataPosts, setDataPosts] = useState([]);

    const onGetPosts = async() => {
        const res = await fetch(
        `https://aweu.info/wp-json/wp/v2/posts`,
        {
            method: 'GET',
        }
        );
        const test = await res.json();
        setDataPosts(test);
    }

    useEffect (() => {
        onGetPosts();
    }, []);

    return (
        <div className="container site-content">
            <div className="content-primary">
                <main className="site-main">
                    <div className="recent-content">
                        {
                            dataPosts?.map((item) => {
                                return <ItemProduct 
                                            key={item.id} 
                                            image={item.yoast_head_json?.og_image[0]?.url} 
                                            title={item.yoast_head_json?.og_title} url={item.link} 
                                            idCate={item.categories}
                                            description={item.yoast_head_json?.og_description}
                                            idAuthor={item?.author}
                                            createdDate={item?.date}
                                        />;
                            })
                        }
                        {/* <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct />
                        <ItemProduct /> */}
                    </div>
                    {/* <Stack spacing={2} className="assadsadsad" sx={{ justifyContent: 'center', paddingTop: '20px' }}>
                        <Pagination count={10} color="primary" sx={{ justifyContent: 'center', display: 'flex' }}/>
                    </Stack> */}
                </main>
            </div>
            <RecentPosts />
        </div>
    );
};

export default HomePage;
