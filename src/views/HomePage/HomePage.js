/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

// material-ui
import '../MainLayout/style.scss';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import ItemProduct from 'views/Product/ItemProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

// ==============================|| MAIN LAYOUT ||============================== //

const HomePage = () => {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,                
        slidesToScroll: 1
      };
    
      const slideImages = [
        {
          url: 'https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-2.jpg',
          caption: 'Slide 1'
        },
        {
          url: 'https://petshopsaigon.vn/wp-content/uploads/2020/06/z3010109271830-5b276b79e0116a01d93f36355cc06360.jpg',
          caption: 'Slide 2'
        },
        {
          url: 'https://petshopsaigon.vn/wp-content/uploads/2019/08/pet-shop-sai-gon-1.jpg',
          caption: 'Slide 3'
        },
      ];

    return (
        <>
            <div id="mm-0" className="mm-page mm-slideout">
                <div className="clear" />
                <div className="tr_h1" style={{ paddingTop: '20px' }}>
                    <h1 className="tr_h1_trang_chu">Pet Shop Sài Gòn - Thức ăn phụ kiện cho thú cưng chó mèo</h1>
                </div>
                <div className="clear" />
                <div className="d_segment_banner">
                    <div className="slide-container w60 w100m">
                        <Slide {...settings}>
                            {slideImages.map((slideImage, index)=> (
                                <div className="each-slide" key={index}>
                                    <div style={{'backgroundImage': `url(${slideImage.url})`}}></div>
                                </div>
                            ))} 
                        </Slide>
                    </div>
                    <div className="d_static_banner w100m">
                        <div className="static_banner_item marginLeft_0">
                            <a href="/danh-muc/thuc-an-cho-cho">
                                <img src="https://petshopsaigon.vn/wp-content/uploads/2020/06/thuc-an-cho-cho-banner.jpg" alt="thuc-an-cho-cho"/>
                            </a>
                        </div>
                        <div className="static_banner_item">
                            <a href="/danh-muc/thuc-an-cho-meo">
                                <img src="https://petshopsaigon.vn/wp-content/uploads/2020/06/thuc-an-cho-meo-banner.jpg" alt="thuc-an-cho-cho"/>
                            </a>
                        </div>
                        <div className="static_banner_item marginLeft_0">
                            <a href="/nhom-tin/pet-blog">
                                <img src="https://petshopsaigon.vn/wp-content/uploads/2020/06/cham-soc-cho-meo-banner.jpg" alt="thuc-an-cho-cho"/>
                            </a>
                        </div>
                        <div className="static_banner_item">
                            <a href="/tin-tuc/suc-khoe-thu-cung">
                                <img src="https://petshopsaigon.vn/wp-content/uploads/2020/06/suc-khoe-cho-meo-banner.jpg" alt="thuc-an-cho-cho"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="clear" />
                <div className="d_best_seller d_common_title">
                    <div className="container">
                        <div className="blog-title">
                            <h2><a href="/danh-muc/ban-chay" style={{ textDecoration: 'none', color: '#337ab7' }}>Sản phẩm bán chạy</a></h2>
                        </div>
                        <Swiper
                            modules={[Navigation, Scrollbar, A11y]}
                            spaceBetween={0}
                            slidesPerView={2}
                            navigation
                            breakpoints={{
                                576: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 5,
                                },
                              }}
                            >
                            <SwiperSlide className="best_seller_slider_item clone left">
                                <ItemProduct />
                            </SwiperSlide>
                            <SwiperSlide className="best_seller_slider_item clone left">
                                <ItemProduct />
                            </SwiperSlide>
                            <SwiperSlide className="best_seller_slider_item clone left">
                                <ItemProduct />
                            </SwiperSlide>
                            <SwiperSlide className="best_seller_slider_item clone left">
                                <ItemProduct />
                            </SwiperSlide>
                            <SwiperSlide className="best_seller_slider_item clone left">
                                <ItemProduct />
                            </SwiperSlide>
                            <SwiperSlide className="best_seller_slider_item clone left">
                                <ItemProduct />
                            </SwiperSlide>
                            <SwiperSlide className="best_seller_slider_item clone left">
                                <ItemProduct />
                            </SwiperSlide>
                            <SwiperSlide className="best_seller_slider_item clone left">
                                <ItemProduct />
                            </SwiperSlide>
                        </Swiper>
                    </div>    
                </div>  
                {/* <!-- Best Seller Slider --> */}
                <div className="main-col">
                    <div className="container">
                        <div className="std">
                            <div className="best-seller-pro  color " style={{visibility: 'visible'}}>
                                <div className="slider-items-products">
                                    <div className="col-xs-12 col-sm-12 col-md-2 ">
                                        <div className="new_title center">
                                            <h2>
                                                <a href="/danh-muc/shop-cho-cho">Shop cho chó</a>
                                            </h2>
                                        </div>
                                        <div className="index-column-2 row-service hidden-xs hidden-sm">
                                            <ul className="links">
                                                <li>
                                                    <h3>
                                                        <a href="/danh-muc/thuc-an-cho-cho" title="Thức ăn cho chó">
                                                                    Thức ăn cho chó
                                                        </a>
                                                    </h3>
                                                </li>
                                                <li>
                                                    <h3>
                                                        <a href="/danh-muc/do-dung-cho-cho" title="Đồ dùng cho chó">
                                                            Đồ dùng cho chó
                                                        </a>
                                                    </h3>
                                                </li>
                                                <li>
                                                    <h3>
                                                        <a href="/danh-muc/do-choi-cho-cho" title="Đồ chơi cho chó">
                                                            Đồ chơi cho chó
                                                        </a>
                                                    </h3>
                                                </li>
                                                <li>
                                                    <h3>
                                                        <a href="/danh-muc/phu-kien-cho-cho" title="Phụ kiện cho chó">
                                                            Phụ kiện cho chó
                                                        </a>
                                                    </h3>
                                                </li>
                                                <li>
                                                    <h3>
                                                        <a href="/danh-muc/chuong-long-cho-cho" title="Chuồng lồng cho chó">
                                                            Chuồng lồng cho chó
                                                        </a>
                                                    </h3>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="d_product tr_d_product umt_home col-md-10">
                                        <ul>
                                            <li>
                                                <div className="d_image">
                                                    <a href="/danh-muc/do-choi-hinh-con-voi-mon-ami-toy-vinyl">
                                                        <img className="hvr-grow" src="https://petshopsaigon.vn/wp-content/uploads/2019/10/do-choi-hinh-con-voi-mon-ami-toy-vinyl-1-300x300.jpg" alt="Đồ Chơi Hình Con Voi Mon Ami Toy Vinyl" />
                                                    </a>
                                                </div>
                                                <div className="d_namesp">
                                                    <a href="/danh-muc/do-choi-hinh-con-voi-mon-ami-toy-vinyl">
                                                        Đồ Chơi Hình Con Voi Mon Ami Toy Vinyl
                                                    </a>
                                                </div>
                                                <div className="d_hang">
                                                    <b>Hãng</b>: 
                                                    <a href="/hang-san-xuat/mon-ami">Mon Ami</a> 
                                                </div>
                                                <div className="d_giohang">
                                                    <div className="d_giakm pull-left">
                                                        <div className="d_gia_km">38.000 ₫ </div>
                                                    </div>
                                                    <div className="d_uy_giohang pull-right">
                                                        <a href="/danh-muc/do-choi-hinh-con-voi-mon-ami-toy-vinyl">
                                                            <img src="https://petshopsaigon.vn/wp-content/themes/template/img/GioHang.png" alt="cart"/>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d_image">
                                                    <a href="/danh-muc/xuong-vong-tron-mon-ami-toy-rubber">
                                                        <img className="hvr-grow" src="https://petshopsaigon.vn/wp-content/uploads/2019/10/xuong-vong-tron-mon-ami-toy-rubber-1-300x300.jpg" alt="Xương Vòng Tròn Mon Ami Toy Rubber" />
                                                    </a>
                                                </div>
                                                <div className="d_namesp">
                                                    <a href="/danh-muc/xuong-vong-tron-mon-ami-toy-rubber">
                                                        Xương Vòng Tròn Mon Ami Toy Rubber
                                                    </a>
                                                </div>
                                                <div className="d_hang">
                                                    <b>Hãng</b>: 
                                                    <a href="/hang-san-xuat/mon-ami">Mon Ami</a> 
                                                </div>
                                                <div className="d_giohang">
                                                    <div className="d_giakm pull-left">
                                                        <div className="d_gia_km">38.000 ₫ </div>
                                                    </div>
                                                    <div className="d_uy_giohang pull-right">
                                                        <a href="/danh-muc/xuong-vong-tron-mon-ami-toy-rubber">
                                                            <img src="https://petshopsaigon.vn/wp-content/themes/template/img/GioHang.png" alt="cart"/>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d_image">
                                                    <a href="/danh-muc/banh-thuong-dang-xoan-ferplast-goodbite-vi-bo-s">
                                                        <img className="hvr-grow" src="https://petshopsaigon.vn/wp-content/uploads/2019/09/banh-thuong-dang-xoan-ferplast-goodbite-2-2-300x300.jpg" alt="Bánh Thưởng Dạng Xoắn Ferplast Goodbite vị bò (S)" />
                                                    </a>
                                                </div>
                                                <div className="d_namesp">
                                                    <a href="/danh-muc/banh-thuong-dang-xoan-ferplast-goodbite-vi-bo-s">
                                                        Bánh Thưởng Dạng Xoắn Ferplast Goodbite vị bò (S)
                                                    </a>
                                                </div>
                                                <div className="d_hang">
                                                    <b>Hãng</b>: 
                                                    <a href="/hang-san-xuat/ferplast">Ferplast</a> 
                                                </div>
                                                <div className="d_giohang">
                                                    <div className="d_giakm pull-left">
                                                        <div className="d_gia_km">63.000 ₫ </div>
                                                    </div>
                                                    <div className="d_uy_giohang pull-right">
                                                        <a href="/danh-muc/banh-thuong-dang-xoan-ferplast-goodbite-vi-bo-s">
                                                            <img src="https://petshopsaigon.vn/wp-content/themes/template/img/GioHang.png"  alt="cart"/>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d_image">
                                                    <a href="/danh-muc/thuc-an-cho-cho-con-royal-canin-maxi-puppy-4kg">
                                                        <img className="hvr-grow" src="https://petshopsaigon.vn/wp-content/uploads/2019/11/royal-canin-maxi-puppy-8-300x300.jpg" alt="Thức Ăn Cho Chó Con Royal Canin MAXI Puppy (4kg)" />
                                                    </a>
                                                </div>
                                                <div className="d_namesp">
                                                    <a href="/danh-muc/thuc-an-cho-cho-con-royal-canin-maxi-puppy-4kg">
                                                        Thức Ăn Cho Chó Con Royal Canin MAXI Puppy (4kg)
                                                    </a>
                                                </div>
                                                <div className="d_hang">
                                                    <b>Hãng</b>: 
                                                    <a href="/hang-san-xuat/royal-canin">Royal Canin</a> 
                                                </div>
                                                <div className="d_giohang">
                                                    <div className="d_giakm pull-left">
                                                        <div className="d_gia_km">701.000 ₫ </div>
                                                    </div>
                                                    <div className="d_uy_giohang pull-right">
                                                        <a href="/danh-muc/thuc-an-cho-cho-con-royal-canin-maxi-puppy-4kg">
                                                            <img src="https://petshopsaigon.vn/wp-content/themes/template/img/GioHang.png" alt="cart" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-col">
                    <div className="container">
                        <div className="std">
                            <div className="best-seller-pro  color " style={{visibility: 'visible'}}>
                                <div className="slider-items-products">
                                    <div className="col-xs-12 col-sm-12 col-md-2 ">
                                        <div className="new_title center">
                                            <h2>
                                                <a href="/danh-muc/shop-cho-cho">Shop cho meo</a>
                                            </h2>
                                        </div>
                                        <div className="index-column-2 row-service hidden-xs hidden-sm">
                                            <ul className="links">
                                                <li>
                                                    <h3>
                                                        <a href="/danh-muc/thuc-an-cho-cho" title="Thức ăn cho chó">
                                                            Thức ăn cho chó
                                                        </a>
                                                    </h3>
                                                </li>
                                                <li>
                                                    <h3>
                                                        <a href="/danh-muc/do-dung-cho-cho" title="Đồ dùng cho chó">
                                                            Đồ dùng cho chó
                                                        </a>
                                                    </h3>
                                                </li>
                                                <li>
                                                    <h3>
                                                        <a href="/danh-muc/do-choi-cho-cho" title="Đồ chơi cho chó">
                                                            Đồ chơi cho chó
                                                        </a>
                                                    </h3>
                                                </li>
                                                <li>
                                                    <h3>
                                                        <a href="/danh-muc/phu-kien-cho-cho" title="Phụ kiện cho chó">
                                                            Phụ kiện cho chó
                                                        </a>
                                                    </h3>
                                                </li>
                                                <li>
                                                    <h3>
                                                        <a href="/danh-muc/chuong-long-cho-cho" title="Chuồng lồng cho chó">
                                                            Chuồng lồng cho chó
                                                        </a>
                                                    </h3>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="d_product tr_d_product umt_home col-md-10">
                                        <ul>
                                            <li>
                                                <ItemProduct />
                                            </li>
                                            <li>
                                                <div className="d_image">
                                                    <a href="/danh-muc/xuong-vong-tron-mon-ami-toy-rubber">
                                                        <img className="hvr-grow" src="https://petshopsaigon.vn/wp-content/uploads/2019/10/xuong-vong-tron-mon-ami-toy-rubber-1-300x300.jpg" alt="Xương Vòng Tròn Mon Ami Toy Rubber" />
                                                    </a>
                                                </div>
                                                <div className="d_namesp">
                                                    <a href="/danh-muc/xuong-vong-tron-mon-ami-toy-rubber">
                                                        Xương Vòng Tròn Mon Ami Toy Rubber
                                                    </a>
                                                </div>
                                                <div className="d_hang">
                                                    <b>Hãng</b>: 
                                                    <a href="/hang-san-xuat/mon-ami">Mon Ami</a> 
                                                </div>
                                                <div className="d_giohang">
                                                    <div className="d_giakm pull-left">
                                                        <div className="d_gia_km">38.000 ₫ </div>
                                                    </div>
                                                    <div className="d_uy_giohang pull-right">
                                                        <a href="/danh-muc/xuong-vong-tron-mon-ami-toy-rubber">
                                                            <img src="https://petshopsaigon.vn/wp-content/themes/template/img/GioHang.png" alt="cart"/>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d_image">
                                                    <a href="/danh-muc/banh-thuong-dang-xoan-ferplast-goodbite-vi-bo-s">
                                                        <img className="hvr-grow" src="https://petshopsaigon.vn/wp-content/uploads/2019/09/banh-thuong-dang-xoan-ferplast-goodbite-2-2-300x300.jpg" alt="Bánh Thưởng Dạng Xoắn Ferplast Goodbite vị bò (S)" />
                                                    </a>
                                                </div>
                                                <div className="d_namesp">
                                                    <a href="/danh-muc/banh-thuong-dang-xoan-ferplast-goodbite-vi-bo-s">
                                                        Bánh Thưởng Dạng Xoắn Ferplast Goodbite vị bò (S)
                                                    </a>
                                                </div>
                                                <div className="d_hang">
                                                    <b>Hãng</b>: 
                                                    <a href="/hang-san-xuat/ferplast">Ferplast</a> 
                                                </div>
                                                <div className="d_giohang">
                                                    <div className="d_giakm pull-left">
                                                        <div className="d_gia_km">63.000 ₫ </div>
                                                    </div>
                                                    <div className="d_uy_giohang pull-right">
                                                        <a href="/danh-muc/banh-thuong-dang-xoan-ferplast-goodbite-vi-bo-s">
                                                            <img src="https://petshopsaigon.vn/wp-content/themes/template/img/GioHang.png"  alt="cart"/>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d_image">
                                                    <a href="/danh-muc/thuc-an-cho-cho-con-royal-canin-maxi-puppy-4kg">
                                                        <img className="hvr-grow" src="https://petshopsaigon.vn/wp-content/uploads/2019/11/royal-canin-maxi-puppy-8-300x300.jpg" alt="Thức Ăn Cho Chó Con Royal Canin MAXI Puppy (4kg)" />
                                                    </a>
                                                </div>
                                                <div className="d_namesp">
                                                    <a href="/danh-muc/thuc-an-cho-cho-con-royal-canin-maxi-puppy-4kg">
                                                        Thức Ăn Cho Chó Con Royal Canin MAXI Puppy (4kg)
                                                    </a>
                                                </div>
                                                <div className="d_hang">
                                                    <b>Hãng</b>: 
                                                    <a href="/hang-san-xuat/royal-canin">Royal Canin</a> 
                                                </div>
                                                <div className="d_giohang">
                                                    <div className="d_giakm pull-left">
                                                        <div className="d_gia_km">701.000 ₫ </div>
                                                    </div>
                                                    <div className="d_uy_giohang pull-right">
                                                        <a href="/danh-muc/thuc-an-cho-cho-con-royal-canin-maxi-puppy-4kg">
                                                            <img src="https://petshopsaigon.vn/wp-content/themes/template/img/GioHang.png" alt="cart" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
            <section className="latest-blog wow  animated" style={{visibility: 'visible'}}>
                <div className="container">
                    <div className="blog-title">
                        <h2>Bài viết nổi bật</h2>
                    </div>
                    <div className="tr_pc">
                        <div className="row">
                            <div className="col-xs-6 col-sm-4">
                                <article className="blog_entry clearfix wow animated" style={{visibility: 'visible'}}>
                                    <div className="entry-content">
                                        <div className="featured-thumb">
                                            <a href="/tin-tuc/thuc-an-cho-meo-4-thang-tuoi">
                                                <img src="https://petshopsaigon.vn/wp-content/uploads/2022/04/thuc-an-cho-meo-4-thang-tuoi-1.jpg" alt="Top 5 thức ăn cho mèo 4 tháng tuổi nên mua nhất Việt Nam" />
                                            </a>
                                        </div>
                                        <header className="blog_entry-header clearfix">
                                            <div className="blog_entry-header-inner">
                                                <h3 className="blog_entry-title"> 
                                                    <a rel="bookmark" href="/tin-tuc/thuc-an-cho-meo-4-thang-tuoi" title="Top 5 thức ăn cho mèo 4 tháng tuổi nên mua nhất Việt Nam">
                                                        Top 5 thức ăn cho mèo 4 tháng tuổi nên mua nhất Việt Nam
                                                    </a> 
                                                </h3>
                                            </div>
                                        </header>
                                        <div className="entry-content-small content-small">
                                            Thức ăn cho mèo 4 tháng tuổi loại nào tốt nhất. Khi mua thức ăn cho mèo 4 tháng tuổi cần chú ý đến gì? Mời bạn xem ngay ...									
                                        </div>
                                        <div className="post-date">
                                            <FontAwesomeIcon
                                                icon={faClockRotateLeft}
                                                size={'1x'}
                                                style={{ cursor: 'pointer', marginRight: '3px' }} 
                                            />25/04/2022									
                                        </div>
                                    </div>
                                    <a href="/tin-tuc/thuc-an-cho-meo-4-thang-tuoi" className="link-article">
                                        <FontAwesomeIcon
                                            icon={faCaretRight}
                                            size={'1x'}
                                            style={{ cursor: 'pointer', marginRight: '3px' }} 
                                        />Đọc Tiếp
                                    </a>
                                </article>
                            </div>
                            <div className="col-xs-6 col-sm-4">
                                <article className="blog_entry clearfix wow    animated" style={{visibility: 'visible'}}>
                                    <div className="entry-content">
                                        <div className="featured-thumb">
                                            <a href="/tin-tuc/thuc-an-cho-cho-20kg">
                                                <img src="https://petshopsaigon.vn/wp-content/uploads/2022/04/thuc-an-cho-cho-20kg-10.jpg" alt="Top 5 thức ăn cho chó 20kg đáp ứng đủ nhu cầu dinh dưỡng" />
                                            </a>
                                        </div>
                                        <header className="blog_entry-header clearfix">
                                            <div className="blog_entry-header-inner">
                                                <h3 className="blog_entry-title"> 
                                                    <a rel="bookmark" href="/tin-tuc/thuc-an-cho-cho-20kg" title="Top 5 thức ăn cho chó 20kg đáp ứng đủ nhu cầu dinh dưỡng">
                                                        Top 5 thức ăn cho chó 20kg đáp ứng đủ nhu cầu dinh dưỡng
                                                    </a> 
                                                </h3>
                                            </div>
                                        </header>
                                        <div className="entry-content-small content-small">
                                            Thức ăn cho chó 20kg loại nào tốt nhất ở Việt Nam? Mời bạn đọc xem bài viết này để biết được top thức ăn cho chó 20kg ...									</div>
                                        <div className="post-date">
                                            <FontAwesomeIcon
                                                icon={faClockRotateLeft}
                                                size={'1x'}
                                                style={{ cursor: 'pointer', marginRight: '3px' }} 
                                            />08/04/2022									
                                        </div>
                                    </div>
                                    <a href="/tin-tuc/thuc-an-cho-cho-20kg" className="link-article">
                                        <FontAwesomeIcon
                                            icon={faCaretRight}
                                            size={'1x'}
                                            style={{ cursor: 'pointer', marginRight: '3px' }} 
                                        />Đọc Tiếp
                                    </a>
                                </article>
                            </div>
                            <div className="col-xs-6 col-sm-4">
                                <article className="blog_entry clearfix wow    animated" style={{visibility: 'visible'}}>
                                    <div className="entry-content">
                                        <div className="featured-thumb">
                                            <a href="/tin-tuc/thuc-an-cho-cho-truong-thanh">
                                                <img src="https://petshopsaigon.vn/wp-content/uploads/2022/03/thuc-an-cho-cho-truong-thanh-1.jpg" alt="Top 5 thức ăn cho chó trưởng thành tốt nhất Việt Nam" />
                                            </a>
                                        </div>
                                        <header className="blog_entry-header clearfix">
                                            <div className="blog_entry-header-inner">
                                                <h3 className="blog_entry-title"> 
                                                    <a rel="bookmark" href="/tin-tuc/thuc-an-cho-cho-truong-thanh" title="Top 5 thức ăn cho chó trưởng thành tốt nhất Việt Nam">
                                                        Top 5 thức ăn cho chó trưởng thành tốt nhất Việt Nam
                                                    </a> 
                                                </h3>
                                            </div>
                                        </header>
                                        <div className="entry-content-small content-small">
                                            Thức ăn cho chó trưởng thành loại nào là tốt nhất? Mời bạn đọc tham khảo ngay top 5 thức ăn cho chó trưởng thành tốt nhất ...									
                                        </div>
                                        <div className="post-date">
                                            <FontAwesomeIcon
                                                icon={faClockRotateLeft}
                                                size={'1x'}
                                                style={{ cursor: 'pointer', marginRight: '3px' }} 
                                            />
                                            01/04/2022									
                                        </div>
                                    </div>
                                    <a href="/tin-tuc/thuc-an-cho-cho-truong-thanh" className="link-article">
                                        <FontAwesomeIcon
                                            icon={faCaretRight}
                                            size={'1x'}
                                            style={{ cursor: 'pointer', marginRight: '3px' }} 
                                        />
                                        Đọc Tiếp
                                    </a>
                                </article>
                            </div>
                        </div>
                    </div>
                    <div className="tr_mobile">
                        <Swiper
                            modules={[Navigation, Scrollbar, A11y]}
                            spaceBetween={0}
                            slidesPerView={1}
                            navigation
                        >
                            <SwiperSlide>
                                <article className="blog_entry clearfix wow    animated" style={{visibility: 'visible'}}>
                                    <div className="entry-content">
                                        <div className="featured-thumb">
                                            <a href="/tin-tuc/thuc-an-cho-cho-truong-thanh">
                                                <img src="https://petshopsaigon.vn/wp-content/uploads/2022/03/thuc-an-cho-cho-truong-thanh-1.jpg" alt="Top 5 thức ăn cho chó trưởng thành tốt nhất Việt Nam" />
                                            </a>
                                        </div>
                                        <header className="blog_entry-header clearfix">
                                            <div className="blog_entry-header-inner">
                                                <h3 className="blog_entry-title"> 
                                                    <a rel="bookmark" href="/tin-tuc/thuc-an-cho-cho-truong-thanh" title="Top 5 thức ăn cho chó trưởng thành tốt nhất Việt Nam">
                                                        Top 5 thức ăn cho chó trưởng thành tốt nhất Việt Nam
                                                    </a> 
                                                </h3>
                                            </div>
                                        </header>
                                        <div className="entry-content-small content-small">
                                            Thức ăn cho chó trưởng thành loại nào là tốt nhất? Mời bạn đọc tham khảo ngay top 5 thức ăn cho chó trưởng thành tốt nhất ...									
                                        </div>
                                        <div className="post-date">
                                            <FontAwesomeIcon
                                                icon={faClockRotateLeft}
                                                size={'1x'}
                                                style={{ cursor: 'pointer', marginRight: '3px' }} 
                                            />
                                            01/04/2022									
                                        </div>
                                    </div>
                                    <a href="/tin-tuc/thuc-an-cho-cho-truong-thanh" className="link-article">
                                        <FontAwesomeIcon
                                            icon={faCaretRight}
                                            size={'1x'}
                                            style={{ cursor: 'pointer', marginRight: '3px' }} 
                                        />
                                        Đọc Tiếp
                                    </a>
                                </article>
                            </SwiperSlide>
                            <SwiperSlide>
                                <article className="blog_entry clearfix wow    animated" style={{visibility: 'visible'}}>
                                    <div className="entry-content">
                                        <div className="featured-thumb">
                                            <a href="/tin-tuc/thuc-an-cho-cho-truong-thanh">
                                                <img src="https://petshopsaigon.vn/wp-content/uploads/2022/03/thuc-an-cho-cho-truong-thanh-1.jpg" alt="Top 5 thức ăn cho chó trưởng thành tốt nhất Việt Nam" />
                                            </a>
                                        </div>
                                        <header className="blog_entry-header clearfix">
                                            <div className="blog_entry-header-inner">
                                                <h3 className="blog_entry-title"> 
                                                    <a rel="bookmark" href="/tin-tuc/thuc-an-cho-cho-truong-thanh" title="Top 5 thức ăn cho chó trưởng thành tốt nhất Việt Nam">
                                                        Top 5 thức ăn cho chó trưởng thành tốt nhất Việt Nam
                                                    </a> 
                                                </h3>
                                            </div>
                                        </header>
                                        <div className="entry-content-small content-small">
                                            Thức ăn cho chó trưởng thành loại nào là tốt nhất? Mời bạn đọc tham khảo ngay top 5 thức ăn cho chó trưởng thành tốt nhất ...									
                                        </div>
                                        <div className="post-date">
                                            <FontAwesomeIcon
                                                icon={faClockRotateLeft}
                                                size={'1x'}
                                                style={{ cursor: 'pointer', marginRight: '3px' }} 
                                            />
                                            01/04/2022									
                                        </div>
                                    </div>
                                    <a href="/tin-tuc/thuc-an-cho-cho-truong-thanh" className="link-article">
                                        <FontAwesomeIcon
                                            icon={faCaretRight}
                                            size={'1x'}
                                            style={{ cursor: 'pointer', marginRight: '3px' }} 
                                        />
                                        Đọc Tiếp
                                    </a>
                                </article>
                            </SwiperSlide>
                            <SwiperSlide>
                                <article className="blog_entry clearfix wow    animated" style={{visibility: 'visible'}}>
                                    <div className="entry-content">
                                        <div className="featured-thumb">
                                            <a href="/tin-tuc/thuc-an-cho-cho-truong-thanh">
                                                <img src="https://petshopsaigon.vn/wp-content/uploads/2022/03/thuc-an-cho-cho-truong-thanh-1.jpg" alt="Top 5 thức ăn cho chó trưởng thành tốt nhất Việt Nam" />
                                            </a>
                                        </div>
                                        <header className="blog_entry-header clearfix">
                                            <div className="blog_entry-header-inner">
                                                <h3 className="blog_entry-title"> 
                                                    <a rel="bookmark" href="/tin-tuc/thuc-an-cho-cho-truong-thanh" title="Top 5 thức ăn cho chó trưởng thành tốt nhất Việt Nam">
                                                        Top 5 thức ăn cho chó trưởng thành tốt nhất Việt Nam
                                                    </a> 
                                                </h3>
                                            </div>
                                        </header>
                                        <div className="entry-content-small content-small">
                                            Thức ăn cho chó trưởng thành loại nào là tốt nhất? Mời bạn đọc tham khảo ngay top 5 thức ăn cho chó trưởng thành tốt nhất ...									
                                        </div>
                                        <div className="post-date">
                                            <FontAwesomeIcon
                                                icon={faClockRotateLeft}
                                                size={'1x'}
                                                style={{ cursor: 'pointer', marginRight: '3px' }} 
                                            />
                                            01/04/2022									
                                        </div>
                                    </div>
                                    <a href="/tin-tuc/thuc-an-cho-cho-truong-thanh" className="link-article">
                                        <FontAwesomeIcon
                                            icon={faCaretRight}
                                            size={'1x'}
                                            style={{ cursor: 'pointer', marginRight: '3px' }} 
                                        />
                                        Đọc Tiếp
                                    </a>
                                </article>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
