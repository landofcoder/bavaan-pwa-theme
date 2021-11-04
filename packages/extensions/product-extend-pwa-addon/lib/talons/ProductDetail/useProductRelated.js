import React from 'react';
export function useProductRelated(props = {}){

    console.log("hooks related product");
    console.log(props);
    return {
        data: null,
        components: null
    };
};
