import React from 'react'
import BreadCrumb from '../breadcrumb/index';
import classes from '../home/home.css';
import BlogListing from '../blogListing/index';
import SearchBlog from '../searchBlog';
import CateTree from '../cateTree';
import TagList from '../tagList';
import TopicList from '../topicList';
import SidebarPosts from '../sidebarPosts';
import SimibarMonthlyListing from '../simibarMonthlyListing';
import { useParams } from "react-router-dom";
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { useQuery } from '@apollo/client';
import { GET_TAG_BY_URL_KEY, GET_BLOG_BY_TAG_NAME } from '../../talons/Blog.gql';
import { Title, Meta } from '@magento/venia-ui/lib/components/Head';
import RecentComments from '../recentComments';

const Tag = props => {
    const { alias = "" } = useParams();

    const {
        data: resultData,
        loading: resultLoading
    } = useQuery(GET_BLOG_BY_TAG_NAME,
        {
            variables: {
                alias: alias
            },
        }
    )
    if (resultLoading)
        return <LoadingIndicator />
    if (!resultData || !resultData.lofBlogTagByAlias)
        return 'Cannot find item';

    const tagData = resultData.lofBlogTagByAlias

    return (
        <div className={classes.mainCtn}>
            <Title>{tagData.name ? tagData.name : tagData.name}</Title>
            <Meta name="robots" content={tagData.meta_robots} />
            <BreadCrumb items={
                [
                    {
                        label: 'Blog',
                        path: '/blog.html'
                    },
                    {
                        label: tagData.name,
                    }
                ]
            }
            />
            <h1>{tagData.name}</h1>
            <div className={classes.blogRoot}>
                <div className={classes.blogListing}>
                    <BlogListing filterType="get_post_by_tagName" classes={classes}  filterValue={tagData.alias} />
                </div>
                <div className={classes.blogSidebar}>
                    <SearchBlog />
                    <SidebarPosts />
                    <CateTree />
                    <SimibarMonthlyListing />
                    {/* <TopicList /> */}
                    <RecentComments />
                    <TagList />
                </div>
            </div>
        </div>
    )
}

export default Tag