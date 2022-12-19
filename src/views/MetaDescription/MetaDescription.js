/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */

import { Helmet } from "react-helmet";

const MetaDescription = ({title, description, imageUrl, imageAlt}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:url" content={window.location.pathname + window.location.search} />
            <meta property="og:description" content={description} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image:alt" content={imageAlt} />
        </Helmet>
    );
};

export default MetaDescription;