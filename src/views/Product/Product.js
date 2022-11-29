/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ItemProduct from "./ItemProduct";
import { faChevronDown, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Collapse, List, ListItemButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const Product = () => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const [openChild, setOpenChild] = useState(false);

    const handleClickChild = () => {
        setOpenChild(!openChild);
    };

    const [openChild1, setOpenChild1] = useState(false);

    const handleClickChild1 = () => {
        setOpenChild1(!openChild1);
    };

    const [openChild2, setOpenChild2] = useState(false);

    const handleClickChild2 = () => {
        setOpenChild2(!openChild2);
    };

    const [openChild3, setOpenChild3] = useState(false);

    const handleClickChild3 = () => {
        setOpenChild3(!openChild3);
    };
    
    return (
        <>
            <div id="mm-0" className="mm-page mm-slideout">
                <div className="brecum container">
			        <div className="breadcrumbs">
                        {/* <!-- Breadcrumb NavXT 6.3.0 --> */}
                        <span property="itemListElement" typeof="ListItem">
                            <a property="item" typeof="WebPage" title="Go to PET SHOP Sài Gòn - PET STORE TP.HCM bán Thức Ăn Phụ Kiện cho Chó và Mèo Uy Tín - Chính Hãng." href="https://petshopsaigon.vn" className="home">
                                <span property="name">PET SHOP Sài Gòn - PET STORE TP.HCM bán Thức Ăn Phụ Kiện cho Chó và Mèo Uy Tín - Chính Hãng</span>
                            </a>
                            <meta property="position" content="1" />
                        </span> &gt; 
                        <span property="itemListElement" typeof="ListItem">
                            <a property="item" typeof="WebPage" title="Go to Sản phẩm." href="/danh-muc" className="post post-san-pham-archive">
                                <span property="name">Sản phẩm</span>
                            </a>
                            <meta property="position" content="2" />
                        </span> &gt; 
                        <span property="itemListElement" typeof="ListItem">
                            <a property="item" typeof="WebPage" title="Go to the Shop cho mèo Danh mục sản phẩm archives." href="/danh-muc/shop-cho-meo" className="taxonomy danh-muc">
                                <span property="name">Shop cho mèo</span>
                            </a>
                            <meta property="position" content="3" />
                        </span> &gt; 
                        <span property="itemListElement" typeof="ListItem">
                            <a property="item" typeof="WebPage" title="Go to the Đồ dùng cho mèo Danh mục sản phẩm archives." href="/danh-muc/do-dung-cho-meo" className="taxonomy danh-muc">
                                <span property="name">Đồ dùng cho mèo</span>
                            </a>
                            <meta property="position" content="4" />
                        </span> &gt; 
                        <span property="itemListElement" typeof="ListItem">
                            <span property="name">Chén ăn - Bình nước</span>
                            <meta property="position" content="5" />
                        </span>
                    </div>		
                </div>
                <div id="page" className="menu_mobile tr_mobile mm-wrapper">
		            <nav id="menu">
                        <ul>
				            <li><a href="/">Trang chủ</a></li>
				            <li><a href="/danh-muc/shop-cho-cho"><span>Shop cho chó</span></a>
                                <ul>
									<li> <a href="/danh-muc/thuc-an-cho-cho"><span>Thức ăn cho chó</span></a>
                                        <ul>
											<li> 
                                                <a href="/danh-muc/hat">
													<span>Hạt</span>
                                                </a> 
                                            </li>
											<li> 
                                                <a href="/danh-muc/pate">
												    <span>Pate</span>
                                                </a> 
                                            </li>
											<li> 
                                                <a href="/danh-muc/sua">
													<span>Sữa</span>
                                                </a> 
                                            </li>
											<li> 
                                                <a href="/danh-muc/snack-banh-thuong">
															<span>Snack bánh thưởng</span></a> 
                                            </li>
											<li> 
                                                <a href="/danh-muc/thuc-pham-chuc-nang">
												    <span>Thực phẩm chức năng</span>
                                                </a> 
                                            </li>
										</ul>
									</li>
									<li> 
                                        <a href="/danh-muc/do-dung-cho-cho">
                                            <span>Đồ dùng cho chó</span>
                                        </a>
                                        <ul>
										    <li> 
                                                <a href="/danh-muc/chen-an-binh-nuoc">
													<span>Chén ăn - Bình nước</span>
                                                </a>
                                            </li>
											<li> 
                                                <a href="/danh-muc/cham-soc-long-mong">
													<span>Chăm sóc lông móng</span>
                                                </a> 
                                            </li>
											<li> 
                                                <a href="/danh-muc/cham-soc-tai-mat-mieng">
												    <span>Chăm sóc tai mắt miệng</span>
                                                </a> 
                                            </li>
											<li> 
                                                <a href="/danh-muc/sua-tam-nuoc-hoa">
													<span>Sữa tắm - Nước hoa</span>
                                                </a> 
                                            </li>
											<li> 
                                                <a href="/danh-muc/ho-tro-huan-luyen">
													<span>Hỗ trợ huấn luyện</span>
                                                </a> 
                                            </li>
											<li> 
                                                <a href="/danh-muc/khay-ve-sinh-do-dung-cho-cho">
													<span>Khay vệ sinh</span>
                                                </a> 
                                            </li>
										</ul>
                                    </li>
									<li> 
                                        <a href="/danh-muc/do-choi-cho-cho">
                                            <span>Đồ chơi cho chó</span>
                                        </a>
                                        <ul>
											<li> 
                                                <a href="/danh-muc/xa-stress">
												    <span>Xả stress</span>
                                                </a> 
                                            </li>
											<li> 
                                                <a href="/danh-muc/cai-thien-rang-mieng">
													<span>Cải thiện răng miệng</span>
                                                </a> 
                                            </li>
                                            <li> <a href="/danh-muc/thuc-day-van-dong">
                                                    <span>Thúc đẩy vận động</span></a> </li>
                                            <li> <a href="/danh-muc/kich-thich-tri-nao">
                                                    <span>Kích thích trí não</span></a> </li>
                                            <li> <a href="/danh-muc/do-choi-tuong-tac">
                                                    <span>Đồ chơi tương tác</span></a> </li>
                                            <li> <a href="/danh-muc/do-choi-cong-nghe">
                                                    <span>Đồ chơi công nghệ</span></a> </li>
										</ul>

									</li>
									<li> 
                                        <a href="/danh-muc/phu-kien-cho-cho"><span>Phụ kiện cho chó</span></a>
                                        <ul>
                                            <li> <a href="/danh-muc/vong-co">
                                                    <span>Vòng cổ</span></a> </li>
                                            <li> <a href="/danh-muc/day-dat">
                                                    <span>Dây dắt</span></a> </li>
                                            <li> <a href="/danh-muc/yem">
                                                    <span>Yếm</span></a> </li>
                                            <li> <a href="/danh-muc/ro-mom">
                                                    <span>Rọ mõm</span></a> </li>
                                            <li> <a href="/danh-muc/phu-kien-thoi-trang">
                                                    <span>Quần áo</span></a> </li>
										</ul>
                                    </li>
									<li> 
                                        <a href="/danh-muc/chuong-long-cho-cho"><span>Chuồng lồng cho chó</span></a>
                                        <ul>
											<li> 
                                                <a href="/danh-muc/chuong-o-nem">
												    <span>Chuồng - Ổ - Nệm</span>
                                                </a> 
                                            </li>
											<li> 
                                                <a href="/danh-muc/tui-van-chuyen">
													<span>Túi vận chuyển</span>
                                                </a> 
                                            </li>
										</ul>
                                    </li>
								    <li> 
                                        <a href="/danh-muc/chuong-long-cho-cho">
										    <span>Hãng sản xuất </span>
                                        </a>
									    <ul>
                                            <li>
												<a href="/hang-san-xuat/anf">ANF</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/beaphar">Beaphar</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/catsrang">Catsrang</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/ciao">Ciao</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/ferplast">Ferplast</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/furminator">Furminator</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/kong">Kong</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/mon-ami">Mon Ami</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/monge">Monge</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/nekko">Nekko</a>
                                            </li>
									    </ul>
								    </li>
							    </ul>
					        </li>
					        <li>
						        <a href="/danh-muc/shop-cho-meo"><span>Shop cho mèo</span></a>
							    <ul>
									<li> 
                                        <a href="/danh-muc/thuc-an-cho-meo"><span>Thức ăn cho mèo</span></a>
										<ul>
											<li> <a href="/danh-muc/hat-thuc-an-cho-meo"><span>Hạt</span></a> </li>
                                            <li> <a href="/danh-muc/pate-thuc-an-cho-meo">
                                                    <span>Pate</span></a> </li>
                                            <li> <a href="/danh-muc/sua-thuc-an-cho-meo">
                                                    <span>Sữa</span></a> </li>
                                            <li> <a href="/danh-muc/snack-banh-thuong-thuc-an-cho-meo">
                                                    <span>Snack bánh thưởng</span></a> </li>
                                            <li> <a href="/danh-muc/thuc-pham-chuc-nang-thuc-an-cho-meo">
                                                    <span>Thực phẩm chức năng</span></a> </li>
										</ul>
                                    </li>
									<li> 
                                        <a href="/danh-muc/do-dung-cho-meo"><span>Đồ dùng cho mèo</span></a>
                                        <ul>
                                            <li> <a href="/danh-muc/cat-ve-sinh">
                                                    <span>Cát vệ sinh</span></a> </li>
                                            <li> <a href="/danh-muc/khay-ve-sinh">
                                                    <span>Khay vệ sinh</span></a> </li>
                                            <li> <a href="/danh-muc/do-cao-mong">
                                                    <span>Đồ cào móng</span></a> </li>
                                            <li> <a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo">
                                                    <span>Chén ăn - Bình nước</span></a> </li>
                                            <li> <a href="/danh-muc/cham-soc-long-mong-do-dung-cho-meo">
                                                    <span>Chăm sóc lông móng</span></a> </li>
                                            <li> <a href="/danh-muc/cham-soc-tai-mat-mieng-do-dung-cho-meo">
                                                    <span>Chăm sóc tai mắt miệng</span></a> </li>
                                            <li> <a href="/danh-muc/sua-tam-nuoc-hoa-do-dung-cho-meo">
                                                    <span>Sữa tắm - Nước hoa</span></a> </li>
                                            <li> <a href="/danh-muc/ho-tro-huan-luyen-do-dung-cho-meo">
                                                    <span>Hỗ trợ huấn luyện</span></a> </li>
										</ul>
                                    </li>
									<li> 
                                        <a href="/danh-muc/do-choi-cho-meo"><span>Đồ chơi cho mèo</span></a>
                                        <ul>
                                            <li> <a href="/danh-muc/xa-stress-do-choi-cho-meo">
                                                    <span>Xả stress</span></a> </li>
                                            <li> <a href="/danh-muc/kich-thich-tri-nao-do-choi-cho-meo">
                                                    <span>Kích thích trí não</span></a> </li>
                                            <li> <a href="/danh-muc/do-choi-tuong-tac-do-choi-cho-meo">
                                                    <span>Đồ chơi tương tác</span></a> </li>
                                            <li> <a href="/danh-muc/do-choi-cong-nghe-do-choi-cho-meo">
                                                    <span>Đồ chơi công nghệ</span></a> </li>
										</ul>
                                    </li>
									<li> 
                                        <a href="/danh-muc/phu-kien-cho-meo"><span>Phụ kiện cho mèo</span></a>
                                        <ul>
											<li> <a href="/danh-muc/vong-co-phu-kien-cho-meo">
															<span>Vòng cổ</span></a> </li>
											<li> <a href="/danh-muc/phu-kien-thoi-trang-phu-kien-cho-meo">
															<span>Quần áo</span></a> </li>
										</ul>
                                    </li>
									<li> 
                                        <a href="/danh-muc/chuong-long-cho-meo"><span>Chuồng lồng cho mèo</span></a>
                                        <ul>
										    <li> <a href="/danh-muc/chuong-o-nem-chuong-long-cho-meo">
															<span>Chuồng - Ổ - Nệm</span></a> </li>
											<li> <a href="/danh-muc/tui-van-chuyen-chuong-long-cho-meo">
															<span>Túi vận chuyển</span></a> </li>
										</ul>
                                    </li>
								    <li> 
                                        <a href="/danh-muc/chuong-long-cho-meo">
										    <span>Hãng sản xuất </span>
                                        </a>
									    <ul>
                                            <li>
                                                <a href="/hang-san-xuat/anf">ANF</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/beaphar">Beaphar</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/catsrang">Catsrang</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/ciao">Ciao</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/ferplast">
                                                    Ferplast</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/furminator">
                                                    Furminator</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/kong">
                                                    Kong</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/mon-ami">
                                                    Mon Ami	</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/monge">
                                                    Monge</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/nekko">
                                                    Nekko</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/pawise">
                                                    Pawise</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/pugmarks">
                                                    Pugmarks</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/royal-canin">
                                                    Royal Canin</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/sanicat">
                                                    Sanicat</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/thuong-hieu-khac">
                                                    Thương hiệu khác</a>
                                            </li>
                                            <li>
                                                <a href="/hang-san-xuat/virbac">
                                                    Virbac</a>
                                            </li>
									    </ul>
								    </li>
							    </ul>
					        </li>
					        <li>
						        <a href="/danh-muc/shop-thu-y"><span>Shop Thú Y</span></a>
							    <ul>
									<li> 
                                        <a href="/danh-muc/cham-soc-rang-mieng"><span>Chăm sóc răng miệng</span></a>
                                        <ul>
										    <li> <a href="/danh-muc/lam-sach-rang">
															<span>Làm sạch răng</span></a> </li>
											<li> <a href="/danh-muc/loai-bo-cao-rang">
															<span>Loại bỏ cao răng</span></a> </li>
											<li> <a href="/danh-muc/di-ung">
															<span>Dị ứng</span></a> </li>
										</ul>
                                    </li>
									<li> 
                                        <a href="/danh-muc/thay-doi-hanh-vi"><span>Thay đổi hành vi</span></a>
                                        <ul>
										    <li> <a href="/danh-muc/di-ve-sinh-dung-cho">
															<span>Đi vệ sinh đúng chỗ</span></a> </li>
                                            <li> <a href="/danh-muc/chong-pha-do">
                                                    <span>Chống phá đồ</span></a> </li>
                                            <li> <a href="/danh-muc/chong-dong-duc">
                                                    <span>Chống động dục</span></a> </li>
										</ul>
                                    </li>
								    <li> 
                                        <a href="/danh-muc/thay-doi-hanh-vi">
										    <span>Hãng sản xuất </span></a>
									    <ul>
                                            <li>
												<a href="/hang-san-xuat/anf">ANF</a>
											</li>
											<li>
                                                <a href="/hang-san-xuat/beaphar">Beaphar</a>
                                            </li>
									    </ul>
								    </li>
							    </ul>
					        </li>
						    <li className="has-sub">
						        <a href="/nhom-tin/blog-cho">Chó</a> 			
						        <ul>
                                    <li>
                                        <a href="/nhom-tin/dinh-duong-cho">Dinh dưỡng chó</a>
                                    </li>
                                    <li>
                                        <a href="/nhom-tin/cham-soc-cho">Chăm sóc chó</a>
                                    </li>
                                    <li>
                                        <a href="/nhom-tin/suc-khoe-cho">Sức khỏe chó</a>
                                    </li>
                                    <li>
                                        <a href="/nhom-tin/phoi-giong-cho">Phối giống chó</a>
                                    </li>
                                    <li>
                                        <a href="/nhom-tin/hanh-vi-cho">Hành vi chó</a>
                                    </li>				
						        </ul>				
						    </li>
						    <li className="has-sub">
						        <a href="/nhom-tin/blog-meo">	Mèo</a> 			
						        <ul>
                                    <li>
                                        <a href="/nhom-tin/dinh-duong-meo">Dinh dưỡng mèo</a>
                                    </li>
                                    <li>
                                        <a href="/nhom-tin/cham-soc-meo">Chăm sóc mèo</a>
                                    </li>
                                    <li>
                                        <a href="/nhom-tin/suc-khoe-meo">Sức khỏe mèo</a>
                                    </li>
                                    <li>
                                        <a href="/nhom-tin/phoi-giong-meo">Phối giống mèo</a>
                                    </li>
                                    <li>
                                        <a href="/nhom-tin/hanh-vi-meo">Hành vi mèo</a>
                                    </li>				
						        </ul>				
						    </li>				
                            <li className="level0 parent ">
                                <a href="/lien-he">
                                    <span>Liên hệ</span>
                                </a>
                            </li>
			            </ul>
                    </nav>
	            </div>
                <div className="clear" />
                <div className="container">
                    <div id="layoutGroup3" className="sortable">
                        <div id="module_categories" className="tr_col_left block tr_category">
                            <h4>Danh mục </h4>
                            <div className="blockcontent ">
			                    <ul>
				                    <li className="">
                                        <a href="/danh-muc/cat-ve-sinh">Cát vệ sinh	</a>
                                    </li>
                                    <li className="">
                                        <a href="/danh-muc/khay-ve-sinh">Khay vệ sinh</a>
                                    </li>
                                    <li className="">
                                        <a href="/danh-muc/do-cao-mong">Đồ cào móng</a>
                                    </li>
                                    <li className="">
                                        <a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo">Chén ăn - Bình Nước</a>
                                    </li>
                                    <li className="">
                                        <a href="/danh-muc/cham-soc-long-mong-do-dung-cho-meo">Chăm sóc lông móng</a>
                                    </li>
                                    <li className="">
                                        <a href="/danh-muc/cham-soc-tai-mat-mieng-do-dung-cho-meo">Chăm sóc tai mắt miệng</a>
                                    </li>
                                    <li className="">
                                        <a href="/danh-muc/sua-tam-nuoc-hoa-do-dung-cho-meo">Sữa tắm - Nước hoa</a>
                                    </li>
                                    <li className="">
                                        <a href="/danh-muc/ho-tro-huan-luyen-do-dung-cho-meo">Hỗ trợ huấn luyện		</a>
                                    </li>
                                </ul>
		                    </div>
	                    </div>
                    </div>			
                    <div id="layoutGroup4" className="sortable">
				        <div id="module_listproducts" className="block">
					        <h1 className="tr_tieu_de">Chén ăn - Bình nước</h1>
					        <div className="tr_mobile umt_m_filter">
	                            <div className="umt_filter_title" style={{ display: 'flex', alignItems: 'center'}}>
                                    {/* <i className="fas fa-filter" /> */}
                                    <FontAwesomeIcon
                                        icon={faFilter}
                                        size={'1x'}
                                        style={{ cursor: 'pointer', marginRight: '5px' }} 
                                    /> Bộ lọc
                                    <ListItemButton 
                                        onClick={handleClick} 
                                        className='sadsasadsadsadsadsadsad'
                                        sx={{
                                            background: 'none',
                                            flexGrow: 'unset',
                                            color: '#fff',
                                            marginLeft: 'auto',
                                            '&:hover': {
                                                background: 'none !important',
                                                color: '#fff',
                                            },
                                            '&:active': {
                                                background: 'none !important',
                                                color: '#fff',
                                            },
                                        }}
                                    >
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                </div>
                                
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <div style={{marginTop: '10px'}} id="module_categories" className="tr_col_left block tr_category">
                                            <h4 style={{display: 'flex'}}>
                                                Danh mục 
                                                <ListItemButton 
                                                    onClick={handleClickChild} 
                                                    className='sadsasadsadsadsadsadsad'
                                                    sx={{
                                                        background: 'none',
                                                        flexGrow: 'unset',
                                                        color: '#fff',
                                                        marginLeft: 'auto',
                                                        '&:hover': {
                                                            background: 'none !important',
                                                            color: '#fff',
                                                        },
                                                        '&:active': {
                                                            background: 'none !important',
                                                            color: '#fff',
                                                        },
                                                    }}
                                                >
                                                    {openChild ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                            </h4>
                                            <Collapse in={openChild} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <div className="blockcontent">
                                                        <ul>
                                                            <li className="">
                                                                <a href="/danh-muc/cat-ve-sinh">Cát vệ sinh</a>
                                                            </li>
                                                            <li className="">
                                                                <a href="/danh-muc/khay-ve-sinh">Khay vệ sinh</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </List>
                                            </Collapse>
                                        </div>

                                        <div style={{marginTop: '10px'}} id="module_categories" className="tr_col_left block tr_category">
                                            <h4 style={{display: 'flex'}}>
                                                Nhóm Giá 
                                                <ListItemButton 
                                                    onClick={handleClickChild1} 
                                                    className='sadsasadsadsadsadsadsad'
                                                    sx={{
                                                        background: 'none',
                                                        flexGrow: 'unset',
                                                        color: '#fff',
                                                        marginLeft: 'auto',
                                                        '&:hover': {
                                                            background: 'none !important',
                                                            color: '#fff',
                                                        },
                                                        '&:active': {
                                                            background: 'none !important',
                                                            color: '#fff',
                                                        },
                                                    }}
                                                >
                                                    {openChild1 ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                            </h4>
                                            <Collapse in={openChild1} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <div className="blockcontent">
                                                        <ul className="tr_scrool_x">
                                                            <li><a href="?nhom-gia=191">Dưới 100,000đ</a></li>
                                                            <li><a href="?nhom-gia=192">100,000đ - 500,000đ</a></li>
                                                            <li><a href="?nhom-gia=193">500,000d - 1,000,000đ</a></li>
                                                            <li><a href="?nhom-gia=194">1,000,000đ - 2,000,000đ</a></li>
                                                            <li><a href="?nhom-gia=195">Trên 2,000,000đ</a></li>
                                                        </ul>
                                                        <div className="clear" />
                                                    </div>
                                                </List>
                                            </Collapse>
                                        </div>
                                        <div style={{marginTop: '10px'}} id="module_categories" className="tr_col_left block tr_category">
                                            <h4 style={{display: 'flex'}}>
                                                Thương hiệu 
                                                <ListItemButton 
                                                    onClick={handleClickChild2} 
                                                    className='sadsasadsadsadsadsadsad'
                                                    sx={{
                                                        background: 'none',
                                                        flexGrow: 'unset',
                                                        color: '#fff',
                                                        marginLeft: 'auto',
                                                        '&:hover': {
                                                            background: 'none !important',
                                                            color: '#fff',
                                                        },
                                                        '&:active': {
                                                            background: 'none !important',
                                                            color: '#fff',
                                                        },
                                                    }}
                                                >
                                                    {openChild2 ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                            </h4>
                                            <Collapse in={openChild2} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <div className="blockcontent">
                                                        <ul className="tr_scrool_x">
                                                            <li>
                                                                <a href="?hang-san-xuat=323">03Vit</a>
                                                            </li>
                                                            <li>
                                                                <a href="?hang-san-xuat=128">8 in 1</a>
                                                            </li>
                                                            <li>
                                                                <a href="?hang-san-xuat=352">A-Pro</a>
                                                            </li>
                                                        </ul>
                                                        <div className="clear" />
                                                    </div>
                                                </List>
                                            </Collapse>
                                        </div>
                                        <div style={{marginTop: '10px'}} id="module_categories" className="tr_col_left block tr_category">
                                            <h4 style={{display: 'flex'}}>
                                                Nhóm sản phẩm 
                                                <ListItemButton 
                                                    onClick={handleClickChild3} 
                                                    className='sadsasadsadsadsadsadsad'
                                                    sx={{
                                                        background: 'none',
                                                        flexGrow: 'unset',
                                                        color: '#fff',
                                                        marginLeft: 'auto',
                                                        '&:hover': {
                                                            background: 'none !important',
                                                            color: '#fff',
                                                        },
                                                        '&:active': {
                                                            background: 'none !important',
                                                            color: '#fff',
                                                        },
                                                    }}
                                                >
                                                    {openChild3 ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                            </h4>
                                            <Collapse in={openChild3} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <div className="blockcontent">
                                                        <ul>
                                                            <li>
                                                                <a href="?loai-san-pham=250">Bác sĩ khuyên dùng</a>
                                                            </li>
                                                            <li>
                                                                <a href="?loai-san-pham=109">Đang khuyến mãi</a>
                                                            </li>
                                                            <li>
                                                                <a href="?loai-san-pham=108">Mới nhất</a>
                                                            </li>
                                                            <li>
                                                                <a href="?loai-san-pham=107">Sản phẩm bán chạy</a>
                                                            </li>
                                                            <li>
                                                                <a href="?loai-san-pham=260">Sản phẩm hiếm</a>
                                                            </li>
                                                        </ul>
                                                        <div className="clear" />
                                                    </div>
                                                </List>
                                            </Collapse>
                                        </div>
                                    </List>
                                </Collapse>
                            </div>
                            <div className="pagesright">
                                <div className="tr_pc">
                                    <div className="dtotal_filter">
                                        <div className="filter_block_item">
                                            <div className="filter_block_item_title">Nhóm giá
                                                <FontAwesomeIcon
                                                    icon={faChevronDown}
                                                    size={'1x'}
                                                    style={{ cursor: 'pointer', marginLeft: '5px', fontSize: '9px', marginBottom: '2px' }} 
                                                />
                                            </div>
                                            <ul className="filter_block_select">
                                                <li><a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?nhom-gia=191">Dưới 100,000đ</a></li>
                                                <li><a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?nhom-gia=192">100,000đ - 500,000đ</a></li>
                                                <li><a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?nhom-gia=193">500,000d - 1,000,000đ</a></li>
                                                <li><a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?nhom-gia=194">1,000,000đ - 2,000,000đ</a></li>
                                                <li><a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?nhom-gia=195">Trên 2,000,000đ</a></li>
                                            </ul>
                                        </div>
                                        <div className="filter_block_item">
                                            <div className="filter_block_item_title">Thương hiệu
                                                <FontAwesomeIcon
                                                    icon={faChevronDown}
                                                    size={'1x'}
                                                    style={{ cursor: 'pointer', marginLeft: '5px', fontSize: '9px', marginBottom: '2px' }} 
                                                />
                                            </div>
                                            <ul className="filter_block_select">
                                                <li>
                                                    <a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?hang-san-xuat=323">03Vit</a>
                                                </li>
                                                <li>
                                                    <a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?hang-san-xuat=128">8 in 1</a>
                                                </li>
                                                <li>
                                                    <a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?hang-san-xuat=352">A-Pro</a>
                                                </li>
                                                <li>
                                                    <a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?hang-san-xuat=249">Aatas</a>
                                                </li>
                                                <li>
                                                    <a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?hang-san-xuat=289">AG-Science</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="filter_block_item">
                                            <div className="filter_block_item_title">Nhóm sản phẩm
                                                <FontAwesomeIcon
                                                    icon={faChevronDown}
                                                    size={'1x'}
                                                    style={{ cursor: 'pointer', marginLeft: '5px', fontSize: '9px', marginBottom: '2px' }} 
                                                />
                                            </div>
                                            <ul className="filter_block_select">
                                                <li>
                                                    <a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?loai-san-pham=250">Bác sĩ khuyên dùng</a>
                                                </li>
                                                <li>
                                                    <a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?loai-san-pham=109">Đang khuyến mãi</a>
                                                </li>
                                                <li>
                                                    <a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?loai-san-pham=108">Mới nhất</a>
                                                </li>
                                                <li>
                                                    <a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?loai-san-pham=107">Sản phẩm bán chạy</a>
                                                </li>
                                                <li>
                                                    <a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?loai-san-pham=260">Sản phẩm hiếm</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="sorts">
                                    Xem theo : &nbsp;&nbsp;&nbsp;
                                    <select name="item_order" id="order">
                                        <option value="0" selected="selected">Mới trước cũ sau</option>
                                        <option value="1">Cũ trước mới sau</option>
                                        <option value="2">Giá từ thấp tới cao</option>
                                        <option value="3">Giá từ cao đến thấp</option>
                                    </select>
                                </div>
                                <div className="clear" />
                            </div>
                            <div className="blockcontent">
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
                                </div>
                            </div>
                            <div className="clear">&nbsp;</div>
                            <div className="tr_phan_trang">
                                <nav className="woocommerce-pagination">
                                    <ul className="page-numbers">
                                        <li><span className="page-numbers current">1</span></li>
                                        <li><a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?list=check&amp;ordering=&amp;page=2" className="page-numbers">2</a></li>
                                        <li><a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?list=check&amp;ordering=&amp;page=3" className="page-numbers">3</a></li>
                                        <li><a href="#" className="page-numbers">...</a></li>
                                        <li><a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?list=check&amp;ordering=&amp;page=3" className="page-numbers">3</a></li>
                                        <li><a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?list=check&amp;ordering=&amp;page=4" className="page-numbers">4</a></li>
                                        <li><a href="/danh-muc/chen-an-binh-nuoc-do-dung-cho-meo?list=check&amp;ordering=&amp;page=2" className="next page-numbers">→</a></li>
                                    </ul>
                                    <div className="clear" />
                                </nav>
                            </div>
                            <div className="clear" />
                            <div className="clear" />
                            <div className="clear" />
                            <div className="tr_tip">
                                <p>&nbsp;</p>
                                <div id="eJOY__extension_root" className="eJOY__extension_root_class" style={{all: 'unset'}} />
                            </div>
				        </div>
			        </div>
		        </div>
                <div className="clear" />
            </div>
        </>
    );
};

export default Product;
