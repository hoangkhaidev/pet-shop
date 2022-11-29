/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

// ==============================|| MAIN LAYOUT ||============================== //

const Breadcrumbs = ({params, paramsChild}) => {
    return (
        <>
            <div className="brecum container">
                <div className="breadcrumbs">
                    {/* <!-- Breadcrumb NavXT 6.3.0 --> */}
                    <span property="itemListElement" typeof="ListItem">
                        <a title="Go to PET SHOP Sài Gòn - PET STORE TP.HCM bán Thức Ăn Phụ Kiện cho Chó và Mèo Uy Tín - Chính Hãng." href="/" className="home">
                            <span property="name">PET SHOP Sài Gòn - PET STORE TP.HCM bán Thức Ăn Phụ Kiện cho Chó và Mèo Uy Tín - Chính Hãng</span>
                        </a>
                        <meta property="position" content="1" />
                    </span> &gt; 
                    {(params) && (
                        <>
                            <span property="itemListElement" typeof="ListItem">
                                <a title="Go to Hướng dẫn." href={params?.url} className="post post-huong-dan-archive">
                                    <span property="name">{params?.name}</span>
                                </a>
                                <meta property="position" content="2" />
                            </span> &gt;
                        </>
                    )}
                    <span className="post post-huong-dan current-item">{paramsChild?.name}</span>
                </div>		
            </div>
            <div className="clear" />
        </>
    );
};

export default Breadcrumbs;
