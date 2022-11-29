/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import Breadcrumbs from "views/Breadcrumbs/Breadcrumbs";
import ItemProduct from "views/Product/ItemProduct";

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const News = () => {

    const params = {
        name: 'Tin tức',
        url: ''
    }

    const paramsChild = {
        name: 'Top 5 thức ăn cho mèo 4 tháng tuổi nên mua nhất Việt Nam',
        url: ''
    }

    return (
        <>
            <div id="mm-0" className="mm-page mm-slideout">
                <Breadcrumbs paramsChild={paramsChild} params={params} />
                <div className="container-fluid container-bg-w" style={{height: 'auto !important'}}>
	                <section className="product-left-to-right container" style={{height: 'auto !important'}}>
                        <div id="main_contener" style={{height: 'auto !important'}}>
                            <div id="container" style={{height: 'auto !important'}}>
		                        <div id="module_staticView" className="block" style={{height: 'auto !important'}}>
		                            <h1 className="tr_tieu_de">{paramsChild.name}</h1>
                                    <div className="d_count_views">9974 lượt xem</div>
                                    <div className="blockcontent" style={{height: 'auto !important'}}>
                                        <div className="tr_content" style={{height: 'auto !important'}}>
                                            <p style={{textAlign: 'justify'}}>
                                                <span style={{fontWeight: '400', fontSize: '14pt'}}>
                                                    <span style={{color: '#ff6600'}}>
                                                        <a style={{color: '#ff6600'}} href="https://petshopsaigon.vn/danh-muc/hat-thuc-an-cho-meo" rel="noopener">
                                                            <span style={{textDecoration: 'underline'}}>
                                                                <strong>Thức ăn cho mèo</strong>
                                                            </span>
                                                        </a>
                                                    </span> 4 tháng tuổi nên mua loại gì và chọn ra sao cho phù hợp nhất? Để nuôi dưỡng mèo con khỏe mạnh, thì bạn cần cung cấp cho chúng dinh dưỡng hợp lý trong mọi giai đoạn của cuộc đời. Việc cho ăn thoạt nhìn có vẻ đơn giản, nhưng còn rất nhiều điều bạn chưa biết trong cách cho một chú mèo 16 tuần tuổi ăn.
                                                </span>
                                            </p>
                                            <p style={{textAlign: 'justify'}}>
                                                <span style={{fontSize: '14pt'}}>
                                                    <span style={{fontWeight: '400'}}>
                                                        Việc cho mèo 4 tháng tuổi ăn cần phải dựa trên nhu cầu của chúng và lời khuyên từ bác sĩ thú y. Nói chung, bạn cần cho mèo ăn ít nhất 4 bữa một ngày, với khẩu phần ăn từ 1/3 đến 3/4 cup cho mỗi bữa. 
                                                    </span>
                                                    <span style={{fontWeight: '400'}}>
                                                        Mời bạn xem bài viết bên dưới để có thể tìm hiểu được những loại thức ăn cho mèo 4 tháng tuổi tốt nhất ở Việt Nam nhé.
                                                    </span>
                                                </span>
                                            </p>
                                            <hr />
                                        </div>
                                    </div>
	                            </div>
	                            <div className="clear" />
	                        </div>
                        </div>
                        <div className="umt_d_rela_products" style={{height: 'auto !important'}}>
                            <h2 className="tr_tieu_de">Sản phẩm liên quan </h2>
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
                        <h2 className="tr_tieu_de" style={{marginTop: '30px'}}> Tin tức mới </h2>
                        <div className="tin_khac">
                            <div className="noi_dung">
                                <div className="img">
                                    <a href="https://petshopsaigon.vn/tin-tuc/cho-con-an-chao-duoc-khong">
                                        <img src="https://petshopsaigon.vn/wp-content/uploads/2022/11/cho-con-an-chao-duoc-khong-1-300x218.jpg" alt="tin tuc" />
                                    </a>
                                </div>
                                <h3>
                                    <a href="https://petshopsaigon.vn/tin-tuc/cho-con-an-chao-duoc-khong">Chó con ăn cháo được không?</a>
                                </h3>
                                <p className="expert"> Cháo rất tốt cho con người, vậy còn người bạn bốn chân của chúng ta thì sao? Chúng tôi có một tin tốt dành cho những người yêu thích cháo đó là loài&nbsp;chó có thể ăn cháo.&nbsp;Lý do bởi vì cháo không những ...</p>
                                <a href="https://petshopsaigon.vn/tin-tuc/cho-con-an-chao-duoc-khong" className="xem_the">Xem thêm</a>
                                <div className="clear" />
                            </div>
                            <div className="clear" />
                                <div className="noi_dung">
                                    <div className="img">
                                        <a href="https://petshopsaigon.vn/tin-tuc/mo-thay-meo-me-va-meo-con">
                                            <img src="https://petshopsaigon.vn/wp-content/uploads/2022/11/mo-thay-meo-me-va-meo-con-1-300x218.jpg" alt="tin tuc" />
                                        </a>
                                    </div>
                                    <h3>
                                        <a href="https://petshopsaigon.vn/tin-tuc/mo-thay-meo-me-va-meo-con">Mơ thấy mèo mẹ và mèo con là điềm gì?</a>
                                    </h3>
                                    <p className="expert"> Mơ thấy mèo mẹ và mèo con mang ý nghĩa gì? Cùng giải mã bí ẩn đằng sau việc mơ thấy mèo mẹ và mèo con trong bài chia sẻ bên dưới đây bạn nhé!</p>
                                    <a href="https://petshopsaigon.vn/tin-tuc/mo-thay-meo-me-va-meo-con" className="xem_the">Xem thêm</a>
                                    <div className="clear" />
                                </div>
                                <div className="clear" />
                                <div className="noi_dung">
                                    <div className="img">
                                        <a href="https://petshopsaigon.vn/tin-tuc/be-cho-con-nhieu-co-sao-khong">
                                            <img src="https://petshopsaigon.vn/wp-content/uploads/2022/11/be-cho-con-nhieu-co-sao-khong-1-300x218.jpg" alt="tin tuc" />
                                        </a>
                                    </div>
                                    <h3>
                                        <a href="https://petshopsaigon.vn/tin-tuc/be-cho-con-nhieu-co-sao-khong">Bế chó con nhiều có sao không?</a>
                                    </h3>
                                    <p className="expert"> Bế chó con nhiều có sao không? Trên thực tế, không gì đáng yêu hơn một chú chó con mềm mại, lông mịn màng cả. Bế cún không những giúp gia tăng tình cảm giữa bạn và cún mà còn giúp cún tránh tiếp xúc ...</p>
                                    <a href="https://petshopsaigon.vn/tin-tuc/be-cho-con-nhieu-co-sao-khong" className="xem_the">Xem thêm</a>
                                    <div className="clear" />
                                </div>
                                <div className="clear" />
                                <div className="noi_dung">
                                    <div className="img">
                                        <a href="https://petshopsaigon.vn/tin-tuc/meo-con-non-ra-bot-trang">
                                            <img src="https://petshopsaigon.vn/wp-content/uploads/2022/11/meo-con-non-ra-bot-trang-1-300x218.jpg" alt="tin tuc" />
                                        </a>
                                    </div>
                                    <h3>
                                        <a href="https://petshopsaigon.vn/tin-tuc/meo-con-non-ra-bot-trang">Mèo con nôn ra bọt trắng có nguyên nhân từ đâu?</a>
                                    </h3>
                                    <p className="expert"> Những lý do phổ biến khiến mèo nôn ra bọt bao gồm viêm hoặc kích ứng hệ tiêu hóa, nuốt phải dị vật như dây, ký sinh trùng bên trong, nhiễm trùng do vi khuẩn hoặc virus, bệnh toàn thân như các vấn đề ...</p>
                                    <a href="https://petshopsaigon.vn/tin-tuc/meo-con-non-ra-bot-trang" className="xem_the">Xem thêm</a>
                                    <div className="clear" />
                                </div>
                                <div className="clear" />
                                <div className="noi_dung">
                                    <div className="img">
                                        <a href="https://petshopsaigon.vn/tin-tuc/cho-con-an-dat-cat">
                                            <img src="https://petshopsaigon.vn/wp-content/uploads/2022/11/cho-con-an-dat-cat-1-300x218.jpg" alt="tin tuc" />
                                        </a>
                                    </div>
                                    <h3>
                                        <a href="https://petshopsaigon.vn/tin-tuc/cho-con-an-dat-cat">Chó con ăn đất cát có sao không?</a>
                                    </h3>
                                    <p className="expert"> Những hạt cát tuy rất nhỏ nhưng khi gặp nước sẽ trở nên nặng và kết lại thành một khối rắn.&nbsp;Bất kể là cún nuốt phải loại cát nào thì chúng đều sẽ ướt khi đi vào cơ thể - và nếu cún nuốt quá nhiều thì ...</p>
                                    <a href="https://petshopsaigon.vn/tin-tuc/cho-con-an-dat-cat" className="xem_the">Xem thêm</a>
                                    <div className="clear" />
                                </div>
                                <div className="clear" />
                        </div>
                    </section>
	            </div>
            </div>  
        </>
    );
};

export default News;
