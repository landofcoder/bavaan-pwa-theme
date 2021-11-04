import React, {useCallback, useMemo, useState} from 'react'
import BreadCrumb from '../breadcrumb/index';
import classes from './home.css';
import BlogListing from '../blogListing/index';
import SearchBlog from '../searchBlog';
import CateTree from '../cateTree';
import TagList from '../tagList';
import TopicList from '../topicList';
import SidebarPosts from '../sidebarPosts';
import SimibarMonthlyListing from '../simibarMonthlyListing';
import { Title, Meta } from '@magento/venia-ui/lib/components/Head';
import { Util } from '@magento/peregrine';
import RecentComments from '../recentComments';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const Home = props => {
    const [categoryId, setCategoryId] = useState(0);
    const selectCategory = useCallback((event) => {
        setCategoryId(event.value)
        window.location.href = `/blog/category/${event.value}`
    }, [])
    const lofBlogConfiguration = storage.getItem('lofBlogConfiguration');
    let title = 'Blog'
    let description = ''
    let titleName = 'Blog'
    if (lofBlogConfiguration && lofBlogConfiguration.seo && lofBlogConfiguration.general) {
        if (lofBlogConfiguration.seo.meta_title)
            title = lofBlogConfiguration.seo.meta_title
        if (lofBlogConfiguration.seo.meta_description)
            description = lofBlogConfiguration.seo.meta_description
        if (lofBlogConfiguration.general.name)
            titleName = lofBlogConfiguration.general.name
    }
    const cateTree = useMemo(() => <CateTree categoryId={categoryId} selectCategory={selectCategory}/>, [categoryId, selectCategory])
    return (
        <div className={classes.mainCtn}>
            <Title>{title}</Title>
            <Meta name="description" content={description} />
            <BreadCrumb items={
                [
                    {
                        label: 'Blog'
                    }
                ]
            }
            />
            <h1>{titleName}</h1>
            <div className={classes.blogRoot}>
                <div className={classes.blogSidebar}>
                    <SearchBlog/>
                    <SidebarPosts />
                    {/* <SearchBlog />
                    // <SidebarPosts /> */}
                    {/* <CateTree categoryId={categoryId} selectCategory={selectCategory}/> */}
                    {cateTree}
                    {/* <SimibarMonthlyListing />
                    <TopicList />
                    <TagList /> */}
                    {/* <TopicList /> */}
                    <SimibarMonthlyListing />
                    <RecentComments/>
                    <TagList />
                </div>
                <div className={classes.blogListing}>
                    <BlogListing classes={classes} categoryId={categoryId}/>
                </div>
            </div>
        </div>
    )
}

export default Home