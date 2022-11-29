/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import moment from "moment";
import { useState } from "react";
import { Input } from "reactstrap";
import Breadcrumbs from "views/Breadcrumbs/Breadcrumbs";


// styles

// ==============================|| MAIN LAYOUT ||============================== //

const PetService = () => {
    const paramsChild = {
        name: 'Đăng ký dịch vụ chăm sóc thú cưng',
        url: ''
    }

    const [value, setValue] = useState(moment().format('YYYY-MM-DD'));

    const onChangeDate = (date) => {
        const newDate = moment(date.target.value).format('YYYY-MM-DD');
        setValue(newDate);
        console.log(newDate);
    };

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
                                            <h1 className="tr_tieu_de">Đăng ký dịch vụ chăm sóc thú cưng</h1>
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
                                                            <div className="label_text"> Họ và tên</div>
                                                            <div className="input_item" style={{width: 'calc(100% - 70px)'}}>
                                                                <span className="wpcf7-form-control-wrap d_name">
                                                                    <input type="text" name="d_name" value="" size="40" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" />
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
                                                            <div className="label_text"> Số điện thoại</div>
                                                            <div className="input_item" style={{width: 'calc(100% - 92px)'}}>
                                                                <span className="wpcf7-form-control-wrap d_tel">
                                                                    <input type="tel" name="d_tel" value="" size="40" className="wpcf7-form-control wpcf7-text wpcf7-tel wpcf7-validates-as-required wpcf7-validates-as-tel" aria-required="true" aria-invalid="false" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="sr_item">
                                                            <div className="label_text"> Thú cưng của bạn là</div>
                                                            <div className="input_item" style={{width: 'calc(100% - 138px)'}}>
                                                                <span className="wpcf7-form-control-wrap d_pet">
                                                                    <span className="wpcf7-form-control wpcf7-checkbox wpcf7-validates-as-required" aria-invalid="false">
                                                                        <span className="wpcf7-list-item first">
                                                                            <input type="checkbox" name="d_pet[]" value="Chó" />
                                                                            <span className="wpcf7-list-item-label">Chó</span>
                                                                        </span>
                                                                        <span className="wpcf7-list-item last">
                                                                            <input type="checkbox" name="d_pet[]" value="Mèo" />
                                                                            <span className="wpcf7-list-item-label">Mèo</span>
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="sr_item">
                                                            <div className="label_text"> Cân nặng</div>
                                                            <div className="input_item" style={{width: 'calc(100% - 71px)'}}>
                                                                <span className="wpcf7-form-control-wrap d_weight">
                                                                    <input type="text" name="d_weight" value="" size="40" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="sr_item">
                                                            <div className="label_text"> Giống thú cưng của bạn là giống gì</div>
                                                            <div className="input_item" style={{width: 'calc(100% - 229px)'}}>
                                                                <span className="wpcf7-form-control-wrap d_type2">
                                                                    <input type="text" name="d_type2" value="" size="40" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="sr_item service_input">
                                                            <div className="label_text"> Bạn muốn đăng ký sử dụng dịch vụ nào</div>
                                                            <div className="input_item" style={{width: "calc(100% - 258px)"}}>
                                                                <span className="wpcf7-form-control-wrap d_service">
                                                                    <span className="wpcf7-form-control wpcf7-checkbox wpcf7-validates-as-required" aria-invalid="false">
                                                                        <span className="wpcf7-list-item first">
                                                                            <input type="checkbox" name="d_service[]" value="Tắm vệ sinh" />
                                                                            <span className="wpcf7-list-item-label">Tắm vệ sinh</span>
                                                                        </span>
                                                                        <span className="wpcf7-list-item">
                                                                            <input type="checkbox" name="d_service[]" value="Tắm + cạo lông" />
                                                                            <span className="wpcf7-list-item-label">Tắm + cạo lông</span>
                                                                        </span>
                                                                        <span className="wpcf7-list-item last">
                                                                            <input type="checkbox" name="d_service[]" value="Tắm + cắt tỉa" />
                                                                            <span className="wpcf7-list-item-label">Tắm + cắt tỉa</span>
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="sr_item time_input">
                                                            <div className="label_text"> Thời gian bạn muốn sử dụng dịch vụ</div>
                                                            <div className="input_item" style={{width: 'calc(100% - 239px)'}}>
                                                                <span className="wpcf7-form-control-wrap d_date">
                                                                    <Input value={value} onChange={onChangeDate} type="date" name="d_date" className="wpcf7-form-control wpcf7-date wpcf7-validates-as-required wpcf7-validates-as-date" aria-required="true" aria-invalid="false" />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="cost_board">
                                                            *Bạn có thể tham khảo bảng báo giá chi phí dịch vụ PetshopSaigon.vn tại đây<br />
                                                            <a href="https://petshopsaigon.vn/wp-content/uploads/2018/01/bb67fe2a1a9fdac1838e.jpg" className="fancybox" data-fancybox="group">
                                                                <img src="https://petshopsaigon.vn/wp-content/uploads/2018/01/bb67fe2a1a9fdac1838e.jpg" alt="" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="sr_btn">
                                                        <input type="submit" value="Đăng ký dịch vụ" className="wpcf7-form-control wpcf7-submit" />
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

export default PetService;
