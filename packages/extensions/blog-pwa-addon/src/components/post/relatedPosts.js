import React from 'react';
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from '@magento/venia-drivers';
import BlogPostInfo from '../blogPostInfo';
import { useWindowSize } from '@magento/peregrine';

const RelatedPosts = props => {
    const { classes, items } = props;
    const windowSize = useWindowSize();
    const isPhone = windowSize.innerWidth < 768;
    const itemPerRow = isPhone ? 1 : 3;
    const itemToRender = [];
    let currentRow = [];
    items.map((item, index) => {
        currentRow.push(
            <div className={`${classes.relatedPostItem} ${isPhone ? classes.isPhone : ''}`} key={index}>
                <div style={{ backgroundImage: `url("https://magento2.landofcoder.com/media/${item.image}")` }} className={classes.blogrelatedPostImage} />
                <Link to={`/blog/post/${item.identifier}.html`} >
                    <div className={classes.relatedPostName}>{item.title}</div>
                </Link>
                <div className={classes.relatedPostBlogInfo}>
                    <BlogPostInfo item={item} classes={classes} />
                </div>
            </div>
        )
        if ((currentRow.length === itemPerRow) || (index === (items.length - 1))) {
            itemToRender.push(
                <div className={classes.relatedPostRow} key={item.identifier} >
                    {currentRow}
                </div>
            );
            currentRow = [];
        }
    })
    return (
        <Carousel {...{
            autoPlay: false,
            showArrows: true,
            showThumbs: false,
            showIndicators: true,
        }}>
            {itemToRender}
        </Carousel>
    )
}

export default RelatedPosts;