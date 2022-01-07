import React from 'react';
import TopBrands from "../topBrand";
import styles from './index.css';
const App = () => {
    return (
        <div className={styles.productSliderModule}>
            <div className={styles.wrapperSlider}>
                <TopBrands />
            </div>
        </div>
    );
};
export default App;
