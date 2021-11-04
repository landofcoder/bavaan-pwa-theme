import React, { Fragment } from 'react';
import { useBlog } from '@landofcoder/lof-product-extend-components/lib/talons/Homepage/useBlog';
import { useImageSlider } from '@landofcoder/lof-product-extend-components/lib/talons/Homepage/useImageSlider';
import { useProductSlider } from '@landofcoder/lof-product-extend-components/lib/talons/Homepage/useProductSlider';
import { useTopBrands } from "@landofcoder/lof-product-extend-components/lib/talons/Homepage/useTopBrands";
import globalCSS from "@magento/venia-ui/lib/components/HomePage/homePage.css";

const HomePage = () => {
    const imageSlider = useImageSlider();
    const blog = useBlog();
    const productSlider = useProductSlider();
    const topBrands = useTopBrands();

    return (
        <Fragment>
            {imageSlider.components}
            {blog.components}
            {topBrands.components}
            {productSlider.components}
        </Fragment>
    );
};

// `MagentoRoute` renders the CMS page, so this component renders nothing.
// This file would be obsolete if the CMS could deliver a stylesheet.

export default HomePage;

// Use the import to make webpack inject a stylesheet.
HomePage.globalCSS = globalCSS;
