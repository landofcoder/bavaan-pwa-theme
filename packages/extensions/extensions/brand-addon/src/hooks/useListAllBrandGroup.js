import { GET_GROUPS_BRAND } from './brand.gql';
import { useQuery } from '@apollo/client';

export const useListAllBrandGroup = props => {
    const {
        data: listBrandGroupData,
        error: listBrandGroupError,
        loading: listBrandGroupLoading,
    } = useQuery(GET_GROUPS_BRAND, {
        fetchPolicy: "cache-first"
    })

    return {
        listBrandGroupData,
        listBrandGroupError,
        listBrandGroupLoading
    }
}
