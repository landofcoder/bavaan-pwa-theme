import React from 'react';
import App from '../components/ProductDetail/index';

export const useProductRelated = (props = {}) => {

    console.log("hooks product related slider");
    console.log(props);
    return {
        data: null,
        components: <App props={props} />
    };
};
