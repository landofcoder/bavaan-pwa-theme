import { useQuery } from '@apollo/client';
import { Util } from '@magento/peregrine';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

/**
 *
 * @param {*} props.query the footer data query
 */
export const useFooter = props => {
    const { query } = props;
    const { data } = useQuery(query);
    if (data && data.lofBlogConfigs) {
        storage.setItem('lofBlogConfiguration', data.lofBlogConfigs);
    }
    return {
        copyrightText: data && data.storeConfig && data.storeConfig.copyright
    };
};
