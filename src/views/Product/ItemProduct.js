/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import moment from "moment";

// ==============================|| MAIN LAYOUT ||============================== //

const ItemProduct = ({ type, image, title, url, idCate, description, idAuthor, createdDate }) => {

    const [dataCate, setDataCate] = useState({});
    const [dataAuthor, setDataAuthor] = useState({});

    const dayTime = moment(createdDate).format("DD-MM-YYYY");

    const onGetCategories = async() => {
        const res = await fetch(
        `https://aweu.info/wp-json/wp/v2/categories`,
        {
            method: 'GET',
        }
        );
        const test = await res.json();
        const itemCate = test.find((item) => {
            return item.id === idCate[0];
        });

        setDataCate(itemCate);
    }

    const onGetUsers = async() => {
        const res = await fetch(
        `https://aweu.info/wp-json/wp/v2/users/`,
        {
            method: 'GET',
        }
        );
        const test = await res.json();
        const itemAuthor = test.find((item) => {
            return item.id === idAuthor;
        });

        setDataAuthor(itemAuthor);
    }

    useEffect (() => {
        onGetCategories();
        onGetUsers();
    }, []);
    
    return (
        <>
            <div className="div-post-thumbnail">	
                {!type && (
                    <a className="thumbnail-link" href={url}>
                        <div className="thumbnail-wrap">
                            <img width="300" height="300" src={image} className="post-thumbnail" alt={title} />
                        </div>
                    </a>
                )}
                    <div className="post-category dis-none">
                        {dataCate?.name && (
                            <a href={dataCate?.link}>{dataCate?.name}</a> 	
                        )}
                    </div>
                		
                <h2 className="post-title">
                    <a href={url}>
                        {title}
                    </a>
                </h2>
                <div className="post-meta dis-none">
                    <span className="post-author">
                        <a href={dataAuthor?.link} title={`Posts by ${dataAuthor?.name}`}>{dataAuthor?.name}</a>
                    </span> 
                    <span className="post-date">{dayTime}</span>
                    {/* <span className="post-comment">
                        <Link to="/news/following-lionel-messis-nightmare-chelsea-issued-a-transfer-warning-to-josko-gvardiol-kansan" className="comments-link">
                            0 Comment
                        </Link>
                    </span> */}
                </div>
                <div className="post-summary">
                    <p>{description}</p>
                </div>
                <div className="post-meta dis-none-laptop dis-flex">
                    <span className="post-author">
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            size={'1x'}
                            style={{ marginRight: '6px', fontSize: '16px', lineHeight: '14px' }} 
                        />
                        <a href={dataAuthor?.link} title={`Posts by ${dataAuthor?.name}`}>By <b>{dataAuthor?.name}</b></a>
                    </span> 
                    <span className="post-date">{dayTime}</span>
                </div>
                <div className="post-category dis-none-laptop dis-block">
                    {dataCate?.name && (
                        <a href={dataCate?.link}>{dataCate?.name}</a> 	
                    )}
                </div>	
            </div>
        </>
    );
};

export default ItemProduct;
