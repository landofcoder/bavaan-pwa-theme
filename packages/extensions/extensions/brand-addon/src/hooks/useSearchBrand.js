import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SEARCH_BRAND } from './brand.gql';

export const useSearchBrand = props => {
    const [name, setName] = useState('')
    let formattedName = name;
    if (name === '') {
        console.log('not pass')
    }
    else {
        formattedName = `%${name}%`
        console.log("formatted name ", formattedName)
    }
    const {
        data: brandData,
        error: brandError,
        loading: brandLoading
    } = useQuery(GET_SEARCH_BRAND, {
        variables: {
            name: formattedName
        },
    })

    return {
        brandData,
        brandError,
        brandLoading,
        name,
        setName
    }
}
