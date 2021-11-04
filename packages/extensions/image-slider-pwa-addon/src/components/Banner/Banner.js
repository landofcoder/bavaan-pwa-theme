import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useQuery } from '@apollo/client';
import { GET_BANNERS_SLIDER } from './BannerSlider.gql';
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";
import RichContent from "@magento/venia-ui/lib/components/RichContent";
import styles from './style.css';

const Banner = () => {
    const { loading, error, data } = useQuery(GET_BANNERS_SLIDER, {
        variables: {
            sliderId: 1
        }
    })
    if (loading) return (
        <LoadingIndicator />
    )
    if (error) {
        console.log("ERROR", error)
        return null
    }
    if (data) {
        console.log("DATA", data)
    }
    const items = data.lofBannerSlider.banners.map((banner, index) => {
        if (banner.resource_type === "youtube_video") {
            return (
                <div key={index}>
                    <iframe
                        src={banner.resource_path}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        style={{maxWidth: banner.resource_map.max_width, minWidth: banner.resource_map.min_width}}
                    />
                </div>
            )
        }
        else if (banner.resource_type === "external_image") {
            if (banner.link) {
                return (
                    <div key={index}>
                        <a href={`${banner.link}`}>
                            <img
                                className={styles.bannerImage}
                                src={banner.resource_path}
                                style={{maxWidth: banner.resource_map.max_width, minWidth: banner.resource_map.min_width}}
                            />
                            <p className={styles.bannerTitle}>{banner.title}</p>
                        </a>
                    </div>
                )
            }
            else {
                return (
                    <div key={index}>
                        <img
                            className={styles.bannerImage}
                            src={banner.resource_path}
                            style={{maxWidth: banner.resource_map.max_width, minWidth: banner.resource_map.min_width}}
                        />
                        <p className={styles.bannerTitle}>{banner.title}</p>
                    </div>
                )
            }
        }
        else if (banner.resource_type === "local_image") {
            if (banner.link) {
                return (
                    <div key={index}>
                        <a href={`${banner.link}`}>
                            <img
                                className={styles.bannerImage}
                                src={`http://magento2.landofcoder.com/media/${banner.resource_path}`}
                                style={{maxWidth: banner.resource_map.max_width, minWidth: banner.resource_map.min_width}}
                            />
                            <p className={styles.bannerTitle}>{banner.title}</p>
                        </a>
                    </div>
                )
            }
            else {
                return (
                    <div key={index}>
                        <img
                            className={styles.bannerImage}
                            src={`http://magento2.landofcoder.com/media/${banner.resource_path}`}
                            style={{maxWidth: banner.resource_map.max_width, minWidth: banner.resource_map.min_width}}
                        />
                        <p className={styles.bannerTitle}>{banner.title}</p>
                    </div>
                )
            }
        }
        else {
            return (
                <div key={index} className={styles.bannerImage} style={{maxWidth: banner.resource_map.max_width, minWidth: banner.resource_map.min_width}}>
                    <RichContent html={banner.resource_path}/>
                </div>
            )
        }
    })
    return (
        <Carousel showIndicators={true} swipeable={true} showArrows showThumbs={false} autoPlay={false} infiniteLoop stopOnHover>
            {items}
        </Carousel >
    )
}
export default Banner;
