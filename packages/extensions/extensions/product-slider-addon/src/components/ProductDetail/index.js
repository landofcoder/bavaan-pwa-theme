import React from 'react';
import RelatedProductSlider from "../ProductSlider/RelatedProductSlider";
import UpSellProductSlider from "../ProductSlider/UpSellProductSlider";
import CrossSellProductSlider from "../ProductSlider/CrossSellProductSlider";

import styles from './productDetail.module.css';
const App = (props) => {
    return (
        <div className={styles.productSliderModule}>
            <div className={styles.wrapperSlider}>
                <RelatedProductSlider urlKey={props} />

                <UpSellProductSlider urlKey={props} />

                <CrossSellProductSlider urlKey={props} />
            </div>
        </div>
    );
};
export default App;
