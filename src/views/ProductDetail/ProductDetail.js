/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import Breadcrumbs from "views/Breadcrumbs/Breadcrumbs";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from 'swiper';

import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/thumbs/thumbs.min.css';
import '../MainLayout/style.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ItemProduct from "views/Product/ItemProduct";

// styles
SwiperCore.use([Navigation, Thumbs]);
// ==============================|| MAIN LAYOUT ||============================== //

const ProductDetail = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [data, setData] = useState([
        "https://swiperjs.com/demos/images/nature-1.jpg",
        "https://swiperjs.com/demos/images/nature-2.jpg",
        "https://swiperjs.com/demos/images/nature-3.jpg",
        "https://swiperjs.com/demos/images/nature-4.jpg",
        "https://swiperjs.com/demos/images/nature-5.jpg",
        "https://swiperjs.com/demos/images/nature-6.jpg",
        "https://swiperjs.com/demos/images/nature-7.jpg",
        "https://swiperjs.com/demos/images/nature-8.jpg",
        "https://swiperjs.com/demos/images/nature-9.jpg",
        "https://swiperjs.com/demos/images/nature-10.jpg"
      ]);

    const params = {
        name: 'Sản phẩm',
        url: ''
    }

    const paramsChild = {
        name: 'Pate Cho Mèo Hạn Chế Búi Lông Royal Canin Hairball Care 85g (12 gói)',
        url: ''
    }

    return (
        <>
            <div id="mm-0" className="mm-page mm-slideout">
                <Breadcrumbs params={params} paramsChild={paramsChild} />
                <div className="container single_pro_cont">
                    <div id="layoutGroup4" className="sortable">
                        <div>
                            <div className="clear" />
                            <div id="module_staticView" className="block">
                                <div className="blockcontent">
                                    <div className="content" style={{display: 'flex'}}>
                                        <div className="col-xs-12 col-sm-12 col-md-4 padd_0_10">
                                            <Swiper
                                                style={{
                                                    "--swiper-navigation-color": "#fff",
                                                    "--swiper-pagination-color": "#fff",
                                                    paddingBottom: '5px',
                                                }}
                                                loop={false}
                                                spaceBetween={10}
                                                navigation={true}
                                                thumbs={{ swiper: thumbsSwiper }}
                                                className="mySwiper2"
                                                onSlideChange={(e) => {
                                                    console.log("slide change", e);
                                                    if (e.realIndex % 3 === 0) {
                                                        const newData = [...data];
                                                        newData.push(newData.shift());
                                                        console.log(newData);
                                                        setData(newData);
                                                        e.slideTo(e.realIndex - 1);
                                                    }
                                                    if (e.realIndex === 0) {
                                                        const newData = [...data];
                                                        newData.unshift(newData.pop());
                                                        console.log(newData);
                                                        setData(newData);
                                                        e.slideTo(e.realIndex + 1);
                                                    }
                                                }}
                                            >
                                                {data.map((img) => (
                                                <SwiperSlide key={img} style={{ height: '355px'}}>
                                                    <img src={img} alt="chitietsanpham" />
                                                </SwiperSlide>
                                                ))}
                                            </Swiper>
                                            <Swiper
                                                onSwiper={setThumbsSwiper}
                                                loop={false}
                                                loopedSlides={1}
                                                spaceBetween={5}
                                                slidesPerView={4}
                                                freeMode={false}
                                                watchSlidesVisibility={true}
                                                watchSlidesProgress={true}
                                                className="mySwiper"
                                            >
                                                {data.map((img) => (
                                                <SwiperSlide key={img} >
                                                    <img src={img} alt="chitietsanpham"/>
                                                </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div>
                                        <div className="col-md-5 padd_0_10">
                                            <h1 className="tr_tieu_de_sp">Pate Cho Mèo Hạn Chế Búi Lông Royal Canin Hairball Care 85g (12 gói)</h1>
                                            <div className="tr_expert tr_content">
                                                <p>- Duy trì cân nặng lý tưởng cho mèo với hàm lượng chất béo thấp chỉ 2,7%.<br />
                                                - Cung cấp các axit béo thiết yếu để duy trì năng lượng cho hoạt động mỗi ngày của các bé<br />
                                                - Khả năng tiêu hóa cao được hỗ trợ thông qua việc bao gồm chất xơ trong thành phần của sản phẩm góp phần bảo vệ và cân bằng hệ vi khuẩn đường ruột khỏe mạnh.<br />
                                                - Kích thích quá trình chuyển hóa qua đường ruột loại bỏ lông thừa thường tồn tại trong dạ dày.<br />
                                                - Pate có độ ẩm cao giảm nguy cơ mắc các vấn đề về đường tiết niệu<br />
                                                - Nhập khẩu hoàn toàn từ Pháp.<br />
                                                - Phù hợp với mọi giống mèo trên 12 tháng tuổi</p>
                                            </div>
                                            <div className="detail_bar">
                                                <p className="bg_price">
                                                    <span className="detail_price" data-name="price">423.000 ₫</span>
                                                </p>
                                            </div>
                                            <br className="clean" />
                                            <div className="clear" />
                                            <div className="detail_co">
                                                <div style={{height: 'auto'}} className="detail_listcart">
                                                    <table border="0" className="shopping_cart_detail">
                                                        <tbody>
                                                            <tr className="active">
                                                                <td width="78" align="left" className="left_col">
                                                                    <a data-name="imgSku">
                                                                        <img width="60" height="60" src=" https://petshopsaigon.vn/wp-content/uploads/2020/02/royal-canin-hairball-care-300x300.jpg" alt="hairball" />
                                                                    </a>
                                                                </td>
                                                                <td width="221" align="left" className="name_book">
                                                                    <a data-name="skuName" href="">Pate Cho Mèo Hạn Chế Búi Lông Royal Canin Hairball Care 85g (12 gói)</a>
                                                                    <br />
                                                                    <b style={{color:'#f07881'}}>Thương Hiệu : <a href="/hang-san-xuat/royal-canin">Royal Canin</a></b> 
                                                                    <br/>
                                                                </td>
                                                                <td width="126" valign="top" align="left" className="bg_price">
                                                                    <span className="book_price">423.000 ₫ </span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table border="0" className="shopping_cart_detail">
                                                        <tbody>
                                                            <tr className="active">
                                                                <input type="hidden" name="id_mau_sac" id="id_mau_sac" value="0" />
                                                                <input type="hidden" name="id_size" id="id_size" value="0" />
                                                                <td className="bg_price">
                                                                    <span className="name_mau_sac"> Số lượng : </span>
                                                                    <select className="select_chon_mau" name="so_luong" id="so_luong">
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                        <option value="6">6</option>
                                                                        <option value="7">7</option>
                                                                        <option value="8">8</option>
                                                                        <option value="9">9</option>
                                                                        <option value="10">10</option>
                                                                        <option value="11">11</option>
                                                                        <option value="12">12</option>
                                                                        <option value="13">13</option>
                                                                        <option value="14">14</option>
                                                                        <option value="15">15</option>
                                                                        <option value="16">16</option>
                                                                        <option value="17">17</option>
                                                                        <option value="18">18</option>
                                                                        <option value="19">19</option>
                                                                        <option value="20">20</option>
                                                                        <option value="21">21</option>
                                                                        <option value="22">22</option>
                                                                        <option value="23">23</option>
                                                                        <option value="24">24</option>
                                                                        <option value="25">25</option>
                                                                        <option value="26">26</option>
                                                                        <option value="27">27</option>
                                                                        <option value="28">28</option>
                                                                        <option value="29">29</option>
                                                                        <option value="30">30</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="panel_info">
                                                <div className="panel3 R">
                                                    <a className="btn_blue_big order bt_sap_ve" style={{marginRight: '5px'}} data-index="1" data-name="btnAddToCart">
                                                        Mua Ngay
                                                        <span className="ic_arrN_W" />
                                                    </a>
                                                    <a href="/trang-gio-hang" className="btn_blue_big order" data-index="1" data-name="btnAddToCart">
                                                        Vào giỏ hàng
                                                        <span className="ic_arrN_W" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 padd_0_10">
                                            <div className="det_pro_contact">
                                                <div className="pro_contact_item">
                                                    <div className="contact_item_icon">
                                                        {/* <i className="fa fa-phone" /> */}
                                                        <FontAwesomeIcon
                                                            icon={faPhone}
                                                            size={'1x'}
                                                            style={{ cursor: 'pointer', marginRight: '3px', color: '#337ab7', fontSize: '12px' }} 
                                                        />
                                                    </div>
                                                    <div className="contact_item_txt">
                                                        <p>
                                                            <strong>Bán lẻ:</strong> 0707.76.07.96<br />
                                                            <strong>Bán sỉ:</strong> 0976.29.91.55
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="pro_contact_item">
                                                    <div className="contact_item_icon">
                                                        {/* <i className="fas fa-envelope" /> */}
                                                        <FontAwesomeIcon
                                                            icon={faEnvelope}
                                                            size={'1x'}
                                                            style={{ cursor: 'pointer', marginRight: '3px', color: '#337ab7', fontSize: '14px' }} 
                                                        />
                                                    </div>
                                                    <div className="contact_item_txt">
                                                        <p><strong>Mời bạn ghé shop:</strong></p>
                                                        <ul>
                                                            <li><strong><span style={{color: '#ff6600'}}>224 Sư Vạn Hanh, P2, Q10</span></strong></li>
                                                        </ul>
                                                        <p><em>– Giờ mở cửa của Shop từ 8h đến 19h hằng ngày</em></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="det_pro_why">
                                                <div className="pro_why_title">Tại sao nên chọn chúng tôi</div>
                                                <div className="pro_why_cont">
                                                    <div className="why_cont_item">
                                                        <div className="why_cont_item_img">
                                                            <img src="https://petshopsaigon.vn/wp-content/uploads/2020/06/asset-2.png" alt="" />
                                                        </div>
                                                        <div className="why_cont_item_txt">Hạn Sử Dụng Dài Nhất. Bao Bì Mới Nhất</div>
                                                    </div>
                                                    <div className="why_cont_item">
                                                        <div className="why_cont_item_img">
                                                            <img src="https://petshopsaigon.vn/wp-content/uploads/2020/06/asset-1-1.png" alt=""/>
                                                        </div>
                                                        <div className="why_cont_item_txt">Mua Càng Nhiều. Giảm Càng Nhiều</div>
                                                    </div>
                                                    <div className="why_cont_item">
                                                        <div className="why_cont_item_img">
                                                            <img src="https://petshopsaigon.vn/wp-content/uploads/2020/06/asset-6.png" alt="" />
                                                        </div>
                                                        <div className="why_cont_item_txt">Bán Sỉ Giá Tốt. Bán Lẻ Sale Thường Xuyên</div>
                                                    </div>
                                                    <div className="why_cont_item">
                                                        <div className="why_cont_item_img">
                                                            <img src="https://petshopsaigon.vn/wp-content/uploads/2020/06/asset-4.png" alt="" />
                                                        </div>
                                                        <div className="why_cont_item_txt">Ship Tận Nơi. Nhận Hàng - Trả Tiền Ngay Tại Nhà</div>
                                                    </div>
                                                    <div className="why_cont_item">
                                                        <div className="why_cont_item_img">
                                                            <img src="https://petshopsaigon.vn/wp-content/uploads/2020/06/asset-5.png" alt="" />
                                                        </div>
                                                        <div className="why_cont_item_txt">Hoàn Tiền Gấp 10 Lần Nếu Bán Hàng Giả</div>
                                                    </div>
                                                    <div className="why_cont_item">
                                                        <div className="why_cont_item_img">
                                                            <img src="https://petshopsaigon.vn/wp-content/uploads/2020/06/asset-3.png" alt="" />
                                                        </div>
                                                        <div className="why_cont_item_txt">5 Năm Kinh Nghiệm Chó Mèo. Miễn Phí Tư Vấn</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br className="clean" />
                                    </div>
                                    {/* <!-- detail--> */}
                                    <div className="clear" />
                                    <div className="umd_main_content">
                                        <div className=" content_detail">		

                                            <div className="umt_d_rela_products" style={{height: 'auto !important', paddingTop: 0, paddingBottom: '20px'}}>
                                                <h2 className="tr_tieu_de">Sản phẩm cùng loại </h2>
                                                <div className="tr_sp_cung_loai" style={{height: 'auto !important'}}>
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
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tr_binh_luan fr_col">
                                                <h2 className="tr_tieu_de">Thông tin chi tiết </h2>
                                                <div className="tr_content">
                                                    <h2 style={{textAlign: 'center'}}>
                                                        <span id="Pate_Cho_Meo_Han_Che_Bui_Long_Royal_Canin_Hairball_Care_1goi">Pate Cho Mèo Hạn Chế Búi Lông Royal Canin Hairball Care (1gói)</span>
                                                    </h2>
                                                    <p>
                                                        <img loading="lazy" className="aligncenter size-full wp-image-73852" src="https://petshopsaigon.vn/wp-content/uploads/2020/04/banner_730x530.png" alt="khách hàng thân thiết petextra" width="730" height="530" />
                                                    </p>
                                                    <p style={{textAlign: 'center'}} />
                                                </div>
                                            </div>
                                            <h2 className="tr_tieu_de">Bình luận </h2>
                                            <div className="tr_content">
                                                <div className="wpdiscuz_top_clearing" />
                                                <div id="comments" className="comments-area">
                                                    <div id="respond" style={{width: '0',height: '0',clear: 'both',margin: '0',padding: '0'}} />            
                                                    <h3 id="wc-comment-header">Đánh giá sản phẩm</h3>
                                                    <div id="wpcomm" className="wpdiscuz_unauth wpd-default">
                                                        <div className="wpdiscuz-form-top-bar">
                                                            <div className="wpdiscuz-ftb-left">
                                                                <div id="wc_show_hide_loggedin_username" />
                                                            </div>
                                                            <div className="wpd-clear" />
                                                        </div>
                                                        <div className="wc_social_plugin_wrapper" />
                                                        <div className="wc-form-wrapper wc-main-form-wrapper" id="wc-main-form-wrapper-0_0">
                                                            <div className="wpdiscuz-comment-message" style={{display: 'block'}} />
                                                            <form className="wc_comm_form wc_main_comm_form" method="post" >
                                                                <div className="wc-field-comment">
                                                                    <div className="wpdiscuz-item wc-field-textarea">
                                                                        <div className="wpdiscuz-textarea-wrap ">
                                                                            <div className="wc-field-avatararea">
                                                                                <img alt="avatar" src="https://secure.gravatar.com/avatar/?s=40&amp;d=mm&amp;r=g" className="avatar avatar-40 photo avatar-default" height="40" width="40" loading="lazy" />
                                                                            </div>    
                                                                            <textarea id="wc-textarea-0_0" placeholder="Bắt đầu thảo luận..." required="" name="wc_comment" className="wc_comment wpd-field" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="clearfix" />
                                                                <div className="wc-form-footer" style={{display: 'none'}}> 
                                                                    <div className="wpd-form-row">
                                                                        <div className="wpd-form-col-left">
                                                                            <div className="wpdiscuz-item wc_name-wrapper wpd-has-icon">
                                                                                <div className="wpd-field-icon"><i className="fas fa-user" /></div>
                                                                                <input value="" required="required" className="wc_name wpd-field" type="text" name="wc_name" placeholder="Name*" pattern=".{3,50}" title="" />
                                                                            </div>
                                                                            <div className="wpdiscuz-item wc_email-wrapper wpd-has-icon">
                                                                                <div className="wpd-field-icon"><i className="fas fa-at" /></div>
                                                                                <input value="" required="required" className="wc_email wpd-field" type="email" name="wc_email" placeholder="Email*" />
                                                                            </div>
                                                                            <div className="wpdiscuz-item wc_website-wrapper wpd-has-icon">
                                                                                <div className="wpd-field-icon"><i className="fas fa-link" /></div>
                                                                                <input value="" className="wc_website wpd-field" type="text" name="wc_website" placeholder="Website" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="wpd-form-col-right">
                                                                            <div className="wc-field-captcha wpdiscuz-item wc_captcha-wrapper">
                                                                                <div className="wc-captcha-input">
                                                                                    <input type="text" required="required" name="wc_captcha" className="wpd-field wc_field_captcha" placeholder="Code" title="Insert the CAPTCHA code" />
                                                                                </div>
                                                                                <div className="wc-label wc-captcha-label">
                                                                                    <a className="wpdiscuz-nofollow" href="#" rel="nofollow">
                                                                                        <img alt="wpdiscuz_captcha" className="wc_captcha_img" src="https://petshopsaigon.vn/wp-content/plugins/wpdiscuz/utils/captcha/captcha.php?key=c636e0537d4051" width="80" height="26" />
                                                                                    </a>
                                                                                    <a className="wpdiscuz-nofollow wc_captcha_refresh_img" href="#" rel="nofollow">
                                                                                        <img alt="refresh" className="" src="https://petshopsaigon.vn/wp-content/plugins/wpdiscuz/assets/img/captcha-loading.png" width="16" height="16" />
                                                                                    </a>
                                                                                    <input type="hidden" id="c636e0537d4051" className="wpdiscuz-cnonce" name="cnonce" value="c636e0537d4051" />
                                                                                </div>
                                                                                <div className="clearfix" />
                                                                            </div>
                                                                            <div className="wc-field-submit">
                                                                                <label className="wpd_label" title="Thông báo cho bài trả lời mới cho nhận xét này" htmlFor="wc_notification_new_comment-0_0">
                                                                                    <input id="wc_notification_new_comment-0_0" className="wc_notification_new_comment-0_0 wpd_label__checkbox" value="comment" type="checkbox" name="wpdiscuz_notification_type" />
                                                                                    <span className="wpd_label__text">
                                                                                        <span className="wpd_label__check">
                                                                                            <i className="fas fa-bell wpdicon wpdicon-on" />
                                                                                            <i className="fas fa-bell-slash wpdicon wpdicon-off" />
                                                                                        </span>
                                                                                    </span>
                                                                                </label>
                                                                                <input className="wc_comm_submit wc_not_clicked button alt" type="submit" name="submit" value="Gửi Bình Luận" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="clearfix" />
                                                                    </div>
                                                                </div>
                                                                <div className="clearfix" />
                                                                <input type="hidden" className="wpdiscuz_unique_id" value="0_0" name="wpdiscuz_unique_id" />
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div id="wpdiscuz-loading-bar" className="wpdiscuz-loading-bar wpdiscuz-loading-bar-unauth" />
                                            </div>
                                        </div>
                                        <div className="rela_news_bar">
                                            <div className="d_taskbar_title">Tin tức liên quan</div>
                                            <div className="rela_news_block">
                                                <div className="noi_dung">
                                                    <div className="noidung_head">
                                                        <div className="img">
                                                            <a href="/tin-tuc/tri-bui-long-cho-meo">
                                                                <img src="https://petshopsaigon.vn/wp-content/uploads/2020/05/tri-bui-long-cho-meo-1.png" alt="Trị búi lông cho mèo và mẹo phòng ngừa" />
                                                            </a>
                                                        </div>
                                                        <h3>
                                                            <a href="/tin-tuc/tri-bui-long-cho-meo" alt="Trị búi lông cho mèo và mẹo phòng ngừa">Trị búi lông cho mèo và mẹo phòng ngừa.</a>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clear" />
                        </div>
                    </div>
                    <div className="clear" />
                </div>
            </div>    
        </>
    );
};

export default ProductDetail;
