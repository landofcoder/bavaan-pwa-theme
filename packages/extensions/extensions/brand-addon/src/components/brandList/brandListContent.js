import React from 'react';
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";
import { Title} from "@magento/venia-ui/lib/components/Head";
import classes from './page.css';
import { Link } from 'react-router-dom';
import SearchBrandBar from "../searchBrand";
import ShopByBrand from "../brandInfo/shopByBrand";
import BrandGroupSideBar from "../brandGroup/brandGroupSideBar";
import Pagination from "@magento/venia-ui/lib/components/Pagination";
import { Util } from '@magento/peregrine';
import RichContent from "@magento/venia-ui/lib/components/RichContent";
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const BrandListContent = props => {
    const brandConfiguration = storage.getItem('BrandConfiguration');
    const brand_list_page_layout = brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_list_page_layout ? brandConfiguration.Brand.brand_list_page_layout : "list";
    const brand_list_page_show_brand_name = brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_list_page_show_brand_name ? brandConfiguration.Brand.brand_list_page_show_brand_name : true;
    const brand_list_page_page_title = brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_list_page_page_title ? brandConfiguration.Brand.brand_list_page_page_title : "All Brands";
    const general_settings_enable_search = brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.general_settings_enable_search ? brandConfiguration.Brand.general_settings_enable_search : true;
    const general_settings_enable_menu = brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.general_settings_enable_menu ? brandConfiguration.Brand.general_settings_enable_menu : true;
    const { listBrandsData, error, loading, pageControl } = props;

    if (error) {
        return 'No items';
    }
    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <React.Fragment>
            <Title>{brand_list_page_page_title ? brand_list_page_page_title : `Brands`}</Title>
            <div className={classes.breadCrumb}>
                <Link className={classes.breadCrumbLink} to="/">{`Home`}</Link>
                <span className={classes.breadCrumbSeparator}>{`/`}</span>
                <span className={classes.breadCrumbText}>{brand_list_page_page_title}</span>
            </div>
            <div className={classes.brandsContainer}>
                <div className={classes.brandsListLeft}>
                    {
                        general_settings_enable_search ? (
                            <div>
                                <div className={classes.brandsSearchLabel}>
                                    <span>{`Search Brand`}:</span>
                                </div>
                                <SearchBrandBar />
                            </div>
                        ) : (
                            <div/>
                        )
                    }
                    {
                        general_settings_enable_menu ? (
                            <div className={classes.shopByBrand}>
                                <ShopByBrand />
                            </div>
                        ) : (
                            <div/>
                        )
                    }
                    {
                        general_settings_enable_menu ? (
                            <div className={classes.brandGroupSideBar}>
                                <BrandGroupSideBar />
                            </div>
                        ) : (
                            <div/>
                        )
                    }
                </div>
                <div className={general_settings_enable_search || general_settings_enable_menu ? classes.brandsListRight : classes.brandsListRightDisableSideBar}>
                    <div className={classes.brandsListTitle}>
                        <span>{`Brand List`}</span>
                    </div>
                    {
                        brand_list_page_layout === "list" ?
                            <div>
                                {listBrandsData.lofBrandList.items.map(
                                    (brand, index) => {
                                        const lowercase = brand.name.toLowerCase();
                                        const formatted = lowercase.replace(' ', '-');
                                        return (
                                            <Link key={index} to={`/brand/${formatted}.html`}>
                                                <div className={classes.brandItemList}>
                                                    <div className={classes.brandImageList}>
                                                        <img src={brand.thumbnail}/>
                                                        {/*<span>{brand.name}({brand.total_product})</span>*/}
                                                    </div>
                                                    <div className={classes.brandContentList}>
                                                        {
                                                            brand_list_page_show_brand_name ? (
                                                                <div className={classes.brandContentTitleList}>
                                                                    <div className={classes.brandContentTitleNameList}>
                                                                        <span>{brand.name}</span>
                                                                    </div>
                                                                    <div className={classes.brandContentTitleCountList}>
                                                                        <span>{brand.products.total_count}</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div>
                                                                        <span>{`Total Products`}: {brand.products.total_count}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        <div className={classes.brandContentDesList}>
                                                            <RichContent html={brand.description} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    }
                                )}
                            </div>
                            : <div className={classes.brandListRow}>
                                {listBrandsData.lofBrandList.items.map(
                                    (brand, index) => {
                                        const lowercase = brand.name.toLowerCase();
                                        const formatted = lowercase.replace(' ', '-');
                                        return (
                                            <Link key={index} to={`/brand/${formatted}.html`}>
                                                <div className={classes.brandItem}>
                                                    <div className={classes.brandItemContent}>
                                                        <div className={classes.brandItemImage}>
                                                            <img src={brand.thumbnail} className={classes.brandThumbnail}/>
                                                        </div>
                                                        {
                                                            brand_list_page_show_brand_name ? (
                                                                <div className={classes.brandItemName}>
                                                                    <div className={classes.brandItemNameContent}>
                                                                        <span>{brand.name}</span>
                                                                    </div>
                                                                    <div className={classes.brandContentTitleCountList}>
                                                                        <span>{brand.products.total_count}</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className={classes.brandItemName}>
                                                                    <div>
                                                                        <span>{`Total Products`}: {brand.products.total_count}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    }
                                )}
                            </div>
                    }
                </div>
            </div>
            <div className={classes.pagination}>
                <Pagination pageControl={pageControl} />
            </div>
        </React.Fragment>
    );
};
export default BrandListContent;
