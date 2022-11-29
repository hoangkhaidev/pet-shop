/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import Breadcrumbs from "views/Breadcrumbs/Breadcrumbs";

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const Register = () => {
    const paramsChild = {
        name: 'Đăng ký tài khoản',
        url: ''
    }

    return (
        <>
            <div id="mm-0" className="mm-page mm-slideout">
                <Breadcrumbs paramsChild={paramsChild} />
                <div className="container-fluid container-bg-w" style={{height: 'auto !important'}}>
                    <section className="product-left-to-right container" style={{height: 'auto !important'}}>
                        <div id="main_contener" style={{height: 'auto !important'}}>
                            <div id="module_staticView" className="block" style={{height: 'auto !important'}}>
                                <div className="tr_content">
                                    <div className="tr_content">
                                        <div className="main_service_form">
                                            <h1 className="tr_tieu_de">Đăng ký tài khoản</h1>
                                            <div role="form" className="wpcf7" id="wpcf7-f87437-p87439-o1" lang="vi" dir="ltr">
                                                <div className="screen-reader-response">
                                                    <p role="status" aria-live="polite" aria-atomic="true" /> 
                                                </div>
                                                <form action="/dich-vu-cham-soc-thu-cung" method="post" className="wpcf7-form init" data-status="init">
                                                    <div style={{display: 'none'}}>
                                                        <input type="hidden" name="_wpcf7" value="87437" />
                                                        <input type="hidden" name="_wpcf7_version" value="5.4.1" />
                                                        <input type="hidden" name="_wpcf7_locale" value="vi" />
                                                        <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f87437-p87439-o1" />
                                                        <input type="hidden" name="_wpcf7_container_post" value="87439" />
                                                        <input type="hidden" name="_wpcf7_posted_data_hash" value="" />
                                                    </div>
                                                    <div className="service_register_form">
                                                        <div className="sr_item">
                                                            <div className="label_text"> Tài khoản</div>
                                                            <div className="input_item" style={{width: 'calc(100% - 70px)'}}>
                                                                <span className="wpcf7-form-control-wrap d_name">
                                                                    <input type="text" name="d_name" value="" size="40" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="sr_item">
                                                            <div className="label_text"> Mật khẩu</div>
                                                            <div className="input_item" style={{width: 'calc(100% - 70px)'}}>
                                                                <span className="wpcf7-form-control-wrap d_name">
                                                                    <input type="text" name="d_name" value="" size="40" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="sr_item">
                                                            <div className="label_text"> Họ và tên</div>
                                                            <div className="input_item" style={{width: 'calc(100% - 70px)'}}>
                                                                <span className="wpcf7-form-control-wrap d_name">
                                                                    <input type="text" name="d_name" value="" size="40" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="sr_item">
                                                            <div className="label_text"> Số điện thoại</div>
                                                            <div className="input_item" style={{width: 'calc(100% - 92px)'}}>
                                                                <span className="wpcf7-form-control-wrap d_tel">
                                                                    <input type="tel" name="d_tel" value="" size="40" className="wpcf7-form-control wpcf7-text wpcf7-tel wpcf7-validates-as-required wpcf7-validates-as-tel" aria-required="true" aria-invalid="false" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="sr_item">
                                                            <div className="label_text"> Email</div>
                                                            <div className="input_item" style={{width: 'calc(100% - 71px)'}}>
                                                                <span className="wpcf7-form-control-wrap d_weight">
                                                                    <input type="text" name="d_weight" value="" size="40" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="sr_item">
                                                            <div className="label_text"> Địa chỉ</div>
                                                            <div className="input_item" style={{width: 'calc(100% - 53px)'}}>
                                                                <span className="wpcf7-form-control-wrap d_address">
                                                                    <input type="text" name="d_address" value="" size="40" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="sr_item">
                                                            <select className="selectpicker" style={{padding: 0, color: '#333', fontSize: '14px', border: 'none'}} data-show-subtext="true" data-live-search="true" name="tinh" required="">
                                                                <option value="">Chọn tỉnh thành</option>
                                                                <option value="79">Hồ Chí Minh </option>
                                                                <option value="89">  An Giang  </option>
                                                                <option value="77">  Bà Rịa - Vũng Tàu  </option>
                                                                <option value="24">  Bắc Giang  </option>
                                                                <option value="06">  Bắc Kạn  </option>
                                                                <option value="95">  Bạc Liêu  </option>
                                                                <option value="27">  Bắc Ninh  </option>
                                                                <option value="83">  Bến Tre  </option>
                                                                <option value="74">  Bình Dương  </option>
                                                                <option value="70">  Bình Phước  </option>
                                                                <option value="60">  Bình Thuận  </option>
                                                                <option value="52">  Bình Định  </option>
                                                                <option value="96">  Cà Mau  </option>
                                                                <option value="92">  Cần Thơ  </option>
                                                                <option value="04">  Cao Bằng  </option>
                                                                <option value="64">  Gia Lai  </option>
                                                                <option value="02">  Hà Giang  </option>
                                                                <option value="35">  Hà Nam  </option>
                                                                <option value="01">  Hà Nội  </option>
                                                                <option value="42">  Hà Tĩnh  </option>
                                                                <option value="30">  Hải Dương  </option>
                                                                <option value="31">  Hải Phòng  </option>
                                                                <option value="93">  Hậu Giang  </option>
                                                                <option value="79">  Hồ Chí Minh  </option>
                                                                <option value="17">  Hòa Bình  </option>
                                                                <option value="33">  Hưng Yên  </option>
                                                                <option value="56">  Khánh Hòa  </option>
                                                                <option value="91">  Kiên Giang  </option>
                                                                <option value="62">  Kon Tum  </option>
                                                                <option value="12">  Lai Châu  </option>
                                                                <option value="68">  Lâm Đồng  </option>
                                                                <option value="20">  Lạng Sơn  </option>
                                                                <option value="10">  Lào Cai  </option>
                                                                <option value="80">  Long An  </option>
                                                                <option value="36">  Nam Định  </option>
                                                                <option value="40">  Nghệ An  </option>
                                                                <option value="37">  Ninh Bình  </option>
                                                                <option value="58">  Ninh Thuận  </option>
                                                                <option value="25">  Phú Thọ  </option>
                                                                <option value="54">  Phú Yên  </option>
                                                                <option value="44">  Quảng Bình  </option>
                                                                <option value="49">  Quảng Nam  </option>
                                                                <option value="51">  Quảng Ngãi  </option>
                                                                <option value="22">  Quảng Ninh  </option>
                                                                <option value="45">  Quảng Trị  </option>
                                                                <option value="94">  Sóc Trăng  </option>
                                                                <option value="14">  Sơn La  </option>
                                                                <option value="72">  Tây Ninh  </option>
                                                                <option value="34">  Thái Bình  </option>
                                                                <option value="19">  Thái Nguyên  </option>
                                                                <option value="38">  Thanh Hóa  </option>
                                                                <option value="46">  Thừa Thiên Huế  </option>
                                                                <option value="82">  Tiền Giang  </option>
                                                                <option value="84">  Trà Vinh  </option>
                                                                <option value="08">  Tuyên Quang  </option>
                                                                <option value="86">  Vĩnh Long  </option>
                                                                <option value="26">  Vĩnh Phúc  </option>
                                                                <option value="15">  Yên Bái  </option>
                                                                <option value="48">  Đà Nẵng  </option>
                                                                <option value="66">  Đắk Lắk  </option>
                                                                <option value="67">  Đắk Nông  </option>
                                                                <option value="11">  Điện Biên  </option>
                                                                <option value="75">  Đồng Nai  </option>
                                                                <option value="87">  Đồng Tháp  </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="sr_btn">
                                                        <input type="submit" value="Đăng ký" className="wpcf7-form-control wpcf7-submit" />
                                                        <span className="ajax-loader" />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="wpcf7-response-output" aria-hidden="true" />
                                        </div>                            
                                    </div>
                                </div>
                            </div>
                            <div className="clear" />
                        </div>
                    </section>
                </div>
            </div>    
        </>
    );
};

export default Register;
