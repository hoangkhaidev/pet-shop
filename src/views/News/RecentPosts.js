/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";

// styles

// ==============================|| MAIN LAYOUT ||============================== //

const RecentPosts = () => {

    const [dataPosts, setDataPosts] = useState([]);

    const onGetPosts = async() => {
        const res = await fetch(
        `https://aweu.info/wp-json/wp/v2/posts`,
        {
            method: 'GET',
        }
        );
        const test = await res.json();
        setDataPosts(test);
    }

    useEffect (() => {
        onGetPosts();
    }, []);

    return (
        <>
            <aside className="content-secondary dis-none">
                <div className="widget-posts-thumbnail" style={{ height: 'auto !important' }}>
                    <h2 className="widget-title">Recent Posts</h2>
                    <ul>
                        {/* <li className="clear">
                            <Link to="/news/following-lionel-messis-nightmare-chelsea-issued-a-transfer-warning-to-josko-gvardiol-kansan/">
                                <div className="thumbnail-wrap">
                                    <img width="300" height="150" src="https://favsporting.com/wp-content/uploads/2022/12/chel-32-300x150.jpg" className="wp-post-image" alt="post-sadsasd-title" />
                                </div>
                                <div className="entry-wrap">
                                    Following Lionel Messi’s nightmare, Chelsea issued a transfer warning to Josko Gvardiol.
                                </div>
                                <div className="gradient" style={{ display: 'block' }} />
                            </Link>
                        </li> */}

                        {dataPosts?.map((item, index) => {
                            if (index === 0) {
                                return (
                                    <li className="clear" key={item.id}>
                                        <a href={item.link}>
                                            <div className="thumbnail-wrap">
                                                <img width="300" height="150" src={item.yoast_head_json?.og_image[0]?.url} className="wp-post-image" alt="post-sadsasd-title" />
                                            </div>
                                            <div className="entry-wrap">
                                                {item.yoast_head_json?.og_title}
                                            </div>
                                            <div className="gradient" style={{ display: 'block' }} />
                                        </a>
                                    </li>
                                )
                            } 
                            return (
                                <li className="post-list post-list-1" key={item.id}>
                                    <span>{index}</span>
                                    <a href={item.link}>
                                        {item.yoast_head_json?.og_title}
                                    </a>
                                </li>
                            )
                        })}
                        {/* <li className="post-list post-list-1">
                            <span>1</span>
                            <Link to="/news/liverpool-legend-rejects-transfer-of-cody-gakpo-and-identifies-ideal-luis-diaz-replacement-kansan/">
                                Liverpool legend rejects transfer of Cody Gakpo and identifies ideal Luis Diaz replacement
                            </Link>
                        </li>
                        <li className="post-list post-list-2">
                            <span>2</span>
                            <Link to="/news/manchester-city-signed-a-contract-to-sign-rafael-leao-with-an-attractive-salary-kansan/">
                                Manchester City signed a contract to sign Rafael Leao with an attractive salary
                            </Link>
                        </li>
                        <li className="post-list post-list-3">
                            <span>3</span>
                            <Link to="/news/ten-hag-has-bought-man-utds-next-pogba-by-signing-a-young-world-cup-star-worth-17-million-kansan/">
                                Ten Hag has bought Man Utd’s next Pogba by signing a young World Cup star worth £ 17 million
                            </Link>
                        </li>
                        <li className="post-list post-list-4">
                            <span>4</span>
                            <Link to="/news/2022-world-cup-manchester-united-legend-explains-real-reason-why-messi-wants-to-win-world-cup-marie/">
                                2022 World Cup: Manchester United Legend Explains Real Reason Why Messi Wants to Win World Cup
                            </Link>
                        </li>
                        <li className="post-list post-list-5">
                            <span>5</span>
                            <Link to="/news/juventus-star-hoping-to-start-the-world-cup-final-marie/" rel="bookmark">
                                Juventus star hoping to start the World Cup final
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default RecentPosts;
