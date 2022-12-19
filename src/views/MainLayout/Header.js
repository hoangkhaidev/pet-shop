/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState } from 'react';

const Header = () => {

    const [searchName, setSearchName] = useState('');

    const handleChangeSearch = (e) => {
        setSearchName(e.target.value);
    }

    const [dataCategories, setDataCategories] = useState([]);

    const onGetCategories = async() => {
        const res = await fetch(
        `https://aweu.info/wp-json/wp/v2/categories`,
        {
            method: 'GET',
        }
        );
        const test = await res.json();
        setDataCategories(test);
    }

    useEffect (() => {
        onGetCategories();
    }, []);

    return (
        <>
            <header className="site-header ">
                <div className="container dis-block padd-0">
                    <div className="logo">
                        <h1>
                            <Link to="/">Fav Sporting</Link>
                        </h1>
                    </div>
                    <div className="menu">
                        <ul className="primary-menu">
                            {dataCategories?.map((item, index) => {
                                if (item.parent > 0 && index < 7) {
                                    return (
                                        <li key={item?.id} className="menu-item">
                                            <a href={item?.link}>
                                                <span className="menu-text">{item?.name}</span>
                                            </a>    
                                        </li>
                                    );
                                } return <div key={item?.id}></div>;
                            })}
                        </ul>
                    </div>
                    <div className="header-search">
                        <div className="div-search">
                            <input type="text" value={searchName} name="search" onChange={handleChangeSearch} className="search-input" placeholder="Search" />
                            <a href={`https://aweu.info/?=${searchName}`} className="search-submit">
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    size={'1x'}
                                    style={{ cursor: 'pointer', color: '#fff', fontSize: '14px', marginTop: '12px' }} 
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;