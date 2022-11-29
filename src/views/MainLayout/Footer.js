/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
// ==============================|| MAIN LAYOUT ||============================== //
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    const topFunction = () => {
        window.scrollTo(0, 0);
    };

    return (
        <footer>
            <div className="newsletter-wrap tr_none">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-8">
                            <div className="newsletter">
                                {/* <!-- Begin MailChimp Signup Form --> */}
                                <div id="mc_embed_signup">
                                    <form action="" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="form-khuyen-mai" target="_blank" >
                                        <div id="mc_embed_signup_scroll">
                                            <h3 className="title">ĐĂNG KÝ ĐỂ NHẬN KHUYẾN MẠI</h3>
                                            <div className="khuyen-mai">
                                                <input type="email" name="EMAIL" className="email" id="mce-EMAIL" placeholder="Email" required="" />
                                                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                                                    <input type="text" name="b_92a8307d57931a6f4c818a44a_327ddb26d4" />
                                                </div>
                                                <button type="submit" title="Đăng ký" className="subscribe">
                                                    <span>Đăng ký</span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4">
                            <div className="inner">
                                <div className="">
                                    <div className="social pull-right">
                                        <h3 className="title">Mạng xã hội</h3>
                                        <ul className="link">
                                            <li className="fb pull-left">
                                                <a href="https://www.facebook.com/Petshopsaigon.vn/">
                                                    <img src="https://petshopsaigon.vn/wp-content/themes/template/css/assets/facebook-logo-button.png" alt="facebook" />
                                                </a>
                                            </li>
                                            <li className="tw pull-left">
                                                <a href="https://www.instagram.com/petshopsaigon/">
                                                    <img src="https://petshopsaigon.vn/wp-content/themes/template/css/assets/twitter-logo-button.png" alt="twitter" />
                                                </a>
                                            </li>
                                            <li className="googleplus pull-left">
                                                <a href="">
                                                    <img src="https://petshopsaigon.vn/wp-content/themes/template/css/assets/google-plus-logo-button.png" alt="google" />
                                                </a>
                                            </li>
                                            <li className="youtube pull-left">
                                                <a href="">
                                                    <img src="https://petshopsaigon.vn/wp-content/themes/template/css/assets/youtube-logotype.png" alt="youtube" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-inner">
                <div className="container">
                    <div className="d_footer_block">
                        <div className="d_footer_item d_order0">
                            <div className="footer-column-last pull-left">
                                <h4>HỘ KINH DOANH THÚ CƯNG SÀI GÒN</h4>
                                <p><strong>Địa chỉ:&nbsp;</strong>05 đường 11B, KDC Dương Hồng, Bình Hưng, Bình Chánh, TPHCM</p>
                                <p><strong>Số ĐKKD:</strong> 41T8028323 do UBND Huyện Bình Chánh cấp ngày 06/01/2020</p>
                                <p><strong>Người chịu trách nhiệm:</strong> Lê Trọng Nhân</p>
                                <p><strong>Địa chỉ thường trú:</strong> 179S Trần Văn Đang, P.10, Q.3, TPHCM</p>
                                <p><strong>Điện thoại:</strong> 0976.299.155</p>
                                <a href="https://www.dmca.com/Protection/Status.aspx?ID=1e66aaf7-5b18-4ddb-88d2-434310bc3051&amp;refurl=https://petshopsaigon.vn/danh-muc/shop-cho-cho" title="DMCA.com Protection Status" className="dmca-badge"> 
                                    <img src="https://images.dmca.com/Badges/DMCA_logo-grn-btn100w.png?ID=1e66aaf7-5b18-4ddb-88d2-434310bc3051" alt="DMCA.com Protection Status" />
                                </a>
                            </div>
                        </div>
                        <div className="d_footer_item d_order2">
                            <div className="footer-column pull-left">
                                <ul className="links footer_policy">
                                    <li>
                                        <a href="/huong-dan/huong-dan-dat-hang">Hướng dẫn đặt hàng</a>
                                    </li>
                                    <li><a href="/huong-dan/huong-dan-thanh-toan">Hướng dẫn thanh toán</a></li>
                                    <li><a href="/huong-dan/dieu-khoan-chung">Giấy chứng nhận đăng ký hộ kinh doanh: 41T8028323</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="d_footer_item d_order3">
                            <div className="footer-column pull-left">
                                <ul className="links footer_policy">
                                    <li><a href="/chinh-sach/chinh-sach-bao-hanh">Chính sách bảo vệ thông tin người dùng</a></li>
                                    <li><a href="/chinh-sach/quy-dinh-doi-tra-san-pham">Quy định đổi trả sản phẩm</a></li>
                                    <li><a href="/chinh-sach/chinh-sach-giao-hang">Chính sách giao hàng</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="d_footer_item d_order1">
                            <div className="footer-column pull-left">
                                <h4>Hotline gọi mua hàng</h4>
                                <div className="ufooter_hotlinemuahang">
                                    <p>Khách lẻ: 0707.76.07.96<br/>Khách sỉ: 0976.29.91.55</p>
                                </div>
                                <div className="ufooter_connect">
                                    <div className="d_context">Kết nối mạng xã hội:</div>
                                    <a className="tr_none_icon" href="https://www.facebook.com/Petshopsaigon.vn/">
                                        <img src="https://petshopsaigon.vn/wp-content/themes/template/css/assets/facebook-logo-button.png" alt="facebook" />
                                    </a>
                                    <a className="tr_none_icon" href="https://www.instagram.com/petshopsaigon/">
                                        <img src="https://petshopsaigon.vn/wp-content/themes/template/css/assets/twitter-logo-button.png" alt="twitter" />
                                    </a>
                                </div>
                                <a className="d_bct" href="http://online.gov.vn/Home/WebDetails/71623">
                                    <img alt="" title="" src="https://petshopsaigon.vn/wp-content/themes/template/img/bct.png" width="200px" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => topFunction()} id="btn_to_top" type="button" title="Go to top" style={{display: 'block'}}>
                <i className="fa fa-arrow-circle-up" aria-hidden="true" />
                <FontAwesomeIcon
                    icon={faArrowCircleUp}
                    size={'1x'}
                    style={{ cursor: 'pointer' }} 
                />
            </button>
        </footer>
    );
};

export default Footer;
