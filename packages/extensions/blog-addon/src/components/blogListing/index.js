import React, { useEffect } from 'react'
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './blogListing.css'
import { useBlogListing } from '../../talons/useBlogListing'
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import BlogListingItem from '../blogListingItem'
import Pagination from '@magento/venia-ui/lib/components/Pagination';
import { Util } from '@magento/peregrine';
import { listBlogs } from '../../data/blogs';
const data = listBlogs();
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const BlogListing = props => {
    const { filterType, filterValue } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const talonProps = useBlogListing({ filterType, filterValue })
    const {
        blogData,
        blogLoading,
        blogError,
        pageControl,
        pageSize,
        setPageSize
    } = talonProps
    /*
    fake data
    */
    // blogData = data;
    const lofBlogConfiguration = storage.getItem('lofBlogConfiguration');

    let linkColor = '#1ABC9C';
    if (lofBlogConfiguration && lofBlogConfiguration.general && lofBlogConfiguration.general.font_color) {
        linkColor = lofBlogConfiguration.general.font_color;
    }

    useEffect(() => {
        if (blogLoading) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }, [blogLoading]);

    if (blogLoading)
        return <LoadingIndicator />
    if (blogError)
        return ''
    let lofBlogList = null;
    // if (filterType == "get_post_by_categoryId") {
    //     lofBlogList = blogData.posts
    // }
    // if ((!lofBlogList.items || !lofBlogList.total_count) && !lofBlogList.posts)
    //     return <div className={classes.blogEmpty} >{'There are no posts at this moment'}</div>
    let blogsWrapper = null;
    if (blogData) {
        if (filterType == "get_post_by_categoryId") {
            lofBlogList = blogData.lofBlogCategoryById
            if (!lofBlogList.posts) {
                return <div className={classes.blogEmpty} >{'There are no posts at this moment'}</div>
            }
            // if (blogLoading) {
            //     return <LoadingIndicator/>
            // }
            blogsWrapper = lofBlogList.posts.map((item, index) => 
                <React.Fragment key={index}>
                    <BlogListingItem classes={classes} item={item} key={item.post_id} lofBlogConfiguration={lofBlogConfiguration} />
                </React.Fragment>
            )
        }
        else if (filterType == "get_post_by_authorId") {
            lofBlogList = blogData.lofBlogAuthorById
            if (!blogData.lofBlogAuthorById.posts || !blogData.lofBlogAuthorById.posts.items) {
                return <div className={classes.blogEmpty} >{'There are no posts at this moment'}</div>
            }
            blogsWrapper = lofBlogList.posts.items.map((item, index) => (
                <React.Fragment key={index}>
                    <BlogListingItem classes={classes} item={item} key={item.post_id} lofBlogConfiguration={lofBlogConfiguration} />
                </React.Fragment>
            ))
        }
        else if (filterType == "get_post_by_tagName") {
            lofBlogList = blogData.lofBlogTagByAlias
            if (!blogData.lofBlogTagByAlias.posts || !blogData.lofBlogTagByAlias.posts.items) {
                return <div className={classes.blogEmpty} >{'There are no posts at this moment'}</div>
            }
            blogsWrapper = blogData.lofBlogTagByAlias.posts.items.map((item, index) => (
                <React.Fragment key={index}>
                    <BlogListingItem classes={classes} item={item} key={item.post_id} lofBlogConfiguration={lofBlogConfiguration} />
                </React.Fragment>
            ))
        }
        else {
            lofBlogList = blogData.lofBlogList
            if (!lofBlogList.items || !lofBlogList.total_count) {
                return <div className={classes.blogEmpty} >{'There are no posts at this moment'}</div>
            }
            blogsWrapper = lofBlogList.items.map((item, index) =>
                <React.Fragment key={index}>
                    <BlogListingItem classes={classes} item={item} key={item.post_id} lofBlogConfiguration={lofBlogConfiguration} />
                </React.Fragment>
            )
        }
        return (
            <div className={classes.blogListingCtn} >
                {blogsWrapper}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .${classes.blogpostItem} h2 { color: ${linkColor} }
                    .${classes.readMore} { color: ${linkColor} }
                `}} />
                <div className={classes.pagination}>
                    <Pagination pageControl={pageControl} />
                </div>
                <div className={classes.pageSize}>
                    Show
                    <span className={classes.pageSizeInput}>
                        <select
                            onChange={e => {
                                setPageSize(e.target.value); pageControl.setPage(1)
                            }
                            }
                            value={pageSize}
                        >
                            <option value="5" >5</option>
                            <option value="10" >10</option>
                            <option value="20" >20</option>
                        </select>
                    </span>
                    per page
                </div>
            </div>
        )
    }
    return ''
    // const lofBlogPosts = data;
    // return (
    //     <div className={classes.blogListingCtn} >
    //         {blogsWrapper}
    //         <style dangerouslySetInnerHTML={{
    //             __html: `
    //             .${classes.blogpostItem} h2 { color: ${linkColor} }
    //             .${classes.readMore} { color: ${linkColor} }
    //         `}} />
    //         <div className={classes.pagination}>
    //             <Pagination pageControl={pageControl} />
    //         </div>
    //         <div className={classes.pageSize}>
    //             {`Show `}
    //             <span className={classes.pageSizeInput}>
    //                 <select
    //                     onChange={e => {
    //                         setPageSize(e.target.value); pageControl.setPage(1)
    //                     }
    //                     }
    //                     value={pageSize}
    //                 >
    //                     <option value="5" >5</option>
    //                     <option value="10" >10</option>
    //                     <option value="20" >20</option>
    //                 </select>
    //             </span>
    //             {` per page`}
    //         </div>
    //     </div>
    // )
}
export default BlogListing