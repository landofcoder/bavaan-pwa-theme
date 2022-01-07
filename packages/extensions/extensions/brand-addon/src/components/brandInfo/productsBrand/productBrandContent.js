import React, { Fragment, Suspense } from 'react';
import { array, number, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useBrandContent } from "../../../hooks/useBrandContent";
import { mergeClasses } from "../../../classify";
import Button from "@magento/venia-ui/lib/components/Button";
import Gallery from "@magento/venia-ui/lib/components/Gallery";
import { Title} from "@magento/venia-ui/lib/components/Head";
import Pagination from "@magento/venia-ui/lib/components/Pagination";
import ProductSort from "@magento/venia-ui/lib/components/ProductSort";
import RichContent from "@magento/venia-ui/lib/components/RichContent";
import defaultClasses from './productsBrand.css';
import NoProductsFound from "@magento/venia-ui/lib/RootComponents/Category/NoProductsFound";
import FilterModal from "@magento/venia-ui/lib/components/FilterModal";
import SearchBrandBar from "../../searchBrand";
import ShopByBrand from "../shopByBrand";
import BrandGroupSideBar from "../../brandGroup/brandGroupSideBar";


const ProductsBrandContent = props => {
    const { brandId, data, pageControl, sortProps, pageSize } = props;
    const [currentSort] = sortProps;

    const talonProps = useBrandContent({
        brandId,
        data,
        pageSize
    });

    const {
        brandName,
        brandDescription,
        filters,
        handleLoadFilters,
        handleOpenFilters,
        items,
        pageTitle,
        totalPagesFromData
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    const maybeFilterButtons = filters ? (
        <Button
            priority={'low'}
            classes={{ root_lowPriority: classes.filterButton }}
            onClick={handleOpenFilters}
            onFocus={handleLoadFilters}
            onMouseOver={handleLoadFilters}
            type="button"
        >
            <FormattedMessage
                id={'categoryContent.filter'}
                defaultMessage={'Filter'}
            />
        </Button>
    ) : null;

    const maybeSortButton =
        totalPagesFromData && filters ? (
            <ProductSort sortProps={sortProps} />
        ) : null;

    const maybeSortContainer =
        totalPagesFromData && filters ? (
            <div className={classes.sortContainer}>
                <FormattedMessage
                    id={'categoryContent.itemsSortedBy'}
                    defaultMessage={'Items sorted by '}
                />
                <span className={classes.sortText}>
                    <FormattedMessage
                        id={currentSort.sortId}
                        defaultMessage={currentSort.sortText}
                    />
                </span>
            </div>
        ) : null;

    const modal = filters ? <FilterModal filters={filters} /> : null;

    const brandDescriptionElement = brandDescription ? (
        <RichContent html={brandDescription} />
    ) : null;

    const content = totalPagesFromData ? (
        <Fragment>
            <div className={defaultClasses.brandsContainer}>
                <div className={defaultClasses.brandsContentLeft}>
                    <div>
                        <div className={defaultClasses.brandsSearchLabel}>
                            <span>{`Search Brand`}:</span>
                        </div>
                        <SearchBrandBar />
                    </div>
                    <div className={defaultClasses.shopByBrand}>
                        <ShopByBrand />
                    </div>
                    <div className={classes.brandGroupSideBar}>
                        <BrandGroupSideBar />
                    </div>
                </div>
                <div className={defaultClasses.brandsContentRight}>
                    <section className={classes.gallery}>
                        <Gallery items={items} />
                    </section>
                </div>
            </div>
            <div className={classes.pagination}>
                <Pagination pageControl={pageControl} />
            </div>
        </Fragment>
    ) : (
        <NoProductsFound categoryId={brandId} />
    );

    return (
        <Fragment>
            <Title>{pageTitle}</Title>
            <article className={classes.root}>
                <h1 className={classes.title}>
                    <div className={classes.brandTitle}>{brandName}</div>
                </h1>
                {brandDescriptionElement}
                <div className={classes.headerButtons}>
                    {maybeFilterButtons}
                    {maybeSortButton}
                </div>
                {maybeSortContainer}
                {content}
                <Suspense fallback={null}>{modal}</Suspense>
            </article>
        </Fragment>
    );
};

export default ProductsBrandContent;

ProductsBrandContent.propTypes = {
    classes: shape({
        filterContainer: string,
        sortContainer: string,
        gallery: string,
        headerButtons: string,
        filterButton: string,
        pagination: string,
        root: string,
        title: string
    }),
    sortProps: array,
    pageSize: number
};
