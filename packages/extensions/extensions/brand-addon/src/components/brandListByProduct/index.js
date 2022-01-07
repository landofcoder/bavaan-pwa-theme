import React from 'react';
import { useBrandListByProduct } from "../../hooks/useListBrandByProduct"
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";
import style from './brandListByProduct.css';
import { Link } from 'react-router-dom';
import { Util } from '@magento/peregrine';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const BrandListByProduct = props => {
    const brandConfiguration = storage.getItem('BrandConfiguration');
    const { listBrandData, listBrandError, listBrandLoading } = useBrandListByProduct(props);

    if (listBrandError) {
        return 'No items';
    }
    if (listBrandLoading) {
        return <LoadingIndicator />;
    }
    if (listBrandData.lofBrandByProduct.items.length <= 0) {
        return null;
    } else {
        return (
            <React.Fragment>
                <div className={style.brandsContainer}>
                    <div className={style.brandsList}>
                        <div className={style.brandListRow}>
                            {
                                brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.product_view_page_show_brand_text === true ? (
                                    <div className={style.brandTitle}>
                                        <p>{brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.product_view_page_brand_text ? brandConfiguration.Brand.product_view_page_brand_text : "Brands:"} </p>
                                    </div>
                                ) : (
                                    <div/>
                                )
                            }
                            {
                                brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.product_view_page_brand_layout_listing === false ? (
                                    <ul>
                                        {
                                            listBrandData.lofBrandByProduct.items.map(
                                                (brand, index) => {
                                                    const lowercase = brand.name.toLowerCase();
                                                    const formatted = lowercase.replace(' ', '-');
                                                    return (
                                                        <li>
                                                            <div
                                                                className={style.brandItem}
                                                                key={index}
                                                            >
                                                                <Link to={`/brand/${formatted}.html`}>
                                                                    <div>
                                                                        {
                                                                            brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.product_view_page_show_brand_image === true ? (
                                                                                <img
                                                                                    src={brand.thumbnail}
                                                                                    className={
                                                                                        style.brandThumbnail
                                                                                    }
                                                                                />
                                                                            ) : (
                                                                                <div/>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.product_view_page_show_brand_name === true ? (
                                                                                <span>{brand.name}</span>
                                                                            ) : (
                                                                                <div/>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.product_view_page_show_brand_description === true ? (
                                                                                <span>{brand.meta_description}</span>
                                                                            ) : (
                                                                                <div/>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </li>
                                                    );
                                                }
                                            )
                                        }
                                    </ul>
                                ) : (
                                    listBrandData.lofBrandByProduct.items.map(
                                        (brand, index) => {
                                            const lowercase = brand.name.toLowerCase();
                                            const formatted = lowercase.replace(' ', '-');
                                            return (
                                                <div
                                                    className={style.brandItem}
                                                    key={index}
                                                >
                                                    <Link to={`/brand/${formatted}.html`}>
                                                        <div>
                                                            {
                                                                brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.product_view_page_show_brand_image === true ? (
                                                                    <img
                                                                        src={brand.thumbnail}
                                                                        className={
                                                                            style.brandThumbnail
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <div/>
                                                                )
                                                            }
                                                        </div>
                                                        <div>
                                                            {
                                                                brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.product_view_page_show_brand_name === true ? (
                                                                    <span>{brand.name}</span>
                                                                ) : (
                                                                    <div/>
                                                                )
                                                            }
                                                        </div>
                                                        <div>
                                                            {
                                                                brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.product_view_page_show_brand_description === true ? (
                                                                    <span>{brand.meta_description}</span>
                                                                ) : (
                                                                    <div/>
                                                                )
                                                            }
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        }
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};
export default BrandListByProduct;
