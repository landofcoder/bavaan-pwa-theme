import React from 'react';
import { Link } from '@magento/venia-drivers';
import RichText from '@magento/venia-ui/lib/components/RichText'

const BlogListingItem = props => {
    const { classes, item, lofBlogConfiguration } = props;
    const {
        title,
        identifier,
        short_content,
        image
    } = item;
    const imageExtensions = [
        "jpg",
        "png",
        "jpeg",
        "gif"
    ]
    let linkColor = '#1ABC9C';
    if (lofBlogConfiguration && lofBlogConfiguration.general && lofBlogConfiguration.general.font_color) {
        linkColor = lofBlogConfiguration.general.font_color;
    }
    let displayStyle = 1;
    if (lofBlogConfiguration && lofBlogConfiguration.general && lofBlogConfiguration.general.display_style) {
        displayStyle = parseInt(lofBlogConfiguration.general.display_style);
    }
    return (
        <div className={`${classes.blogpostItem} ${displayStyle === 1 ? classes.blogpostItemList : classes.blogpostItemGrid}`}>
            {image ? <div className={classes.blogpostItemCol1} >
                <img onError={(event) => {
                    if (image) {
                        const extension = image.split('.').pop()
                        if (imageExtensions.indexOf(extension)> -1) {
                            event.target.src = `https://magento2.landofcoder.com/media/${image}`
                        }
                        else {
                            event.target.src = "https://magento2.landofcoder.com/media/ves/blog/6127_MagentoMastersBlogHeader_r1v1.png"
                        }
                    }
                    else {
                        event.target.src = "https://magento2.landofcoder.com/media/ves/blog/6127_MagentoMastersBlogHeader_r1v1.png"
                    }
                }} src={image} alt={title} />
            </div> : console.log("SRC", image)}
            <div className={classes.blogpostItemCol2} >
                <h2>
                    <Link to={`/blog/post/${identifier}.html`} style={{ color: linkColor }}>
                        {title}
                    </Link>
                </h2>
                {/* <BlogPostInfo item={item} classes={classes} /> */}
                <div className={classes.blogpostDescription}>
                    <RichText classes={{ root: classes.blogpostDescriptionRichtext }} content={short_content} />
                </div>
                <Link to={`/blog/post/${identifier}.html`}>
                    <div className={classes.readMore}>
                        {'Read More'}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default BlogListingItem