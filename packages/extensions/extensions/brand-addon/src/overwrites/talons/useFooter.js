import { useQuery } from '@apollo/client';
import { GET_STORE_CONFIG_BRAND } from "../../hooks/brand.gql";
import { Util } from '@magento/peregrine';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

/**
 *
 * @param {*} props.query the footer data query
 */
export const useFooter = props => {
    const { data } = useQuery(GET_STORE_CONFIG_BRAND, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    if (data && data.storeConfig) {
        storage.setItem('BrandConfiguration', data.storeConfig);
    }
    return {
        copyrightText: data && data.storeConfig && data.storeConfig.copyright
    };
};
