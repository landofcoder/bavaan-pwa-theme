import React from 'react';
import App from '../components/App/index';

export const useImageSlider = (props = {}) => {
    console.log("hooks image list");
    console.log(props);
    return {
        data: null,
        components: <App props={props} />
    };
};
