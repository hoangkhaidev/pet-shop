/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
// import { Pagination, Stack } from "@mui/material";
import ItemProduct from "./ItemProduct";
import Breadcrumbs from "views/Breadcrumbs/Breadcrumbs";
import RecentPosts from "views/News/RecentPosts";

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const Product = () => {
    const paramsChild = {
        name: 'Chicago Bulls',
        params: ''
    }

    const type = 'product';
    
    return (
        <>
            <div className="container site-content">
                <div className="content-primary">
                    <main className="site-main">
                    {/* <!-- .breadcrumbs --> */}
                        <Breadcrumbs paramsChild={paramsChild} />
                        <div className="dis-none-laptop dis-block top-product">
                            <h1>{paramsChild.name}</h1>
                            <span>Read 10 posts from {paramsChild.name}</span>
                        </div>
                        <div className="recent-content">
                            <ItemProduct type={type} />
                            <ItemProduct type={type} />
                            <ItemProduct type={type} />
                            <ItemProduct type={type} />
                            <ItemProduct type={type} />
                            <ItemProduct type={type} />
                            <ItemProduct type={type} />
                            <ItemProduct type={type} />
                            <ItemProduct type={type} />
                            <ItemProduct type={type} />
                            <ItemProduct type={type} />
                        </div>
                        {/* <Stack spacing={2} className="assadsadsad" sx={{ justifyContent: 'center', paddingTop: '20px' }}>
                            <Pagination count={10} color="primary" sx={{ justifyContent: 'center', display: 'flex' }}/>
                        </Stack> */}
                    </main>
                </div>
                <RecentPosts />
            </div>
        </>
    );
};

export default Product;
