import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import styles from './topBrand.css';
import { useQuery } from '@apollo/client';
import { LIST_BRANDS } from '../../hooks/brand.gql';
import { Util } from '@magento/peregrine';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();


const TopBrands = () => {
    const brandConfiguration = storage.getItem('BrandConfiguration');
    const brand_block_enable = brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_enable ? brandConfiguration.Brand.brand_block_enable : false;
    const { data, error, loading } = useQuery(LIST_BRANDS);

    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        dots: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_dots ? brandConfiguration.Brand.brand_block_dots : true,
        infinite: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_loop ? brandConfiguration.Brand.brand_block_loop : true,
        slidesToShow: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_large_items ? parseInt(brandConfiguration.Brand.brand_block_large_items) : 6,
        slidesToScroll: 1,
        arrows: true,
        centerPadding: "60px",
        autoplay: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_autoplay ? brandConfiguration.Brand.brand_block_autoplay : true,
        speed: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_interval ? parseInt(brandConfiguration.Brand.brand_block_interval) : 3000,
        autoplaySpeed: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_interval ? parseInt(brandConfiguration.Brand.brand_block_interval) : 3000,
        pauseOnHover: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_autoplay_pauseonhover ? brandConfiguration.Brand.brand_block_autoplay_pauseonhover : true,
        rtl: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_rtl ? brandConfiguration.Brand.brand_block_rtl : false,
        nextArrow: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_nav === true ? <SampleNextArrow /> : null,
        prevArrow: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_nav === true ? <SamplePrevArrow /> : null,
        responsive: [
            {
                breakpoint: 1281,
                settings: {
                    slidesToShow: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_large_items ? parseInt(brandConfiguration.Brand.brand_block_large_items) : 6,
                    slidesToScroll: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_large_items ? parseInt(brandConfiguration.Brand.brand_block_large_items) : 6,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_portrait_items ? parseInt(brandConfiguration.Brand.brand_block_portrait_items) : 5,
                    slidesToScroll: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_portrait_items ? parseInt(brandConfiguration.Brand.brand_block_portrait_items) : 5,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_tablet_items ? parseInt(brandConfiguration.Brand.brand_block_tablet_items) : 4,
                    slidesToScroll: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_tablet_items ? parseInt(brandConfiguration.Brand.brand_block_tablet_items) : 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_tablet_small_items ? parseInt(brandConfiguration.Brand.brand_block_tablet_small_items) :3,
                    slidesToScroll: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_tablet_small_items ? parseInt(brandConfiguration.Brand.brand_block_tablet_small_items) :3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_mobile_items ? parseInt(brandConfiguration.Brand.brand_block_mobile_items) : 2,
                    slidesToScroll: brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_mobile_items ? parseInt(brandConfiguration.Brand.brand_block_mobile_items) : 2,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    if (loading || data === undefined || brand_block_enable === false){
        return (<div/>)
    } else {
        const brandItems = data.lofBrandList.items.map((item, index) => {
            const lowercase = item.name.toLowerCase();
            const formatted = lowercase.replace(' ', '-');
            return (
                <div className={styles.itemBrand} key={index}>
                    <Link to={`/brand/${formatted}.html`}>
                        <div className={styles.imageBrand}>
                            <img className={styles.imageItemBrand} src={item.thumbnail}/>
                        </div>
                        {
                            brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_show_brand_name ? (
                                <div className={styles.nameBrand}>
                                    <p>{item.name}</p>
                                </div>
                            ) : (
                                <div/>
                            )
                        }
                    </Link>
                </div>
            );
        });
        return (
            <div>
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                <style>{cssStyle}</style>
                <div className={styles.title}>
                    <h2>{brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_block_title}{`Top Brands`}</h2>
                </div>
                <div className="product-slider-container">
                    <Slider {...settings}>{brandItems}</Slider>
                </div>
            </div>
        );
    }
};
export default TopBrands;
const cssStyle = `
.slick-next:before, .slick-prev:before {
    color: #000;
}
`
