/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Breadcrumbs from "views/Breadcrumbs/Breadcrumbs";
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const Cart = () => {

    const paramsChild = {
        name: 'Trang giỏ hàng',
        url: ''
    }

    return (
        <>
            <div id="mm-0" className="mm-page mm-slideout">
                <Breadcrumbs paramsChild={paramsChild} />
                <div className="container-fluid container-bg-w" style={{height: 'auto !important'}}>
                    <section className="product-left-to-right container">
                        <div className="content_tin" id="list_gio_hang">
                            <div className="red-line-under" />
                            <div className="cart_container boxy-content" id="cart_container" style={{display: 'block'}}>
                                <div id="module_productscart" className="block">
                                    <div id="showempty" />
                                    <div id="showcart" className="blockcontent">
                                        <div className="cartintro">Bạn có <span className="shownumber">2</span> sản phẩm trong giỏ</div>
                                        <table width="100%">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div id="contentcart" className="showboxcart">
                                                            <table width="100%" className="productscart">
                                                                <thead>
                                                                    <tr>
                                                                        <th width="30%" align="left" >Sản phẩm trong giỏ</th>
                                                                        <th width="10%">Giá bán</th>
                                                                        <th width="10%">Số lượng</th>
                                                                        <th width="10%">Thành tiền</th>
                                                                        <th />
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr id="cam8367">
                                                                        <td nowrap="nowrap" style={{display: 'flex'}}>
                                                                            <a style={{width: '50px'}} href="/san-pham/thuc-an-cho-cho-truong-thanh-giong-dai-luvcare-1-5kg">
                                                                                <img width="40" height="50" src="https://petshopsaigon.vn/wp-content/uploads/2022/11/thuc-an-cho-cho-truong-thanh-giong-dai-luvcare-15kg-1-300x300.png" alt="san pham" />
                                                                            </a>
                                                                            <div className="productname">
                                                                                <a title="[SỐ 1 THÁI LAN] Thức ăn cho chó trưởng thành giống đại LuvCare 1.5kg" href="/san-pham/thuc-an-cho-cho-truong-thanh-giong-dai-luvcare-1-5kg">
                                                                                    [SỐ 1 THÁI LAN] Thức ăn cho chó trưởng thành giống đại LuvCare 1.5kg<br />
                                                                                    Mã: <b />
                                                                                    <br />
                                                                                    Thương Hiệu : <b> LuvCare</b> <br />
                                                                                    Danh mục : <b>Shop Thú Y </b><br />
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                        <td width="20%">
                                                                            <div className="prices">120000</div>
                                                                            <span className="rootprice">150000</span>
                                                                        </td>
                                                                        <td width="20%" className="quantity">
                                                                            <input style={{ minWidth: '100px'}} type="text" className="text_soluong" name="so_luong_sp_88310 " value="9" /> <br />
                                                                            <a href="/trang-gio-hang?task=add&amp;product_id=88310&amp;product_so_luong=1" style={{ marginRight: '3px' }}>
                                                                                <img src="https://petshopsaigon.vn/wp-content/themes/template/images/img_cong.png" alt="plus"/>
                                                                            </a>
                                                                            <a href="/trang-gio-hang?task=giam_soluong&amp;product_id=88310&amp;product_so_luong=1">
                                                                                <img src="https://petshopsaigon.vn/wp-content/themes/template/images/img_tru.png" alt="minus" />
                                                                            </a>
                                                                        </td>
                                                                        <td width="20%">
                                                                            <span className="str_thanh_tien" />
                                                                            <span id="cart-intoMoney8367" className="tr_right"> 1.080.000 ₫</span>
                                                                        </td>
                                                                        <td className="tr_none">
                                                                            <span className="tr_right" id="cart-intoMoney8367"> + 10800</span> 
                                                                        </td>
                                                                        <td>
                                                                            <a href="/trang-gio-hang?product_id=88310&amp;task=delete">
                                                                                <img src="https://petshopsaigon.vn/wp-content/themes/template/images/x.png" alt="delete"/>
                                                                                <span className="str_huy" >Xoá</span>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr id="cam8367">
                                                                        <td nowrap="nowrap" style={{display: 'flex'}}>
                                                                            <a href="/san-pham/do-choi-meo-quao-hinh-trai-tim-mon-ami-toy-cat">
                                                                                <img width="40" height="50" src="https://petshopsaigon.vn/wp-content/uploads/2019/10/do-choi-meo-quao-hinh-trai-tim-mon-ami-toy-cat-1-300x300.jpg" alt="san pham"/>
                                                                            </a>
                                                                            <div className="productname">
                                                                                <a title="Đồ Chơi Mèo Quào Hình Trái Tim Mon Ami Toy Cat" href="/san-pham/do-choi-meo-quao-hinh-trai-tim-mon-ami-toy-cat">
                                                                                    Đồ Chơi Mèo Quào Hình Trái Tim Mon Ami Toy Cat<br />
                                                                                    Mã: <b />
                                                                                    <br />
                                                                                    Thương Hiệu : <b> Mon Ami</b> <br />
                                                                                    Danh mục : <b>Đồ chơi cho mèo </b><br />
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                        <td width="20%">
                                                                            <div className="prices">120000</div>
                                                                            <span className="rootprice">150000</span>
                                                                        </td>
                                                                        <td width="20%" className="quantity">
                                                                            <input style={{ minWidth: '100px'}} type="text" className="text_soluong" name="so_luong_sp_88310 " value="9" /> <br />
                                                                            <a href="/trang-gio-hang?task=add&amp;product_id=88310&amp;product_so_luong=1" style={{ marginRight: '3px' }}>
                                                                                <img src="https://petshopsaigon.vn/wp-content/themes/template/images/img_cong.png" alt="plus"/>
                                                                            </a>
                                                                            <a href="/trang-gio-hang?task=giam_soluong&amp;product_id=88310&amp;product_so_luong=1">
                                                                                <img src="https://petshopsaigon.vn/wp-content/themes/template/images/img_tru.png" alt="minus" />
                                                                            </a>
                                                                        </td>
                                                                        <td width="20%">
                                                                            <span className="str_thanh_tien" />
                                                                            <span id="cart-intoMoney8367" className="tr_right"> 1.080.000 ₫</span>
                                                                        </td>
                                                                        <td width="5%">
                                                                            <a href="/trang-gio-hang?product_id=88310&amp;task=delete">
                                                                                <img width='24' height='24' src="https://petshopsaigon.vn/wp-content/themes/template/images/x.png" alt="delete"/>
                                                                                <span className="str_huy" >Xoá</span>
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <table width="100%" style={{ marginTop: '10px' }}>
                                                            <tbody>
                                                                <tr>
                                                                    <td width="70%">
                                                                        {/* <form method="post" id="coupon">
                                                                            <table width="100%" id="displayform">
                                                                                <tbody>
                                                                                    <tr className="">
                                                                                        <td width="30%"><b>Dùng điểm thưởng</b></td>
                                                                                        <td width="70%" id="couponform">
                                                                                            <input type="checkbox" name="tich_luy_diem" placeholder="Nhập mã nếu có" style={{marginRight: '3px'}}/>
                                                                                            Sử dụng điểm thưởng tích lũy khi mua hàng
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <table width="100%" id="displayform">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td width="30%"><b>Mã giảm giá</b></td>
                                                                                        <td width="70%" id="couponform">
                                                                                            <input type="text" name="couponcode" value="" placeholder="Nhập mã nếu có" />
                                                                                            <input type="submit" value="Áp dụng" name="ma_giam_gia" className="bluebuttom" />
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </form> */}
                                                                        <a href="/">
                                                                        <FontAwesomeIcon
                                                                            icon={faPlay}
                                                                            size={'1x'}
                                                                            style={{ cursor: 'pointer', marginRight: '3px' }} 
                                                                        /> Thêm sản phẩm khác vào giỏ hàng
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <table width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td className="cardtool"><b>Tổng tiền:</b></td>
                                                                                    <td className="cart-subtotal cardtool">
                                                                                        <span id="cart-subtotal"> 1.168.000 đ </span>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style={{borderBottom:'1px solid #ccc'}} />
                                                                                </tr>
                                                                                <tr>
                                                                                    <td className="cardtool">
                                                                                        <b>Thành tiền:</b>
                                                                                    </td>
                                                                                    <td className="cart-subtotal cardtool">
                                                                                        <span id="cart-total"><b> 1.168.000 đ </b></span>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr className="actions1">
                                                                    <td>
                                                                        {/* <a href="/">
                                                                            <i className="fa fa-play" /> Thêm sản phẩm khác vào giỏ hàng
                                                                        </a> */}
                                                                    </td>
                                                                    <td style={{paddingTop:'10px'}}>
                                                                        <a className="redbuttom" href="/hinh-thuc-thanh-toan">Thực hiện thanh toán</a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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

export default Cart;
