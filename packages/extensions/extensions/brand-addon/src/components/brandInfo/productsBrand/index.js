import React, { Fragment } from 'react';
import { number, shape, string } from 'prop-types';
import { useProductsBrand } from "../../../hooks/useProductsBrand";
import { mergeClasses } from "../../../classify"
import { fullPageLoadingIndicator} from "@magento/venia-ui/lib/components/LoadingIndicator";
import ProductsBrandContent from './productBrandContent';
import defaultClasses from './productsBrand.css';
import { Meta} from "@magento/venia-ui/lib/components/Head";
import { GET_PAGE_SIZE } from "@magento/venia-ui/lib/RootComponents/Category/category.gql";
import ErrorView from '@magento/venia-ui/lib/components/ErrorView';

const ProductsBrand = props => {
    const { id } = props;

    const talonProps = useProductsBrand({
        id,
        queries: {
            getPageSize: GET_PAGE_SIZE
        }
    });

    const {
        error,
        metaDescription,
        loading,
        productsBrandData,
        pageControl,
        sortProps,
        pageSize
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    // Show the loading indicator until data has been fetched.
    if (!productsBrandData && loading) {
        return fullPageLoadingIndicator;
    }

    if (error && pageControl.currentPage === 1) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }

        return <ErrorView />;
    }

    return (
        <Fragment>
            <Meta name="description" content={metaDescription} />
            <ProductsBrandContent
                brandId={id}
                classes={classes}
                data={productsBrandData}
                pageControl={pageControl}
                sortProps={sortProps}
                pageSize={pageSize}
            />
        </Fragment>
    );
};

ProductsBrand.propTypes = {
    classes: shape({
        gallery: string,
        root: string,
        title: string
    }),
    id: number
};

ProductsBrand.defaultProps = {
    id: 3
};

export default ProductsBrand;
