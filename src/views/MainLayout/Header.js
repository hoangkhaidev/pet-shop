/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

// material-ui
import './style.scss';
// ==============================|| MAIN LAYOUT ||============================== //
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Header = () => {

    const [searchName, setSearchName] = useState('');

    const handleChangeSearch = (e) => {
        setSearchName(e.target.value);
    }

    return (
        <>
            <header className="site-header">
                <div className="container">
                    <div className="logo">
                        <h1>
                            <Link to="/">Fav Sporting</Link>
                        </h1>
                    </div>
                    <div className="menu">
                        <ul className="primary-menu">
                            <li className="menu-item">
                                <Link to="/categories/boston-celtics">
                                    <span className="menu-text">Boston Celtics</span>
                                </Link>    
                            </li>
                            <li className="menu-item">
                                <Link to="/categories/chicago-bulls">
                                    <span className="menu-text">Chicago Bulls</span>
                                </Link> 
                            </li>
                            <li className="menu-item">
                                <Link to="/categories/golden-state-warriors">
                                    <span className="menu-text">Golden State Warriors</span>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link to="/categories/los-angeles-lakers">
                                    <span className="menu-text">Los Angeles Lakers</span>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link to="/categories/miami-heat">
                                    <span className="menu-text">Miami Heat</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="header-search">
                        <div className="div-search">
                            <form>
                                <input type="text" value={searchName} name="search" onChange={handleChangeSearch} className="search-input" placeholder="Search" />
                                <button type="button" className="search-submit">
                                    <Link to={`/trang-thong-tin-tim-kiem?search=${searchName}`} >
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            size={'1x'}
                                            style={{ cursor: 'pointer', color: '#fff', fontSize: '14px' }} 
                                        />
                                    </Link>
                                </button>		
                            </form>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;