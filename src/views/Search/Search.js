/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import useRouter from "utils/hooks/useRouter";
import Breadcrumbs from "views/Breadcrumbs/Breadcrumbs";
import ItemProduct from "views/Product/ItemProduct";

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const PageContent = () => {
   
    const paramsChild = {
        name: 'Trang thông tin tìm kiếm',
        url: ''
    }
 
    const router = useRouter();

    console.log(router?.query?.key);

    return (
        <>
            <div id="mm-0" className="mm-page mm-slideout">
                <Breadcrumbs paramsChild={paramsChild} />
                <div className="container-fluid container-bg-w">
                    <section className="container main-bot">
                        <div className="dtotal_search">
                            <div className="main-bot-right_1">
								<h4 style={{fontSize: '18px'}}>Đã tìm thấy 243 sản phẩm phù hợp với từ khóa "{router?.query?.key}"</h4>
								<div className="d_product tr_d_product">
						            <ul>
										<li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
                                        <li>
                                            <ItemProduct />
										</li>
									</ul>
						            <div className="clear" />
					            </div>
					            <div className="clear" />
					            <div className="main-content-poser">
						            <div className="tr_phan_trang">
										<nav className="woocommerce-pagination">
                                            <ul className="page-numbers">
                                                <li><span className="page-numbers current">1</span></li>
                                                <li><a href="/trang-thong-tin-tim-kiem?key=hat&amp;trang=2" className="page-numbers">2</a></li>
                                                <li><a href="/trang-thong-tin-tim-kiem?key=hat&amp;trang=3" className="page-numbers">3</a></li>
                                                <li><a href="/trang-thong-tin-tim-kiem?key=hat&amp;trang=4" className="page-numbers">4</a></li>
                                                <li><a href="/trang-thong-tin-tim-kiem?key=hat&amp;trang=5" className="page-numbers">5</a></li>
                                                <li><a href="/trang-thong-tin-tim-kiem?key=hat&amp;trang=6" className="page-numbers">6</a></li>
                                                <li><a href="/trang-thong-tin-tim-kiem?key=hat&amp;trang=7" className="page-numbers">7</a></li>
                                                <li><a href="/trang-thong-tin-tim-kiem?key=hat&amp;trang=8" className="page-numbers">8</a></li>
                                                <li><a href="/trang-thong-tin-tim-kiem?key=hat&amp;trang=9" className="page-numbers">9</a></li>
                                                <li><a href="/trang-thong-tin-tim-kiem?key=hat&amp;trang=10" className="page-numbers">10</a></li>
                                                <li><a href="/trang-thong-tin-tim-kiem?key=hat&amp;trang=11" className="page-numbers">11</a></li>
                                                <li><a href="/trang-thong-tin-tim-kiem?key=hat&amp;trang=2" className="next page-numbers">→</a></li>
                                            </ul>
								        </nav>
								    </div>
					            </div>
				            </div>
					    </div>
	                </section>
                </div>
            </div>
        </>
    );
};

export default PageContent;
