import React from 'react';
import App from '../components/HomePage/index';

export const useProductSlider = (props = {}) => {

    console.log("hooks product slider extension");
    console.log(props);
    return {
        data: null,
        components:  <App />
    };
};
