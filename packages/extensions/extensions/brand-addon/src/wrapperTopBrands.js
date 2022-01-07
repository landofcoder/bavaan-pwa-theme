import React from 'react';
import App from './components/HomePage/index';

export const useTopBrands = (props = {}) => {

    console.log("hooks brand list");
    console.log(props);
    return {
        data: null,
        components: <App props={props} />
    };
};
