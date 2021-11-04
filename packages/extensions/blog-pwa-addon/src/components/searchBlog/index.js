import React from 'react'
import { useSearchBox } from '../../talons/useSearchBox'
import { Form } from 'informed';
import classes from './search.css'
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { Link } from '@magento/venia-drivers';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { Search as SearchIc } from 'react-feather';

const searchIcon = <Icon src={SearchIc} attrs={{ width: 16 }} />;

const SearchBlog = props => {

    const {
        blogData,
        blogLoading,
        query,
        setQuery
    } = useSearchBox()

    const searchResult = [];
    if (blogData && blogData.lofBlogList && blogData.lofBlogList.items) {
        blogData.lofBlogList.items.map((item, key) => {
            // const {
            //     name,
            //     url_key,
            //     publish_date,
            //     image
            // } = item;
            const {
                title,
                identifier,
                short_content,
                creation_time,
                image
            } = item
            searchResult.push(
                <Link key={key} className={classes.searchItem} to={`/blog/post/${identifier}.html`}>
                    {image ? <div className={classes.searchItemImage} >
                        <img src={image} alt={title} />
                    </div> : ''}
                    <div className={classes.searchItemInfo}>
                        <div className={classes.searchItemName}>{title}</div>
                        <div className={classes.searchItemDate}>{creation_time}</div>
                    </div>
                </Link>
            )
        })
    }

    return (
        <div className="mpblog-search">
            <Form
                autoComplete="off"
                className={classes.searchForm}
            >
                <div className={classes.searchFieldCtn}>
                    <div className={classes.searchField}>
                        {searchIcon}
                        <input
                            id="blog-search-input-field"
                            type="text"
                            onChange={e => {
                                setTimeout(() => {
                                    if (!blogLoading)
                                        setQuery(document.getElementById('blog-search-input-field').value)
                                }, 2000)
                            }}
                            placeholder={`Search blogs here...`}
                        />
                    </div>
                </div>
                {(blogLoading || searchResult) ?
                    <div className={classes.autocomplete}>
                        {blogLoading ? <LoadingIndicator /> : searchResult}
                    </div> : ''}
            </Form>
        </div>
    )
}

export default SearchBlog