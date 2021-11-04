import React, { useEffect, useState } from 'react';
import {
    GET_BLOG_TOPICS,
    GET_POST_BY_CATEGORY_ID,
    GET_LIST_BLOGS_BY_AUTHOR,
    GET_BLOG_BY_TAG_NAME,
    GET_ARCHIVE_BLOGS_BY_DATE
} from './Blog.gql'
import { useQuery } from '@apollo/client';
import { useToasts } from '@magento/peregrine';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { AlertCircle as AlertCircleIcon } from 'react-feather';
import { usePagination } from '@magento/peregrine';
import { useHistory } from '@magento/venia-drivers';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

const errorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;

export const useBlogListing = props => {
    const history = useHistory()
    const { filterType, filterValue } = props;
    const [pageSize, setPageSize] = useState(10);
    const [paginationValues, paginationApi] = usePagination();
    const { currentPage, totalPages } = paginationValues;
    const { setCurrentPage, setTotalPages } = paginationApi;

    const pageControl = {
        currentPage: currentPage,
        setPage: setCurrentPage,
        totalPages: totalPages
    };
    const variables = {};
    let queryNode = GET_BLOG_TOPICS;
    switch (filterType) {
        case 'get_post_by_categoryId':
            variables.categoryId = parseInt(filterValue);
            if (parseInt(filterValue) == 0) {
                history.replace('blog.html')
            }
            queryNode = GET_POST_BY_CATEGORY_ID
            break;
        case 'get_post_by_authorId':
            variables.authorId = parseInt(filterValue);
            queryNode = GET_LIST_BLOGS_BY_AUTHOR
            break;
        case 'get_post_by_tagName':
            variables.alias = filterValue;
            queryNode = GET_BLOG_BY_TAG_NAME
            break;
        case 'get_post_by_date_time':
            variables.like = `%${filterValue}%`;
            queryNode = GET_ARCHIVE_BLOGS_BY_DATE;
            variables.pageSize = pageSize;
            variables.currentPage = currentPage
            break;
        default:
            variables.pageSize = pageSize;
            variables.currentPage = currentPage;
            break;
    }

    const {
        data: blogData,
        loading: blogLoading,
        error: blogError
    } = useQuery(queryNode,{variables})

    const [, { addToast }] = useToasts();

    // Set the total number of pages whenever the data changes.

    if (blogError) {
        let derivedErrorMessage;
        const errorTarget = blogError;
        if (errorTarget.graphQLErrors) {
            derivedErrorMessage = errorTarget.graphQLErrors
                .map(({ message }) => message)
                .join(', ');
        } else {
            derivedErrorMessage = errorTarget.message;
        }
        if (derivedErrorMessage) {
            if (currentPage && currentPage > 1) {
                window.location.href = '/blog.html';
            } else {
                addToast({
                    type: 'error',
                    icon: errorIcon,
                    message: derivedErrorMessage,
                    dismissable: true,
                    timeout: 7000
                });
            }
        }
    }
    useEffect(() => {
        if (blogData && blogData.lofBlogList && blogData.lofBlogList.items && blogData.lofBlogList.total_count) {
            const pages = (blogData && blogData.lofBlogList && blogData.lofBlogList.items && blogData.lofBlogList.total_count)
            ? parseInt(blogData.lofBlogList.total_count)/pageSize : null;
            const compare = Math.round(pages) < pages
            compare == true ? setTotalPages(Math.round(pages) + 1) : setTotalPages(Math.round(pages))
        }
        return () => {
            setTotalPages(null);
        };
    }, [blogData, totalPages, setTotalPages, pageSize]);
    if (blogLoading) {
        return <LoadingIndicator/>
    }
    if (blogData) {
        return {
            blogData,
            blogLoading,
            blogError,
            pageControl,
            pageSize,
            setPageSize
        }
    }
}