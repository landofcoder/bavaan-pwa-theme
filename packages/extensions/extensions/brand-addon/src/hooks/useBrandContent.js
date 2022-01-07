import { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import mergeOperations from "@magento/peregrine/lib/util/shallowMerge"
import { useAppContext } from "@magento/peregrine/lib/context/app";
import DEFAULT_OPERATIONS from './brandContent.gql';

const DRAWER_NAME = 'filter';

/**
 * Returns props necessary to render the brandContent component.
 *
 * @param {object} props.data - The results of a getBrand GraphQL query.
 *
 * @returns {object} result
 * @returns {number} result.brandId - This brand's ID.
 * @returns {string} result.brandName - This brand's name.
 * @returns {object} result.filters - The filters object.
 * @returns {func}   result.handleLoadFilters - A callback function to signal the user's intent to interact with the filters.
 * @returns {func}   result.handleOpenFilters - A callback function that actually opens the filter drawer.
 * @returns {object} result.items - The items in this brand.
 * @returns {bool}   result.loadFilters - Whether or not the user has signalled their intent to interact with the filters.
 * @returns {string} result.pageTitle - The text to put in the browser tab for this page.
 */
export const useBrandContent = props => {
    const { brandId, data, pageSize = 6 } = props;

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getProductFiltersByBrandQuery } = operations;

    const placeholderItems = Array.from({ length: pageSize }).fill(null);
    const [loadFilters, setLoadFilters] = useState(false);
    const [, { toggleDrawer }] = useAppContext();

    const handleLoadFilters = useCallback(() => {
        setLoadFilters(true);
    }, [setLoadFilters]);
    const handleOpenFilters = useCallback(() => {
        setLoadFilters(true);
        toggleDrawer(DRAWER_NAME);
    }, [setLoadFilters, toggleDrawer]);

    const [getFilters, { data: filterData }] = useLazyQuery(
        getProductFiltersByBrandQuery,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    useEffect(() => {
        if (brandId) {
            getFilters({
                variables: {
                    brand_id: brandId
                }
            });
        }
    }, [brandId, getFilters]);

    const filters = filterData ? filterData.lofProductByBrand.aggregations : null;
    const items = data ? data.lofProductByBrand.items : placeholderItems;
    const totalPagesFromData = data
        ? data.lofProductByBrand.page_info.total_pages
        : null;
    const brandName = data ? data.lofBrandById.name : null;
    const brandDescription = data ? data.lofBrandById.description : null;
    // Note: STORE_NAME is injected by Webpack at build time.
    const pageTitle = brandName
        ? `${brandName} - ${STORE_NAME}`
        : STORE_NAME;

    return {
        brandName,
        brandDescription,
        filters,
        handleLoadFilters,
        handleOpenFilters,
        items,
        loadFilters,
        pageTitle,
        totalPagesFromData
    };
};
