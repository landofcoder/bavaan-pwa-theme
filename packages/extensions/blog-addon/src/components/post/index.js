import React, { useRef, useEffect } from 'react'
import { usePost } from '../../talons/usePost'
import { useParams } from "react-router-dom";
// import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import classes from './postDetails.css';
import { Title, Meta } from '@magento/venia-ui/lib/components/Head';
import BreadCrumb from '../breadcrumb/index';
import SearchBlog from '../searchBlog';
import CateTree from '../cateTree';
import TagList from '../tagList';
import TopicList from '../topicList';
import SidebarPosts from '../sidebarPosts';
import SimibarMonthlyListing from '../simibarMonthlyListing';
import RichContent from '@magento/venia-ui/lib/components/RichContent';
import BlogPostInfo from '../blogPostInfo';
import RelatedPosts from './relatedPosts';
import SharingBlock from '../sharingBlock';
import RelatedProducts from './relatedProducts'
import { has } from "lodash/object";
import { GET_POST_BY_IDENTIFIER } from '../../talons/Blog.gql';
import { useQuery } from '@apollo/client';

import { Util } from '@magento/peregrine';
import RecentComments from '../recentComments';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const Post = props => {
    // const param = useParams()
    const { postUrl = "" } = useParams();
    const standardizedUrl = postUrl.replace(".html", "")
    const {
        data,
        loading,
        error
    } = useQuery(GET_POST_BY_IDENTIFIER, {
        variables: {
            identifier: standardizedUrl
        }
    })
    // if (loading) {
    //     return <LoadingIndicator/>
    // }
    // if (error) {
    //     return <h1>Error</h1>
    // }
    if (data) {
    }
    if (error) {
        return 'An error occurred while processing request'
    }
    const talonProps = usePost({ postUrl });
    const {
        resultData,
        resultLoading
    } = talonProps
    const fbRef = useRef(null);
    useEffect(() => {
        try {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: '1431353733653196',
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v8.0'
                });
            };
        } catch (err) {

        }

        try {
            (function (d, s, id) {
                if (!window.simiImportedFB) {
                    var js; var fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) { return; }
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, 'script', 'facebook-jssdk'));
        } catch (err) {

        }
    }, [postUrl]);

    useEffect(() => {
        try {
            if (resultData && global.document && has(global.window, "FB")) {
                global.FB.XFBML.parse(fbRef.current);
            }
        } catch (err) {

        }
    }, [postUrl, resultData]);

    if (!postUrl)
        return '';
    if (resultLoading)
        return <LoadingIndicator />

    if (!resultData || !resultData.lofBlogList || !resultData.lofBlogList.items || !resultData.lofBlogList.items[0])
        return 'Cannot find item';

    const lofBlogConfiguration = storage.getItem('lofBlogConfiguration');
    let linkColor = '#1ABC9C';
    if (lofBlogConfiguration && lofBlogConfiguration.general && lofBlogConfiguration.general.font_color) {
        linkColor = lofBlogConfiguration.general.font_color;
    }

    const postData = resultData.lofBlogList.items[0];
    const urlToComment = window.location.href;

    return (
        <div className={classes.root}>
            <Title>{postData.title ? postData.title : postData.page_title}</Title>
            <Meta name="description" content={postData.meta_description} />
            <Meta name="keywords" content={postData.meta_keywords} />
            {/* <Meta name="robots" content={postData.meta_robots} /> */}
            <BreadCrumb items={
                [
                    {
                        label: 'Blog',
                        path: '/blog.html'
                    },
                    {
                        label: postData.title,
                    }
                ]
            }
            />
            <h1>{postData.title}</h1>
            <style dangerouslySetInnerHTML={{
                __html: `
                    .${classes.blogPostRichContent} a { color: ${linkColor} }
                    .${classes.relatedPostName} { color: ${linkColor} }
            `}} />
            <div className={classes.blogDetailsRoot}>
                <div className={classes.blogDetailsContent}>
                    {!!postData.image &&
                        <img src={postData.image} alt="post image" className={classes.blogpostImage} />
                    }
                    <RichContent classes={{ root: classes.blogPostRichContent }} html={postData.content} />
                    <div className={classes.blogDetailsPostInfo}>
                        <BlogPostInfo item={postData} classes={classes} />
                    </div>
                    <SharingBlock classes={classes} />
                    {!!(postData && postData.related_posts && postData.related_posts.items) &&
                        <div className={`${classes.relatedPosts} ${classes.detailsSection}`}>
                            <div className={classes.sectionHeader}>
                                {`Related Posts`}
                            </div>
                            <div className={classes.sectionContent}>
                                <RelatedPosts classes={classes} items={postData.related_posts.items} />
                            </div>
                        </div>
                    }
                    {!!(postData && postData.related_products && postData.related_products.items && postData.related_products.items.length) &&
                        <RelatedProducts items={postData.related_products.items} classes={classes} />
                    }
                    <div ref={fbRef}>
                        <div
                            className="fb-comments"
                            data-href={`${urlToComment}`}
                            data-width="100%"
                            data-numposts="5"
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>
                <div className={classes.blogSidebar}>
                    <SearchBlog />
                    <SidebarPosts />
                    <CateTree />
                    {/* <SimibarMonthlyListing /> */}
                    {/* <TopicList /> */}
                    <SimibarMonthlyListing />
                    <RecentComments />
                    <TagList />
                </div>
            </div>
        </div >
    )
}

export default Post