/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

// material-ui
import './style.scss';
// ==============================|| MAIN LAYOUT ||============================== //
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import SideBar from 'views/Sidebar';
import Navbar from 'views/Navbar';
import Login from 'views/Account/Login';

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <header>
                <div className="header-container">
                    <div className="header-top tr_none">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-4 col-xs-7">
                                    <div className="welcome-msg hidden-xs">
                                        <h5>Chào mừng bạn đã đến với HỘ KINH DOANH THÚ CƯNG SÀI GÒN! </h5>
                                    </div>
                                </div>
                                <div className="col-sm-8 col-xs-12">
                                    <div className="row">
                                        <div className="toplinks">
                                            <div className="links">
                                                <div>
                                                    <span className="">
                                                        {/* <a href="/login" id="customer_login_link"></a> */}
                                                        <Login title="Đăng nhập" />
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="">
                                                        <a href="/register" id="customer_register_link">Đăng ký</a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="d_header_top_v2 d_flex">
                            <div className="umt_logo">
                                <a href="/">
                                    <img src="https://petshopsaigon.vn/wp-content/uploads/2018/01/new-logo.png" alt="" />
                                </a>
                            </div>
                            <div className="pro_contact_item tr_mobile">
                                <div className="pro_contact_item">
                                    <div className="contact_item_txt">
                                        <ul>
                                            <li>Bán lẻ: <a href="tel: 0707760796">0707.76.07.96</a></li>
                                            <li>Bán sỉ: <a href="tel: 0976299155">0976.29.91.55</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="umt_search tr_pc">
                                <form action="/trang-thong-tin-tim-kiem" method="get">
                                    <div className="header_search d_flex">
                                        <div className="hsearch_input">
                                            <input name="key" placeholder="Nhập nội dung tìm kiếm" />
                                        </div>
                                        <div className="hsearch_btn">
                                            <button className="input_search" type="submit" style={{ border: 'none', background: 'none' }}>
                                                <FontAwesomeIcon
                                                    icon={faSearch}
                                                    size={'1x'}
                                                    style={{ cursor: 'pointer' }} />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="umt_twice_head d_flex">
                                <div className="umt_twice_head_block">
                                    <div className="twice_head_title"><a href="tel:0903380793">0903380793</a></div>
                                    <div className="twice_head_txt">Hotline bán hàng</div>
                                </div>
                                <div className="umt_twice_head_block">
                                    <div className="twice_head_title">Mua hàng</div>
                                    <div className="twice_head_txt">Thời gian 8h00-21h30</div>
                                </div>
                                <div className="umt_twice_head_block">
                                    <div className="twice_head_title">Giao hàng toàn quốc</div>
                                    <div className="twice_head_txt">Nhận hàng 2-4 ngày</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <nav id="myHeader">
                <div className="nav-menu">
                    <div className="nav-inner">
                        <ul id="nav" className="hidden-xs hidden-sm">
                            <div className="side-nav-categories tr_none">
                                <div className="spverticalmenu">
                                    <div className="block-title">Danh mục sản phẩm</div>
                                </div>
                                <div className="box-content box-category">
                                    <ul id="left-menu">
                                        <li className="lv0 open ">
                                            <a className="lv0" href="/danh-muc/shop-cho-cho">
                                                <span className="child-title">Shop cho chó</span>
                                            </a>
                                            <ul className="lv1">
                                                <li className="lv1 open">
                                                    <a className="lv1" href="/danh-muc/thuc-an-cho-cho">
                                                        <span className="lv1-title">Thức ăn cho chó</span>
                                                    </a>
                                                    <ul className="lv2">
                                                        <li className="lv2">
                                                            <a className="lv2" href="/danh-muc/hat">
                                                                <span>Hạt</span>
                                                            </a>
                                                        </li>
                                                        <li className="lv2">
                                                            <a className="lv2" href="/danh-muc/pate">
                                                                <span>Pate</span>
                                                            </a>
                                                        </li>
                                                        <li className="lv2">
                                                            <a className="lv2" href="/danh-muc/sua">
                                                                <span>Sữa</span>
                                                            </a>
                                                        </li>
                                                        <li className="lv2">
                                                            <a className="lv2" href="/danh-muc/snack-banh-thuong">
                                                                <span>Snack bánh thưởng</span>
                                                            </a>
                                                        </li>
                                                        <li className="lv2">
                                                            <a className="lv2" href="/danh-muc/thuc-pham-chuc-nang">
                                                                <span>Thực phẩm chức năng</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="lv1 open">
                                                    <a className="lv1" href="/danh-muc/do-dung-cho-cho">
                                                        <span className="lv1-title">Đồ dùng cho chó</span>
                                                    </a>
                                                    <ul className="lv2">
                                                        <li className="lv2">
                                                            <a className="lv2" href="/danh-muc/chen-an-binh-nuoc">
                                                                <span>Chén ăn - Bình nước</span>
                                                            </a>
                                                        </li>
                                                        <li className="lv2">
                                                            <a className="lv2" href="/danh-muc/cham-soc-long-mong">
                                                                <span>Chăm sóc lông móng</span>
                                                            </a> 
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="lv1 open">
                                                    <a className="lv1" href="/danh-muc/do-choi-cho-cho">
                                                        <span className="lv1-title">Đồ chơi cho chó</span>
                                                    </a>
                                                    <ul className="lv2">
                                                        <li className="lv2">
                                                            <a className="lv2" href="/danh-muc/xa-stress">
                                                                <span>Xả stress</span>
                                                            </a> 
                                                        </li>
                                                        <li className="lv2">
                                                            <a className="lv2" href="/danh-muc/cai-thien-rang-mieng">
                                                                <span>Cải thiện răng miệng</span>
                                                            </a> 
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="lv0 open ">
                                            <a className="lv0" href="/danh-muc/shop-cho-meo">
                                                <span className="child-title">Shop cho mèo</span>
                                            </a>
                                            <ul className="lv1">
                                                <li className="lv1 open">
                                                    <a className="lv1" href="/danh-muc/thuc-an-cho-meo">
                                                        <span className="lv1-title">Thức ăn cho mèo</span>
                                                    </a>
                                                    <ul className="lv2">
                                                        <li className="lv2">
                                                            <a className="lv2" href="/danh-muc/hat-thuc-an-cho-meo">
                                                                <span>Hạt</span>
                                                            </a> 
                                                        </li>
                                                        <li className="lv2">
                                                            <a className="lv2" href="/danh-muc/pate-thuc-an-cho-meo">
                                                                <span>Pate</span>
                                                            </a> 
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="lv1 open">
                                                    <a className="lv1" href="/danh-muc/do-dung-cho-meo">
                                                        <span className="lv1-title">Đồ dùng cho mèo</span>
                                                    </a>
                                                    <ul className="lv2">
                                                        <li className="lv2">
                                                            <a className="lv2" href="/danh-muc/cat-ve-sinh">
                                                                <span>Cát vệ sinh</span>
                                                            </a> 
                                                        </li>
                                                        <li className="lv2">
                                                            <a className="lv2" href="/danh-muc/khay-ve-sinh">
                                                                <span>Khay vệ sinh</span>
                                                            </a> 
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <div style={{ clear: 'both' }} />
                                    </ul>
                                </div>
                            </div>
                            <li className="level0 parent active">
                                <a href="/">
                                    <span>Trang chủ</span>
                                </a>
                            </li>
                            <li className="level0 parent drop-menu test2  drop-menu1">
                                <div className="menu-img-icon">
                                    <img src="https://petshopsaigon.vn/wp-content/themes/template/css/assets/new-icon.png" alt="new-icon.png" />
                                </div>
                                <a href="/danh-muc/shop-cho-cho">
                                    <span>Shop cho chó</span>
                                </a>
                                <div className="level0-wrapper dropdown-6col" style={{ display: 'none', left: '0px' }}>
                                    <div className="level0-wrapper2 level0-wrapper3">
                                        <div className="nav-block nav-block-center">
                                            <ul className="level0">
                                                <li className="level1 parent item"> 
                                                    <a className="lv1" href="/danh-muc/thuc-an-cho-cho">
                                                        <span>Thức ăn cho chó</span>
                                                    </a>
                                                    <ul className="level1 lv1-mega right-sub" style={{ top: '0px', left: '165px', display: 'none', }}>
                                                        <li className="level2"> 
                                                            <a className="lv2" href="/danh-muc/hat">
                                                                <span>Hạt</span>
                                                            </a> 
                                                        </li>
                                                        <li className="level2"> 
                                                            <a className="lv2" href="/danh-muc/pate">
                                                                <span>Pate</span>
                                                            </a> 
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="level1 parent item"> 
                                                    <a className="lv1" href="/danh-muc/do-dung-cho-cho">
                                                        <span>Đồ dùng cho chó</span>
                                                    </a>
                                                    <ul className="level1 lv1-mega">
                                                        <li className="level2"> 
                                                            <a className="lv2" href="/danh-muc/chen-an-binh-nuoc">
                                                                <span>Chén ăn - Bình nước</span>
                                                            </a> 
                                                        </li>
                                                        <li className="level2"> 
                                                            <a className="lv2" href="/danh-muc/cham-soc-long-mong">
                                                                <span>Chăm sóc lông móng</span>
                                                            </a> 
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="level0 parent drop-menu test2  drop-menu1">
                                <div className="menu-img-icon">
                                    <img src="https://petshopsaigon.vn/wp-content/themes/template/css/assets/new-icon.png" alt="new-icon.png" />
                                </div>
                                <a href="/danh-muc/shop-cho-meo">
                                    <span>Shop cho mèo</span>
                                </a>
                                <div className="level0-wrapper dropdown-6col" style={{ display: 'none', left: '0px' }}>
                                    <div className="level0-wrapper2 level0-wrapper3">
                                        <div className="nav-block nav-block-center">
                                            <ul className="level0">
                                                <li className="level1 parent item">
                                                    <a className="lv1" href="/danh-muc/thuc-an-cho-meo">
                                                        <span>Thức ăn cho mèo</span>
                                                    </a>
                                                    <ul className="level1 lv1-mega right-sub" style={{ top: '0px', left: '165px', display: 'none' }}>
                                                        <li className="level2"> 
                                                            <a className="lv2" href={'https://petshopsaigon.vn/danh-muc/hat-thuc-an-cho-meo'}>
                                                                <span>Hạt</span>
                                                            </a> 
                                                        </li>
                                                        <li className="level2"> 
                                                            <a className="lv2" href={'https://petshopsaigon.vn/danh-muc/pate-thuc-an-cho-meo'}>
                                                                <span>Pate</span>
                                                            </a> 
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="level1 parent item"> 
                                                    <a className="lv1" href="/danh-muc/do-dung-cho-meo">
                                                        <span>Đồ dùng cho mèo</span>
                                                    </a>
                                                    <ul className="level1 lv1-mega right-sub" style={{top: '0px', left: '165px', display: 'none'}}>
                                                        <li className="level2"> 
                                                            <a className="lv2" href="/danh-muc/cat-ve-sinh">
                                                                <span>Cát vệ sinh</span>
                                                            </a> 
                                                        </li>
                                                        <li className="level2"> 
                                                            <a className="lv2" href="/danh-muc/khay-ve-sinh">
                                                                <span>Khay vệ sinh</span>
                                                            </a> 
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="level0 parent">
                                <a href="/dich-vu-cham-soc-thu-cung">
                                    <span>Dịch vụ spa</span>
                                </a>
                            </li>
                            <li className="level0 parent ">
                                <a href="/lien-he">
                                    <span>Liên hệ</span>
                                </a>
                            </li>
                        </ul>
                        <div className="toplinks">
                            <div className="links">
                                <div>
                                    <span className="">
                                        {/* <a href="/trang-dang-nhap-2" id="customer_login_link">Đăng nhập</a> */}
                                        <Login title="Đăng nhập" />
                                    </span>
                                </div>
                                <div>
                                    <span className="">
                                        <a href="/dang-ky" id="customer_register_link">Đăng ký</a>
                                    </span>
                                </div>
                            </div>
                        </div>    
                        <div className="pull-right menu-img">
                            <div className="top-cart-contain">
                                <div className="mini-cart">
                                    <div className="basket dropdown-toggle">
                                        <a href="/trang-gio-hang">
                                            <div className="content-icon-cart">
                                                <img src="https://petshopsaigon.vn/wp-content/themes/template/css/assets/icon-cart.png" alt="icon-cart" className="cl-block" style={{width:'20px'}} />
                                                <img src="https://petshopsaigon.vn/wp-content/themes/template/css/assets/icon-cart-2.png" alt="icon-cart-2" className="cl-hidden" style={{width:'20px'}} />
                                            </div>
                                            <div className="cart-box">
                                                <span id="cart-total"> 0 </span>
                                            </div>
                                            <span className="minhpq" style={{display:'none'}}> 0 </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div style={{clear: 'both'}}></div> */}
                    </div>
                </div>
            </nav>
            <section className="d_segment_menu_mobile tr_mobile" id="d_menu_mobile">
                <div className="container">
                    <ul>
                        <li>
                            <div id="page" className="menu_mobile tr_mobile">
                                {/* <div className="header1">
                                    <a href="#menu">&nbsp;&nbsp;&nbsp;&nbsp;Menu</a>
                                </div> */}
                                {/* <div className="header1">
                                    <a href='#Menu' onClick={toggle}>&nbsp;&nbsp;&nbsp;&nbsp;Menu</a>
                                </div>  */}
                                <SideBar isOpen={isOpen} toggle={toggle}/>
                                <Navbar toggle={toggle} />
                            </div>
                        </li>
                        <li>
                            <div className="d_header_search m_toggle">
                                <form className="input-group search-bar" action="/trang-thong-tin-tim-kiem" method="get">
                                    <input type="search" name="key" placeholder="Bạn muốn tìm gì... " className="input-group-field st-default-search-input search-text" />
                                    <span className="input-group-btn">
                                        <button className="btn icon-fallback-text" type="submit">
                                            <FontAwesomeIcon
                                                icon={faSearch}
                                                size={'1x'}
                                                style={{ cursor: 'pointer' }} />
                                        </button>
                                    </span>
                                    <div className="clear" />
                                </form>
                            </div>
                        </li>
                        <li className="u_mt_cart">
                            <div className="top-cart-contain">
                                <div className="mini-cart">
                                    <div className="basket dropdown-toggle">
                                        <a href="/trang-gio-hang">
                                            <div className="content-icon-cart">
                                                <img src="https://petshopsaigon.vn/wp-content/themes/template/css/assets/icon-cart.png" alt="icon-cart" className="cl-block" style={{width:'20px'}} />
                                                <img src="https://petshopsaigon.vn/wp-content/themes/template/css/assets/icon-cart-2.png" alt="icon-cart-2" className="cl-hidden" style={{width:'20px'}} />
                                            </div>
                                            <div className="cart-box"><span id="cart-total"> 0 </span></div>
                                            <span className="minhpq" style={{display:'none'}}> 0 </span>
                                        </a>
                                    </div>
                                    <div />
                                </div>
                            </div>
                        </li>
                        <div className="clear" />
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Header;