import { useQuery } from '@apollo/client';
import { LIST_BRANDS_BY_PRODUCT_ID } from './brand.gql';

export const useBrandListByProduct = props => {
    const { data: listBrandData, error: listBrandError, loading: listBrandLoading } = useQuery(LIST_BRANDS_BY_PRODUCT_ID, {
        variables: {
            product_id: props.props.props
        },
        fetchPolicy: "cache-first"
    });
    return {
        listBrandData,
        listBrandError,
        listBrandLoading
    }
};
