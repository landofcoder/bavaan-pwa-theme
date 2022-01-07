import React from 'react';
import styles from './index.css';
import BrandListByProduct from "../brandListByProduct";
import { Util } from '@magento/peregrine';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const App = (props) => {
    const brandConfiguration = storage.getItem('BrandConfiguration');
    const product_view_page_enable_brand_info = brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.product_view_page_enable_brand_info ? brandConfiguration.Brand.product_view_page_enable_brand_info : false ;
    return (
        <section className={styles.brandListModule}>
            {
                product_view_page_enable_brand_info ? (
                    <BrandListByProduct props={props} />
                ) : (
                    <div/>
                )
            }
        </section>
    );
};
export default App;
