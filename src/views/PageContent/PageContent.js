/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import Breadcrumbs from "views/Breadcrumbs/Breadcrumbs";

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const PageContent = () => {
    const params = {
        name: 'Hướng dẫn',
        url: ''
    }
    const paramsChild = {
        name: 'Hướng dẫn đặt hàng',
        url: ''
    }
    return (
        <>
            <div id="mm-0" className="mm-page mm-slideout">
                <Breadcrumbs params={params} paramsChild={paramsChild} />
                <div className="container"> 
                    <div id="layoutGroup41" className="sortable"> 
                        <div id="module_listproducts" className="block">
                            <h1 className="tr_tieu_de"> Hướng dẫn thanh toán</h1>
                            <div className="intro" />
                            <div className="clear" />
                            
                            <div className="clear" />
                            <div className="blockcontent">
                                <div className="tr_content">
                                    <p><span style={{fontWeight: '400'}}>PetshopSaigon.vn có 3 cách thức thanh toán chính đó là: thanh toán khi nhận hàng COD, thanh toán chuyển khoản và thanh toán qua ứng dụng thanh toán/ví điện tử.&nbsp;</span></p>
                                    <p><span style={{fontWeight: '400'}}>Trong trường hợp khách hàng cần phương thức thanh toán khác, vui lòng liên hệ trực tiếp với PetshopSaigon.vn.</span></p>
                                    <ul>
                                        <li style={{fontWeight: '400'}}><span style={{fontWeight: '400'}}>Thanh toán khi nhận hàng (COD) cho nhân viên giao hàng.</span></li>
                                        <li style={{fontWeight: '400'}}><span style={{fontWeight: '400'}}>Thanh toán trước qua chuyển khoản ngân hàng: Quý khách có thể chuyển khoản qua STK 0511000441806 – Lê Trọng Nhân – Chi nhánh Vietcombank</span></li>
                                        <li style={{fontWeight: '400'}}><span style={{fontWeight: '400'}}>Thanh toán qua ứng dụng thanh toán/ví điện tử: Quý khách có thể thanh toán qua ví điện tử Momo/Airpay – 0976299155</span></li>
                                    </ul>
                                    <p><span style={{fontWeight: '400'}}>Sau khi chuyển khoản xong, quý khách hàng vui lòng gửi ủy nhiệm chi, sao kê hoặc chụp ảnh màn hình gửi PetshopSaigon.vn qua zalo, viber, inbox fanpage.&nbsp;</span></p>
                                    <p><span style={{fontWeight: '400'}}>Nếu khách hàng cần số tài khoản ngân hàng khác các ngân hàng bên dưới, vui lòng liên hệ trực tiếp với PetshopSaigon.vn.&nbsp;</span></p>
                                    <p><span style={{fontWeight: '400'}}>Lưu ý: PetshopSaigon.vn chỉ chuẩn bị và đóng hàng khi nhận được thông báo chuyển tiền từ ngân hàng.</span></p>
                                </div>		
                            </div>
                        </div>
                    </div>	
                </div>
            </div>
        </>
    );
};

export default PageContent;
