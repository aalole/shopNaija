import React from 'react'
import {Helmet} from "react-helmet";

const Metas = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keyword' content={keywords}/>
        </Helmet>
    )
}

Metas.defaultProps= {
    title: 'Welcome to ShopNaija',
    description: 'We sell the best products at unbeatble price',
    keywords:'Electronics, buy electronics, buy gadgets. Local and foreign products'
}

export default Metas
