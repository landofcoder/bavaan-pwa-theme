import { Title } from '@magento/venia-ui/lib/components/Head'
import React from 'react'
import { useParams } from 'react-router-dom'
import BlogListing from '../blogListing'
import BreadCrumb from '../breadcrumb'
import CateTree from '../cateTree'
import classes from '../home/home.css'
import RecentComments from '../recentComments'
import SearchBlog from '../searchBlog'
import SidebarPosts from '../sidebarPosts'
import SimibarMonthlyListing from '../simibarMonthlyListing'
import TagList from '../tagList'
const months = [
    undefined,
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const BlogByDate = (props) => {
    
    const { year, month } = useParams()
    const title = months[parseInt(month)].concat(", ", year)
    const filterValue = year.concat("-", month)
    if (filterValue) {
        return (
            <div className={classes.mainCtn}>
                <Title>{title}</Title>
                <BreadCrumb 
                    items={
                        [
                            {
                                label: 'Blog',
                                path: '/blog.html'
                            },
                            {
                                label: title
                            }
                        ]
                    }
                />
                <h1>{title}</h1>
                <div className={classes.blogRoot}>
                    <div className={classes.blogListing}>
                        <BlogListing classes={classes} filterType="get_post_by_date_time" filterValue={filterValue} />
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
    else return ''
}
export default BlogByDate