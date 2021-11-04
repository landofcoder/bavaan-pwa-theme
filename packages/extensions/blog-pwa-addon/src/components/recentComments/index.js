import React from 'react';
import classes from './style.css';
import { GET_BLOG_TAGS, GET_TAGS_LIST } from '../../talons/Blog.gql';
import { useQuery } from '@apollo/client';
import { Link } from '@magento/venia-drivers';
import { Util } from '@magento/peregrine';
import { useRecentComment } from '../../talons/useRecentComment';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const RecentComments = () => {
    // const { data: tagListData } = useQuery(GET_TAGS_LIST);
    const { recentData, recentError, recentLoading } = useRecentComment();
    const lofBlogConfiguration = storage.getItem('lofBlogConfiguration');
    let linkColor = '#1ABC9C';
    if (
        lofBlogConfiguration &&
        lofBlogConfiguration.general &&
        lofBlogConfiguration.general.font_color
    ) {
        linkColor = lofBlogConfiguration.general.font_color;
    }
    if (recentError) {
        return <p>Can not find items</p>;
    }
    if (recentLoading) {
        return <LoadingIndicator />;
    }
    if (
        recentData &&
        recentData.lofBlogCommentList &&
        recentData.lofBlogCommentList.items
    ) {
        // const tagItems = tagListData.lofBlogTagList.items;
        // const maxFontSize = 26;
        // let postNumber = 1;
        // tagItems.map(tagItem => {
        //     try {
        //         const itemPostNum = tagItem.posts.items.length;;
        //         postNumber += parseInt(itemPostNum)
        //     } catch (err) {

        //     }
        // });
        return (
            <div className={classes.tagListRoot}>
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                    .${classes.tagItem}:hover { color: ${linkColor} }
                `
                    }}
                />
                <div
                    className={classes.recentCommentsHeader}
                >{`Recent comments`}</div>
                {/* <div className={classes.tagItems}>
                    {tagItems.map((tagItem, index) => {
                        let tagFontSize = 10;
                        return (
                            <Link className={classes.tagItem} to={`/blog/tag/${tagItem.alias}`} style={{ fontSize: tagFontSize }} key={index}>
                                {tagItem.name}
                            </Link>
                        )
                    })}
                </div> */}
                <div className={classes.tagItems}>
                    <ul className={classes.listRecentCommentContainer}>
                        {recentData.lofBlogCommentList.items.map(
                            (item, index) => (
                                <li key={index} className={classes.commentListItem}>
                                    <div
                                        className={
                                            classes.commentLisItemContainer
                                        }
                                    >
                                        <Link
                                            to={`/blog/post/${item.post_identifier}`}
                                            className={classes.commentPostTitle}
                                        >
                                            {item.post_title}
                                        </Link>
                                        <span
                                            className={classes.commentContent}
                                        >
                                            {item.content}
                                        </span>
                                    </div>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        );
    }
    return '';
};
export default RecentComments;
