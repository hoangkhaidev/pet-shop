/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

// import { Pagination, Stack } from "@mui/material";
import useRouter from "utils/hooks/useRouter";
import Breadcrumbs from "views/Breadcrumbs/Breadcrumbs";
import RecentPosts from "views/News/RecentPosts";
import ItemProduct from "views/Product/ItemProduct";

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const Search = () => {
    
    const router = useRouter();

    const paramsChild = {
        name: `Search Results for "${router?.query?.key}"`,
        url: ''
    }

    const type = 'search';

    return (
        <>
            <div className="container site-content">
                <div className="content-primary">
                    <main className="site-main">
                    {/* <!-- .breadcrumbs --> */}
                        <Breadcrumbs paramsChild={paramsChild} />
                        <div className="dis-none-laptop dis-block top-product">
                            <h1>Search</h1>
                            <span>{paramsChild.name}</span>
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

export default Search;
