/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import Breadcrumbs from "views/Breadcrumbs/Breadcrumbs";


// styles

// ==============================|| MAIN LAYOUT ||============================== //

const Contact = () => {
   
    const paramsChild = {
        name: 'Thông tin liên hệ',
        url: ''
    }

    return (
        <>
            <div id="mm-0" className="mm-page mm-slideout">
                <Breadcrumbs paramsChild={paramsChild} />
                <div className="container-fluid container-bg-w" style={{height: 'auto !important'}}>
	                <section className="product-left-to-right container" style={{height: 'auto !important'}}>
                        <div id="main_contener" style={{height: 'auto !important'}}>
                            <div id="container" style={{height: 'auto !important'}}>
		                        <div id="module_staticView" className="block" style={{height: 'auto !important'}}>
		                            <h1 className="tr_tieu_de">Thông tin liên hệ</h1>
                                    <div className="tr_content">
                                        <div className="tr_content">
                                            <div className="row-fluid" style={{height:'420px'}}>
                                                <div className="map">
                                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d244.9473845645533!2d106.7390074779952!3d10.799196481307277!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527b22b7c5cad%3A0xfae9760685f9c8d0!2zVmlldHN1biBHcm91cCAtIEPDtG5nIHR5IGPhu5UgcGjhuqduIMSR4bqndSB0xrAgxJHhu4thIOG7kWMgVmlldHN1bg!5e0!3m2!1svi!2s!4v1668679100557!5m2!1svi!2s" width="600" height="450" style={{border:'0'}} loading="lazy" title="Pet Shop" referrerpolicy="no-referrer-when-downgrade" />
                                                </div>
                                                <div className="clear" />
                                            </div> 		
                                            <article className="clearfix content-contact"> 
                                                <div className="clear" />
                                                <div className="row-fluid">
                                                    <div className="column_container">
                                                        <header className="sectionTitle clearfix">
                                                                <h3><strong>Liên hệ </strong></h3>
                                                        </header> 
                                                        <section className="rbText clearfix autop" style={{lineHeight:'20px'}}>		
                                                            <h3><strong>HỘ KINH DOANH THÚ CƯNG SÀI GÒN</strong></h3>
                                                            <p><strong>Địa chỉ:&nbsp;</strong>05 đường 11B, KDC Dương Hồng, Bình Hưng, Bình Chánh, TPHCM</p>
                                                            <p><strong>Số ĐKKD:</strong> 41T8028323 do UBND Huyện Bình Chánh cấp ngày 06/01/2020</p>
                                                            <p><strong>Người chịu trách nhiệm:</strong> Lê Trọng Nhân</p>
                                                            <p><strong>Địa chỉ thường trú:</strong> 179S Trần Văn Đang, P.10, Q.3, TPHCM</p>
                                                            <p><strong>Điện thoại:</strong> 0976.299.155</p>
                                                        </section> 
                                                    </div>  
                                                </div>
                                            </article>	
                            
                                        </div>
                                    </div>
	                            </div>
	                            <div className="clear" />
	                        </div>
                        </div>
                    </section>
	            </div>
            </div>    
        </>
    );
};

export default Contact;
