import React from 'react';
import App from './components/ProductDetail/index';

export const useBrandList = (props = {}) => {

    console.log("hooks brand list");
    console.log(props);
    return {
        data: null,
        components: <App props={props} />
    };
};
