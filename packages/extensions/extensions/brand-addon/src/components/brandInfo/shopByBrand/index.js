import React from 'react';
import { useShopByBrand } from "../../../hooks/useShopByBrand";
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";
import classes from './shopByBrand.css';
import { Link } from 'react-router-dom';;

const ShopByBrand = props => {
    const { listBrandData, listBrandError, listBrandLoading } = useShopByBrand();

    if (listBrandError) {
        return 'No items';
    }
    if (listBrandLoading) {
        return <LoadingIndicator />;
    }

    return (
        <React.Fragment>
            <div className={classes.shopByBrandLabel}>
                <span>{`Shop by Brand`}:</span>
            </div>
            <div>
                <ul>
                    {listBrandData.lofBrandList.items.map(
                        (brand, index) => {
                            const lowercase = brand.name.toLowerCase();
                            const formatted = lowercase.replace(' ', '-');
                            return (
                                <li key={index} className={classes.shopByBrandItem}>
                                    <Link className={classes.brandLink} to={`/brand/${formatted}.html`}>
                                        <span>{brand.name}({brand.products.total_count})</span>
                                    </Link>
                                </li>
                            );
                        }
                    )}
                </ul>
            </div>
        </React.Fragment>
    );
};
export default ShopByBrand;
