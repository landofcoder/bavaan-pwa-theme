import React from 'react';
import TopProductSlider from '../ProductSlider/TopProductSlider';
import FeaturedProductSlider from "../ProductSlider/FeaturedProductSlider";
import DealsProductSlider from "../ProductSlider/DealsProductSlider";
import BestSellerProductSlider from "../ProductSlider/BestSellerProductSlider";
import styles from './index.css';
const App = () => {
    return (
        <div className={styles.productSliderModule}>
            <div className={styles.wrapperSlider}>
                <TopProductSlider />

                <FeaturedProductSlider />

                <BestSellerProductSlider />

                <DealsProductSlider />
            </div>
        </div>
    );
};
export default App;
