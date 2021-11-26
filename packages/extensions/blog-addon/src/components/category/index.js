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
import { GET_CATE_BY_URL_KEY, GET_CATEGORY_META_DATA } from '../../talons/Blog.gql';
import { Title, Meta } from '@magento/venia-ui/lib/components/Head';
import RecentComments from '../recentComments';

const Category = props => {
    const { categoryId = "" } = useParams();
    const {
        data: cateData,
        loading: cateLoading,
        error: cateError
    } = useQuery(GET_CATEGORY_META_DATA, {
        variables: {
            categoryId: parseInt(categoryId)
        }
    })
    if (cateLoading) {
        return <LoadingIndicator/>
    }
    if (cateError) {
        return null;
    }
    if (cateData) {
    }

    return (
        <div className={classes.mainCtn}>
            <BreadCrumb items={
                [
                    {
                        label: 'Blog',
                        path: '/blog.html'
                    },
                    {
                        label: cateData.lofBlogCategoryById.name,
                    }
                ]
            }
            />
            <h1>{cateData.lofBlogCategoryById.name}</h1>
            <div className={classes.blogRoot}>
                <div className={classes.blogSidebar}>
                    <SearchBlog />
                    <SidebarPosts />
                    <CateTree />
                    <SimibarMonthlyListing />
                    {/* <TopicList /> */}
                    <RecentComments />
                    <TagList />
                </div>
                <div className={classes.blogListing}>
                    <BlogListing classes={classes} filterType="get_post_by_categoryId" filterValue={categoryId} />
                </div>
            </div>
        </div>
    )
}

export default Category