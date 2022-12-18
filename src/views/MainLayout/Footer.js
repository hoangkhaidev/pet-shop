/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
// ==============================|| MAIN LAYOUT ||============================== //
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    const topFunction = () => {
        window.scrollTo(0, 0);
    };

    return (
        <footer className="site-footer">
            <div className="footer-top dis-none-laptop dis-block">
                <div>
                    <h2 className="footer-h2">Recent Posts</h2>
                    <ul className="footer-menu">
                        <li className="footer-item">
                            <Link to="/news/liverpool-legend-rejects-transfer-of-cody-gakpo-and-identifies-ideal-luis-diaz-replacement-kansan/">
                                Liverpool legend rejects transfer of Cody Gakpo and identifies ideal Luis Diaz replacement
                            </Link>
                        </li>
                        <li className="footer-item">
                            <Link to="/news/manchester-city-signed-a-contract-to-sign-rafael-leao-with-an-attractive-salary-kansan/">
                                Manchester City signed a contract to sign Rafael Leao with an attractive salary
                            </Link>
                        </li>
                        <li className="footer-item">
                            <Link to="/news/ten-hag-has-bought-man-utds-next-pogba-by-signing-a-young-world-cup-star-worth-17-million-kansan/">
                                Ten Hag has bought Man Utd’s next Pogba by signing a young World Cup star worth £ 17 million
                            </Link>
                        </li>
                        <li className="footer-item">
                            <Link to="/news/2022-world-cup-manchester-united-legend-explains-real-reason-why-messi-wants-to-win-world-cup-marie/">
                                2022 World Cup: Manchester United Legend Explains Real Reason Why Messi Wants to Win World Cup
                            </Link>
                        </li>
                        <li className="footer-item">
                            <Link to="/news/juventus-star-hoping-to-start-the-world-cup-final-marie/" rel="bookmark">
                                Juventus star hoping to start the World Cup final
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="dis-flex">
                    <div style={{width: '50%'}}>
                        <h2 className="footer-h2">Categories</h2>
                        <ul className="footer-menu"> 
                            <li className="footer-item">
                                <Link to="/categories/boston-celtics">
                                    Boston Celtics
                                </Link>    
                            </li>
                            <li className="footer-item">
                                <Link to="/categories/chicago-bulls">
                                    Chicago Bulls
                                </Link> 
                            </li>
                            <li className="footer-item">
                                <Link to="/categories/golden-state-warriors">
                                    Golden State Warriors
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link to="/categories/los-angeles-lakers">
                                    Los Angeles Lakers
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link to="/categories/miami-heat">
                                    Miami Heat
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div style={{marginLeft: '30px'}}>
                        <h2 className="footer-h2">More</h2>
                        <ul className="footer-menu">
                            <li className="footer-item">
                                <Link to="/">
                                    RSS
                                </Link>    
                            </li>
                            <li className="footer-item">
                                <Link to="/">
                                    Sitemap
                                </Link> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="site-bottom">
                <div className="container" style={{ justifyContent: 'center'}}>
                    <div className="site-info">
                        © 2022 <Link to="/">Fav Sporting</Link> - Design by <Link to="https://wpenjoy.com">Fav Sporting</Link>
                    </div>
                </div>
            </div>
            <button onClick={() => topFunction()} id="btn_to_top" type="button" title="Go to top" style={{display: 'block'}}>
                <i className="fa fa-arrow-circle-up" aria-hidden="true" />
                <FontAwesomeIcon
                    icon={faArrowCircleUp}
                    size={'1x'}
                    style={{ cursor: 'pointer', color: '#fff' }} 
                />
            </button>
        </footer>
    );
};

export default Footer;
