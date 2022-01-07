import { GET_SEARCH_BRAND } from './brand.gql';
import { useListBrand } from './useListBrand';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
};

export const useBrandInfo = props => {
    const { brandUrl } = props;
    const rawUrl = brandUrl;
    let result = '';
    if (brandUrl === '' || brandUrl == null || !brandUrl) {
        result = rawUrl;
    }
    else {
        const rawUrl = brandUrl.replace('.html', '');
        const words = rawUrl.split('-');
        for (let i = 0; i < words.length; i++) {
            const capitalizeResult = capitalize(words[i]);
            if (i !== words.length - 1) {
                result = result.concat(capitalizeResult).concat(" ")
            }
            else {
                result = result.concat(capitalizeResult)
            }
        }
        result = `%${result}%`
    }
    const {
        data: brandData,
        error: brandError,
        loading: brandLoading
    } = useQuery(GET_SEARCH_BRAND, {
        variables: {
            brandName: result
        },
        fetchPolicy: "cache-first"
    });
    return {
        brandData,
        brandError,
        brandLoading,
    }
};

useListBrand.prototype = {
    brandUrl: PropTypes.string.isRequired
};
