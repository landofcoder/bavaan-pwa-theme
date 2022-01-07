import React from 'react';
import { useListBrand } from '../../hooks/useListBrand';
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";
import BrandListContent from "./brandListContent";
import { Util } from '@magento/peregrine';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const BrandList = props => {
    const brandConfiguration = storage.getItem('BrandConfiguration');
    const { listBrandsData, error, loading, pageControl } = useListBrand({
        number_brand_per_page: brandConfiguration.Brand.brand_list_page_item_per_page
    });

    if (error) {
        return 'No items';
    }
    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <React.Fragment>
            <BrandListContent listBrandsData={listBrandsData} error={error} loading={loading} pageControl={pageControl}/>
        </React.Fragment>
    );
};
export default BrandList;
