import React, { useMemo } from 'react'
import classes from './sidebarPosts.css'
import { useSidebarPosts } from '../../talons/useSidebarPosts'
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { Link } from '@magento/venia-drivers';
import { Util } from '@magento/peregrine';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const PostItem = props => {
    const {
        title,
        image,
        creation_time,
        identifier
    } = props.item;
    return (
        <div className={classes.sidebarPostItem}>
            {
                image ? <div className={classes.sidebarPostItemImage} >
                    <img src={image} alt={title} />
                </div> : ''
            }
            <div className={classes.sidebarPostItemInfo}>
                <Link className={classes.sidebarPostItemName} to={`/blog/post/${identifier}.html`}>
                    {title}
                </Link>
                <div className={classes.sidebarPostItemDate}>{creation_time}</div>
            </div>
        </div>
    )
}

const SidebarPosts = props => {
    const {
        tab,
        setTab,
        popData,
        popLoading,
        latestData,
        latestLoading
    } = useSidebarPosts();

    const lofBlogConfiguration = storage.getItem('lofBlogConfiguration');
    let linkColor = '#1ABC9C';
    if (lofBlogConfiguration && lofBlogConfiguration.general && lofBlogConfiguration.general.font_color) {
        linkColor = lofBlogConfiguration.general.font_color;
    }

    const popPosts = useMemo(() => {
        if (popData && popData.lofBlogList && popData.lofBlogList.items) {
            return popData.lofBlogList.items.map((item, index) => <PostItem item={item} key={index} />)
        }
        return []
    }, [popData])

    const latestPosts = useMemo(() => {
        if (latestData && latestData.lofBlogList && latestData.lofBlogList.items) {
            return latestData.lofBlogList.items.map((item, index) => <PostItem item={item} key={index} />)
        }
        return []
    }, [latestData])


    return (
        <div className={classes.root}>
            <style dangerouslySetInnerHTML={{
                __html: `
                .${classes.sidebarPostItemName} { color: ${linkColor} }
            `}} />
            <div className={classes.tabsHeaders}>
                <div className={`${classes.tabsHeader} ${tab === 'pop' ? classes.active : classes.inactive}`}
                    onClick={() => setTab('pop')}
                >
                    {`Popular`}
                </div>
                <div className={`${classes.tabsHeader} ${tab === 'latest' ? classes.active : classes.inactive}`}
                    onClick={() => setTab('latest')}
                >
                    {`Latest`}
                </div>
            </div>
            <div className={classes.tabContents}>
                <div className={`${classes.tabContent} ${tab === 'pop' ? classes.active : classes.inactive}`} >
                    {popLoading ? <LoadingIndicator /> : ''}
                    {popPosts}
                </div>
                <div className={`${classes.tabContent} ${tab === 'latest' ? classes.active : classes.inactive}`} >
                    {latestLoading ? <LoadingIndicator /> : ''}
                    {latestPosts}
                </div>
            </div>
        </div>
    )
}

export default SidebarPosts