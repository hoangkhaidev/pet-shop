/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import Breadcrumbs from "views/Breadcrumbs/Breadcrumbs";

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const Payment = () => {

    const paramsChild = {
        name: 'Hình thức thanh toán',
        url: ''
    }

    return (
        <>
            <div id="mm-0" className="mm-page mm-slideout">
                <Breadcrumbs paramsChild={paramsChild} />
                <div className="container-fluid container-bg-w" style={{height: 'auto !important'}}>
                    <section className="product-left-to-right container">
                        <div id="container">
                            <form method="post"> 
                                <div id="content_left_contener " className="tr_left_gh">
                                    <div className="sortable" id="layoutGroup5">
                                        <div className="block" id="module_checkoutend">
                                            <h4>THÔNG TIN ĐẶT HÀNG </h4>
                                            <div className="blockcontent">
                                                <div className="tr_chi_tite_gio_hang">
                                                    <div className="dv-form-lienhe">
                                                        <div className="lienhe-left">
                                                            <li className="li_lienhe_name">
                                                                <input type="text" required="" name="ho_ten" className="ip_lienhe_name" placeholder="Họ tên " />
                                                            </li>
                                                            <li className="li_lienhe_dienthoai">
                                                                <input type="text" name="txt_dien_thoai" className="ip_lienhe_dienthoai" required="" placeholder="Điện thoại" />
                                                            </li>
                                                            <li className="li_lienhe_email">
                                                                <input type="text" name="txt_email" className="ip_lienhe_email" placeholder="Email" />
                                                            </li>
                                                            <li className="li_lienhe_diachi">
                                                                <input type="text" required="" name="txt_dia_chi" className="ip_lienhe_diachi ip_lienhe_diachi1" placeholder="Địa chỉ nhận hàng " />
                                                            </li>
                                                            <li className="li_lienhe_captcha">
                                                                <select className="selectpicker" data-show-subtext="true" data-live-search="true" name="tinh" required="">
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
                                                            </li>
                                                        </div>
                                                        <div className="lienhe-right">
                                                            <li className="li_lienhe_noidung">
                                                                <textarea name="txt_yeu_cau" className="ip_lienhe_noidung" placeholder="Ghi chú đơn hàng " />
                                                            </li>
                                                        </div>
                                                        <div className="clear" />
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>	
                                    <div className="sortable" id="layoutGroup5">
                                        <div className="block" id="module_checkoutend">
                                            <h4> HÌNH THỨC THANH TOÁN </h4>
                                            <div className="blockcontent">
                                                <table width="100%">
                                                    <tbody>
                                                        <tr className="tr_top">
                                                            <td nowrap="nowrap" valign="top" width="2%">
                                                                <input name="payment" id="payment1" value="1" checked="checked" type="radio" style={{marginTop:'5px'}} />
                                                            </td>
                                                            <td valign="top">
                                                                <label htmlFor="payment1" title="Thanh toán tiền mặt khi nhận hàng">
                                                                    <strong>Thanh toán tiền mặt khi nhận hàng</strong>
                                                                </label>
                                                                <div style={{margin: '10px 0px', fontSize: '90%', display: 'block'}} id="menthodinfo1" />
                                                            </td>
                                                        </tr>
                                                        <tr className="tr_top">
                                                            <td nowrap="nowrap" valign="top" width="2%">
                                                                <input name="payment" id="payment2" value="2" type="radio" style={{marginTop:'5px'}} />
                                                            </td>
                                                            <td valign="top">
                                                                <label htmlFor="payment2" title="Chuyển khoản ngân hàng"><strong>Chuyển khoản ngân hàng</strong></label>
                                                                <div style={{margin: '10px 0px', fontSize: '90%', display: 'none' }} id="menthodinfo2">
                                                                    <p><span style={{fontSize: '12pt'}}><strong>Thông Tin Chuyển Khoản&nbsp; </strong></span></p>
                                                                    <p><span style={{fontSize: '12pt'}}><strong>Ngân Hàng</strong>&nbsp; &nbsp; <strong>:</strong>&nbsp; Vietcombank </span></p>
                                                                    <p><span style={{fontSize: '12pt'}}><strong>Tên tài khoản:</strong>&nbsp; Lê Trọng Nhân </span></p>
                                                                    <p><span style={{fontSize: '12pt'}}><strong>Số tài khoản&nbsp; :</strong>&nbsp; 0511000441806 </span></p>
                                                                    <p><span style={{fontSize: '12pt'}}><strong>Chi nhánh&nbsp; &nbsp; &nbsp; :</strong>&nbsp; Vietcombank CN Sài Thành - PGD Trần Hưng Đạo</span></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="dv-lienhe-button glo-center">
                                            <button type="submit" className="a_button" name="txt_mua_hang"> GỬI ĐƠN HÀNG  </button>
                                        </div>
                                    </div>			
                                </div>
                                <div id="layoutGroup6" className="sortable">
                                    <div id="doi_gia">
                                        <div id="module_ordercart" className="block">
                                            <div className="blockcontent">
                                                <table width="100%" className="orderproducts">
                                                    <tbody>
                                                        <tr>
                                                            <th width="90%" className="mtitle">
                                                                <span>Đơn hàng</span>
                                                                ( 2 Sản phẩm )
                                                            </th>
                                                            <th className="mtitle">
                                                                <a href="https://petshopsaigon.vn/trang-gio-hang" title="Đơn hàng">Sửa</a>
                                                            </th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="ordercartmin">
                                                    <table width="100%" className="orderproducts">
                                                        <tbody>
                                                            <tr>
                                                                <td valign="top">
                                                                    <a title="	[SỐ 1 THÁI LAN] Thức ăn cho chó trưởng thành giống đại LuvCare 1.5kg " href="/san-pham/thuc-an-cho-cho-truong-thanh-giong-dai-luvcare-1-5kg">	
                                                                        [SỐ 1 THÁI LAN] Thức ăn cho chó trưởng thành giống đại LuvCare 1.5kg 
                                                                        - Màu:   - Size:0  
                                                                        ( 120.000 ₫  X 1 ) 
                                                                    </a>
                                                                </td>	
                                                                <td valign="top" nowrap="nowrap" align="right">	120.000 ₫</td>	
                                                            </tr>
                                                            <tr>
                                                                <td valign="top">
                                                                    <a title="	Thức Ăn Cho Chó Trưởng Thành Royal Canin MAXI Adult (10kg) " href="/san-pham/thuc-an-cho-cho-truong-thanh-royal-canin-maxi-adult-10kg">	
                                                                    Thức Ăn Cho Chó Trưởng Thành Royal Canin MAXI Adult (10kg) 
                                                                    - Màu:   - Size:0  
                                                                    ( 1.210.000 ₫  X 1 ) </a>
                                                                </td>	
                                                                <td valign="top" nowrap="nowrap" align="right">	1.210.000 ₫</td>	
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <table width="100%" className="orderproducts">      
                                                    <tbody> 
                                                        <tr className="subtotal">
                                                            <td>Tạm tính</td>
                                                            <td nowrap="nowrap" align="right" id="subtotalvl">1.330.000 đ</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Giảm giá coupon </td>
                                                            <td nowrap="nowrap" align="right"><font color="#f00">  0 đ </font></td>
                                                        </tr>
                                                        <tr className="total">
                                                            <td>Tổng tiền</td>
                                                            <td nowrap="nowrap" align="right" id="totalcacul">1.330.000 đ </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="dong_y_don">
                                                <input type="checkbox" value="1" required="" /> Xác nhận đồng ý đơn hàng 
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                                <div className="clear" />
                            </form> 
                        </div>
                    </section>
	            </div>
            </div> 
        </>
    );
};

export default Payment;
