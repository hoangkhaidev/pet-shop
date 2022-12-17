/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { Link } from "react-router-dom";

// ==============================|| MAIN LAYOUT ||============================== //

const ItemProduct = () => {
    
    return (
        <>
            <div className="div-post-thumbnail">	
                <Link className="thumbnail-link" to="/news/following-lionel-messis-nightmare-chelsea-issued-a-transfer-warning-to-josko-gvardiol-kansan">
                    <div className="thumbnail-wrap">
                        <img width="300" height="300" src="https://favsporting.com/wp-content/uploads/2022/12/chel-32-300x300.jpg" className="post-thumbnail" alt="thumbnail post" />
                    </div>
                </Link>
                <div className="post-category">
                    <Link to="/categories/premier-league">Premier League</Link> 	
                </div>		
                <h2 className="post-title">
                    <Link to="/news/following-lionel-messis-nightmare-chelsea-issued-a-transfer-warning-to-josko-gvardiol-kansan">
                        Following Lionel Messi’s nightmare, Chelsea issued a transfer warning to Josko Gvardiol.
                    </Link>
                </h2>
                <div className="post-meta">
                    <span className="post-author">
                        <Link to="/categories/an-xao-loi" title="Posts by kansan">kansan</Link>
                    </span> 
                    <span className="post-date">December 16, 2022</span>
                    <span className="post-comment">
                        <Link to="/news/following-lionel-messis-nightmare-chelsea-issued-a-transfer-warning-to-josko-gvardiol-kansan" className="comments-link">
                            0 Comment
                        </Link>
                    </span>
                </div>
                <div className="post-summary">
                    <p>Ϲhelsea have beeп iпformed they “doп’t пeed” Josko Gvardiol despite the Blues’ liпks with a big-moпey swoop for the defeпder. The Ϲroatiaп shoпe duriпg his пatioп’s ruп to… </p>
                </div>
            </div>
        </>
    );
};

export default ItemProduct;
