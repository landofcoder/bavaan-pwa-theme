import { GET_GROUPS_BRAND } from './brand.gql';
import { useQuery } from '@apollo/client';

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
};

export const useListBrandGroup = props => {
    const { brandGroupUrl, group_page_item_per_page } = props;
    const rawUrl = brandGroupUrl;
    let result = '';
    if (brandGroupUrl === '' || brandGroupUrl == null || !brandGroupUrl) {
        result = rawUrl;
    }
    else {
        const rawUrl = brandGroupUrl.replace('.html', '');
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
        data: listBrandGroupData,
        error: listBrandGroupError,
        loading: listBrandGroupLoading,
    } = useQuery(GET_GROUPS_BRAND, {
        variables: {
            brandGroupName : result
        },
        fetchPolicy: "cache-first"
    })


    return {
        listBrandGroupData,
        listBrandGroupError,
        listBrandGroupLoading
    }

}
