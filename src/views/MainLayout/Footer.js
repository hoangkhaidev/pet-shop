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
