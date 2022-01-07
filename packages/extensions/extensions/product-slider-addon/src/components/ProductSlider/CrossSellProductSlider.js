import React, { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import styles from './style.css';
import stylesIndex from '@landofcoder/product-slider-addon/src/components/ProductDetail/productDetail.module.css';
import { useQuery } from '@apollo/client';

import sliderQuery from './productSlider.gql';
// import Product from "@magento/venia-ui/lib/components/Gallery";
import GalleryItem from "@magento/venia-ui/lib/components/Gallery/item";

const mapGalleryItem = item => {
    const { small_image } = item;
    return {
        ...item,
        small_image:
            typeof small_image === 'object' ? small_image.url : small_image
    };
};

const CrossSellProductSlider = (urlKey) => {
    const { queries } = sliderQuery;
    const { getCrossSellProductQuery } = queries;
    const { data, error, loading } = useQuery(getCrossSellProductQuery,
        {
            variables: {
                url_key: urlKey.urlKey.props
            },
        });
    const params = {
        slidesPerView: 5,
        spaceBetween: 30,
        breakpoints: {
            1281: {
                slidesPerView: 7
            },
            1024: {
                slidesPerView: 5
            },
            768: {
                slidesPerView: 4
            },
            640: {
                slidesPerView: 3
            },
            320: {
                slidesPerView: 2
            }
        }
    };
    if (loading) return null;
    const galleryItems = data.products.items.map((item, index) => {
        if (item.crosssell_products.length > 0) {
            return item.crosssell_products.map((item, index) => {
                return (
                    <div key={index}>
                        <GalleryItem key={index} item={mapGalleryItem(item)} />
                    </div>
                );
            });
        } else {
            return null;
        }
    });
    if (galleryItems[0] !== null) {
        return (
            <div>
                <div className={stylesIndex.title}>
                    <h2>Cross Sell products</h2>
                </div>
                <div className="product-slider-container">
                    <Swiper {...params}>{galleryItems}</Swiper>
                </div>
            </div>
        );
    } else {
        return null;
    }
};
export default CrossSellProductSlider;
