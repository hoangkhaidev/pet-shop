/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import Breadcrumbs from "views/Breadcrumbs/Breadcrumbs";

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const SuccessPayment = () => {

    const paramsChild = {
        name: 'Trang thông báo',
        url: ''
    }

    return (
        <>
            <div id="mm-0" className="mm-page mm-slideout">
                <Breadcrumbs paramsChild={paramsChild} />
                <div className="container-fluid container-bg-w" style={{height: 'auto !important'}}>
                    <section className="product-left-to-right container">
                        <div id="main_contener">
                            <div id="container">
                                <div id="module_staticView" className="block">
                                    <div className="blockcontent">
                                        <div className="content">
                                            <div className="form">
                                                <div className="form_header">
                                                    <h3>Cảm ơn bạn đã đặt hàng</h3>
                                                </div>
                                                <div className="form_body">
                                                    <div className="thong_bao">
                                                        Đơn đặt hàng của bạn đã gửi đến chúng tôi.<br /> Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất							 
                                                    </div>
                                                </div>	
                                                <div className="form_footer" />				
                                            </div> 
                                        </div>		
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

export default SuccessPayment;
