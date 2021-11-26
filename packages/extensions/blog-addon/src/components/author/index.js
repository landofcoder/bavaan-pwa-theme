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
import { Title, Meta } from '@magento/venia-ui/lib/components/Head';
import { useLocation, useParams } from "react-router-dom";
import RecentComments from '../recentComments';

const Topic = props => {
    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search)
    const authorName = urlSearch.get("author_name");
    const authorId = urlSearch.get("author_id")
    
    if (authorName && authorId) {
        return (
            <div className={classes.mainCtn}>
                <Title>{authorName}</Title>
                <BreadCrumb items={
                    [
                        {
                            label: 'Blog',
                            path: '/blog.html'
                        },
                        {
                            label: 'Author',
                        }
                    ]
                }
                />
                <h1>{authorName}</h1>
                <div className={classes.blogRoot}>
                    <div className={classes.blogListing}>
                        <BlogListing classes={classes} filterType="get_post_by_authorId" filterValue={authorId} />
                    </div>
                    <div className={classes.blogSidebar}>
                        <SearchBlog />
                        <SidebarPosts />
                        <CateTree />
                        <SimibarMonthlyListing />
                        <RecentComments />
                        <TagList />
                    </div>
                </div>
            </div>
        )
    }
    return ''
}

export default Topic