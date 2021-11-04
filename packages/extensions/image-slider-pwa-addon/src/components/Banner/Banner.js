import React, { useRef } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useQuery } from '@apollo/client';
import { oneOf, shape, string, bool } from 'prop-types';
import { GET_BANNERS_SLIDER } from './BannerSlider.gql';
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";
import RichContent from "@magento/venia-ui/lib/components/RichContent";
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './banner.module.css';

const getImageSliderClassName = (priority, negative) =>
    `imageSliderItem_${priority}Priority${negative ? 'Negative' : ''}`;

const Banner = props => {
    const {
        children,
        classes: propClasses,
        priority,
        negative,
        disabled,
        onPress,
        ...restProps
    } = props;

    const classes = useStyle(defaultClasses, propClasses);
    const rootClassName = classes[getImageSliderClassName(priority, negative)];

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
                        //style={{maxWidth: banner.resource_map.max_width, minWidth: banner.resource_map.min_width}}
                    />
                </div>
            )
        }
        else if (banner.resource_type === "external_image") {
            if (banner.link) {
                return (
                    <div key={index} className={rootClassName}>
                        <a href={`${banner.link}`}>
                            <img
                                className={defaultClasses.bannerImage}
                                src={banner.resource_path}
                                //style={{maxWidth: banner.resource_map.max_width, minWidth: banner.resource_map.min_width}}
                            />
                            <p className={defaultClasses.bannerTitle}>{banner.title}</p>
                        </a>
                    </div>
                )
            }
            else {
                return (
                    <div key={index} className={rootClassName}>
                        <img
                            className={defaultClasses.bannerImage}
                            src={banner.resource_path}
                            //style={{maxWidth: banner.resource_map.max_width, minWidth: banner.resource_map.min_width}}
                        />
                        <p className={defaultClasses.bannerTitle}>{banner.title}</p>
                    </div>
                )
            }
        }
        else if (banner.resource_type === "local_image") {
            if (banner.link) {
                return (
                    <div key={index} className={rootClassName}>
                        <a href={`${banner.link}`}>
                            <img
                                className={defaultClasses.bannerImage}
                                src={`${process.env.MAGENTO_BACKEND_URL}/media/${banner.resource_path}`}
                                //style={{maxWidth: banner.resource_map.max_width, minWidth: banner.resource_map.min_width}}
                            />
                            <p className={defaultClasses.bannerTitle}>{banner.title}</p>
                        </a>
                    </div>
                )
            }
            else {
                return (
                    <div key={index} className={rootClassName}>
                        <img
                            className={defaultClasses.bannerImage}
                            src={`${process.env.MAGENTO_BACKEND_URL}/media/${banner.resource_path}`}
                            //style={{maxWidth: banner.resource_map.max_width, minWidth: banner.resource_map.min_width}}
                        />
                        <p className={defaultClasses.bannerTitle}>{banner.title}</p>
                    </div>
                )
            }
        }
        else {
            return (
                <div key={index} className={rootClassName + " "+defaultClasses.bannerImage} style={{maxWidth: banner.resource_map.max_width, minWidth: banner.resource_map.min_width}}>
                    <RichContent html={banner.resource_path}/>
                </div>
            )
        }
    })
    return (
        <Carousel showIndicators={true} swipeable={true} showArrows showThumbs={false} autoPlay={false} infiniteLoop stopOnHover  {...restProps}>
            {items}
        </Carousel >
    )
}

Banner.propTypes = {
    classes: shape({
        content: string,
        root: string,
        root_highPriority: string,
        root_lowPriority: string,
        root_normalPriority: string
    }),
    priority: oneOf(['high', 'low', 'normal']).isRequired,
    negative: bool,
    disabled: bool
};

Banner.defaultProps = {
    priority: 'normal',
    negative: false,
    disabled: false
};

export default Banner;
