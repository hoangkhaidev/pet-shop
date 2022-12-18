/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// ==============================|| MAIN LAYOUT ||============================== //

const Breadcrumbs = ({params, paramsChild}) => {
    return (
        <>
            <div className="breadcrumbs clear dis-none">
                <span className="breadcrumbs-nav">
                    <Link to="/">Home</Link>
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        size={'1x'}
                        style={{ marginRight: '6px' }} 
                    />
                    {
                        params && (
                            <>
                                <span>
                                    <Link to={params?.url}>
                                        {params?.name}
                                    </Link> 
                                </span>
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    size={'1x'}
                                    style={{ marginRight: '6px' }} 
                                />
                            </>
                        )
                    }
                    <span className="post-category">{paramsChild?.name}</span>
                </span>	
                {
                    !params && (
                        <h1>
                            {paramsChild?.name}				
                        </h1>
                    )
                }			
                	
            </div>
        </>
    );
};

export default Breadcrumbs;
