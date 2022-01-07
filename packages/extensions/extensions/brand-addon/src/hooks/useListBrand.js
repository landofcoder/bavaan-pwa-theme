import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import mergeOperations from "@magento/peregrine/lib/util/shallowMerge";
import { useAppContext } from "@magento/peregrine/lib/context/app";
import { usePagination, useSort } from "@magento/peregrine";
import { useScrollTopOnChange } from "@magento/peregrine/lib/hooks/useScrollTopOnChange";
import {
    getFiltersFromSearch,
    getFilterInput
} from "@magento/peregrine/lib/talons/FilterModal/helpers";

import DEFAULT_OPERATIONS from './brandListContent.gql';


/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that
 * controls the logic for the Brand Root Component.
 *
 * @kind function
 *
 * @param {object}      props
 * @param {GraphQLAST}  props.operations.getBrandQuery - Fetches Brand using a server query
 * @param {GraphQLAST}  props.operations.getFilterInputsQuery - Fetches "allowed" filters using a server query
 * @param {GraphQLAST}  props.queries.getStoreConfig - Fetches store configuration using a server query
 *
 * @returns {object}    result
 * @returns {object}    result.error - Indicates a network error occurred.
 * @returns {object}    result.brandData - Brand data.
 * @returns {bool}      result.isLoading - Brand data loading.
 * @returns {string}    result.metaDescription - Brand meta description.
 * @returns {object}    result.pageControl - Brand pagination state.
 * @returns {array}     result.sortProps - Brand sorting parameters.
 * @returns {number}    result.pageSize - Brand total pages.
 */
export const useListBrand = props => {
    const { number_brand_per_page } = props;

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getListBrandsQuery, getFilterInputsQuery } = operations;

    const pageSize = number_brand_per_page ? number_brand_per_page : 12;

    const [paginationValues, paginationApi] = usePagination();
    const { currentPage, totalPages } = paginationValues;
    const { setCurrentPage, setTotalPages } = paginationApi;

    const sortProps = useSort();
    const [currentSort] = sortProps;

    // Keep track of the sort criteria so we can tell when they change.
    const previousSort = useRef(currentSort);

    const pageControl = {
        currentPage,
        setPage: setCurrentPage,
        totalPages
    };

    const [
        ,
        {
            actions: { setPageLoading }
        }
    ] = useAppContext();

    const [runQuery, queryResponse] = useLazyQuery(getListBrandsQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const {
        called: brandCalled,
        loading: brandLoading,
        error,
        data
    } = queryResponse;
    const { search } = useLocation();

    const isBackgroundLoading = !!data && brandLoading;

    // Update the page indicator if the GraphQL query is in flight.
    useEffect(() => {
        setPageLoading(isBackgroundLoading);
    }, [isBackgroundLoading, setPageLoading]);

    // Keep track of the search terms so we can tell when they change.
    const previousSearch = useRef(search);

    // Get "allowed" filters by intersection of schema and aggregations
    const {
        called: introspectionCalled,
        data: introspectionData,
        loading: introspectionLoading
    } = useQuery(getFilterInputsQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    // Create a type map we can reference later to ensure we pass valid args
    // to the graphql query.
    // For example: { brand_id: 'FilterEqualTypeInput', price: 'FilterRangeTypeInput' }
    const filterTypeMap = useMemo(() => {
        const typeMap = new Map();
        if (introspectionData) {
            introspectionData.__type.inputFields.forEach(({ name, type }) => {
                typeMap.set(name, type.name);
            });
        }
        return typeMap;
    }, [introspectionData]);

    // Run the brand query immediately and whenever its variable values change.
    useEffect(() => {
        // Wait until we have the type map to fetch product data.
        if (!filterTypeMap.size || !pageSize) {
            return;
        }

        const filters = getFiltersFromSearch(search);

        // Construct the filter arg object.
        const newFilters = {};
        filters.forEach((values, key) => {
            newFilters[key] = getFilterInput(values, filterTypeMap.get(key));
        });


        runQuery({
            variables: {
                currentPage: Number(currentPage),
                filter: newFilters,
                pageSize: Number(pageSize),
                sort: { [currentSort.sortAttribute]: currentSort.sortDirection }
            }
        });
    }, [
        currentPage,
        currentSort,
        filterTypeMap,
        pageSize,
        runQuery,
        search
    ]);

    const totalPagesFromData = data
        ? data.lofBrandList.page_info.total_pages
        : null;

    useEffect(() => {
        setTotalPages(totalPagesFromData);
        return () => {
            setTotalPages(null);
        };
    }, [setTotalPages, totalPagesFromData]);

    // If we get an error after loading we should try to reset to page 1.
    // If we continue to have errors after that, render an error message.
    useEffect(() => {
        if (error && !brandLoading && currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [currentPage, error, brandLoading, setCurrentPage]);

    // Reset the current page back to one (1) when the search string, filters
    // or sort criteria change.
    useEffect(() => {
        // We don't want to compare page value.
        const prevSearch = new URLSearchParams(previousSearch.current);
        const nextSearch = new URLSearchParams(search);
        prevSearch.delete('page');
        nextSearch.delete('page');

        if (
            prevSearch.toString() !== nextSearch.toString() ||
            previousSort.current.sortAttribute.toString() !==
            currentSort.sortAttribute.toString() ||
            previousSort.current.sortDirection.toString() !==
            currentSort.sortDirection.toString()
        ) {
            // The search term changed.
            setCurrentPage(1);
            // And update the ref.
            previousSearch.current = search;
            previousSort.current = currentSort;
        }
    }, [currentSort, previousSearch, search, setCurrentPage]);

    const listBrandsData = brandLoading && !data ? null : data;
    const metaDescription =
        data && data.lofBrandList && data.lofBrandList.meta_description
            ? data.lofBrandList.meta_description
            : '';

    // When only brandLoading is involved, noProductsFound component flashes for a moment
    const loading =
        (introspectionCalled && !brandCalled) ||
        (brandLoading && !data) ||
        introspectionLoading;

    useScrollTopOnChange(currentPage);

    return {
        error,
        listBrandsData,
        loading,
        metaDescription,
        pageControl,
        sortProps,
        pageSize
    };
};
