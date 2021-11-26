import gql from 'graphql-tag';

const PageInfoFragment = gql`
    fragment PageInfoFragment on PageInfo {
        pageSize
        currentPage
        hasNextPage
        hasPreviousPage
        startPage
        endPage
    }
`;

const CategoryFragment = gql`
    fragment CategoryFragment on Category {
        category_id
        name
        url_key
        description
        store_ids
        enabled
        meta_title
        meta_keywords
        meta_description
        meta_robots
        parent_id
        path
        position
        level
        children_count
        created_at
        updated_at
        import_source
    }
`;

const TagFragment = gql`
    fragment TagFragment on Tag {
        tag_id
        name
        description
        store_ids
        enabled
        url_key
        meta_title
        meta_keywords
        meta_description
        meta_robots
        created_at
        updated_at
        import_source
    }
`;

const TopicFragment = gql`
    fragment TopicFragment on Topic {
        topic_id
        name
        description
        store_ids
        enabled
        url_key
        meta_title
        meta_keywords
        meta_description
        meta_robots
        created_at
        updated_at
        import_source
    }
`;
const ProductFragment = gql`
    fragment ProductFragment on Product {
        entity_id
        attribute_set_id
        type_id
        sku
        has_options
        required_options
        created_at
        updated_at
    }
`;

const PostFragment = gql`
    fragment PostFragment on Post {
        post_id
        name
        short_description
        image
        enabled
        url_key
        in_rss
        allow_comment
        meta_title
        meta_keywords
        meta_description
        meta_robots
        created_at
        updated_at
        author_id
        author_url
        author_url_key
        author_name
        publish_date
        import_source
        layout
        view_traffic
    }
`;
const BlogFragment = gql`
    fragment BlogFragment on Blog {
        title
        identifier
        short_content
        image
        page_title
        creation_time
        author {
            author_id
            page_title
            nick_name
            meta_keywords
            meta_description
            user_id
            email
            is_view
            social_networks
            user_name
        }
    }
`;
const COMMENT_FRAGMENT = gql`
    fragment CommentFragment on Comment {
        comment_id
        content
        creation_time
        has_read
        is_active
        post_id
        post_identifier
        post_title
        user_email
        user_name
    }
`;
export const GET_BLOG_POSTS = gql`
    query lofBlogPosts(
        $action: String!
        $filter: PostsFilterInput
        $authorName: String
        $tagName: String
        $topicId: Int
        $categoryId: Int
        $categoryKey: String
        $postId: Int
        $pageSize: Int
        $currentPage: Int
    ) {
        lofBlogPosts(
            action: $action
            filter: $filter
            authorName: $authorName
            tagName: $tagName
            topicId: $topicId
            categoryId: $categoryId
            categoryKey: $categoryKey
            postId: $postId
            pageSize: $pageSize
            currentPage: $currentPage
        ) {
            items {
                ...PostFragment
                categories {
                    total_count
                    items {
                        ...CategoryFragment
                    }
                }
            }
            total_count
            pageInfo {
                ...PageInfoFragment
            }
        }
    }
    ${PostFragment}
    ${PageInfoFragment}
    ${CategoryFragment}
`;

export const GET_SEARCH_BLOG_POST = gql`
    query lofBlogPosts($query: String!) {
        lofBlogPosts(
            action: "get_post_list"
            filter: { name: { like: $query } }
        ) {
            items {
                post_id
                name
                short_description
                image
                enabled
                url_key
                publish_date
            }
        }
    }
`;

export const GET_BLOG_CATEGORIES = gql`
    query lofBlogCategories {
        lofBlogCategories(action: "get_category_list", pageSize: 999) {
            items {
                ...CategoryFragment
            }
        }
    }
    ${CategoryFragment}
`;

export const GET_BLOG_TAGS = gql`
    query lofBlogTags {
        lofBlogTags {
            items {
                ...TagFragment
                posts {
                    items {
                        post_id
                    }
                }
            }
        }
    }
    ${TagFragment}
`;

export const GET_BLOG_TOPICS = gql`
    query lofBlogList($pageSize: Int, $currentPage: Int) {
        lofBlogList(pageSize: $pageSize, currentPage: $currentPage) {
            items {
                ...BlogFragment
            }
            total_count
        }
    }
    ${BlogFragment}
`;

export const GET_SIDEBAR_BLOG_POSTS = gql`
    query lofBlogPosts($sortBy: String, $pageSize: Int) {
        lofBlogPosts(
            action: "get_post_list"
            sortBy: $sortBy
            pageSize: $pageSize
        ) {
            items {
                post_id
                name
                short_description
                image
                enabled
                url_key
                publish_date
            }
        }
    }
`;

export const GET_CATE_BY_URL_KEY = gql`
    query lofBlogCategories($url_key: String!) {
        lofBlogCategories(
            action: "get_category_list"
            filter: { url_key: { eq: $url_key } }
        ) {
            items {
                ...CategoryFragment
            }
        }
    }
    ${CategoryFragment}
`;

export const GET_TOPIC_BY_URL_KEY = gql`
    query lofBlogTopics($url_key: String!) {
        lofBlogTopics(filter: { url_key: { eq: $url_key } }) {
            items {
                ...TopicFragment
            }
        }
    }
    ${TopicFragment}
`;

export const GET_TAG_BY_URL_KEY = gql`
    query lofBlogTags($url_key: String!) {
        lofBlogTags(filter: { url_key: { eq: $url_key } }) {
            items {
                ...TagFragment
            }
        }
    }
    ${TagFragment}
`;

export const GET_BLOG_POST_BY_URL_KEY = gql`
    query lofBlogPosts($url_key: String!) {
        lofBlogPosts(
            action: "get_post_list"
            filter: { url_key: { eq: $url_key } }
        ) {
            items {
                ...PostFragment
                post_content
                categories {
                    total_count
                    items {
                        ...CategoryFragment
                    }
                }
                tags {
                    total_count
                    items {
                        ...TagFragment
                    }
                }
                topics {
                    total_count
                    items {
                        ...TopicFragment
                    }
                }
                products {
                    total_count
                    items {
                        ...ProductFragment
                    }
                }
                posts {
                    total_count
                    items {
                        ...PostFragment
                        categories {
                            total_count
                            items {
                                ...CategoryFragment
                            }
                        }
                    }
                }
            }
        }
    }
    ${PostFragment}
    ${CategoryFragment}
    ${TagFragment}
    ${TopicFragment}
    ${ProductFragment}
`;

export const GET_BLOG_ARCHIVE_DETAILS = gql`
    query lofBlogMonthlyArchive($monthly: Int!, $year: Int!) {
        lofBlogMonthlyArchive(monthly: $monthly, year: $year) {
            items {
                label
                quantity
                items {
                    ...PostFragment
                }
            }
            total_count
        }
    }
    ${PostFragment}
`;

export const GET_PRODUCTS_BY_SKUS = gql`
    query getProductsBySku($skus: [String], $pageSize: Int!) {
        products(filter: { sku: { in: $skus } }, pageSize: $pageSize) {
            items {
                id
                name
                sku
                small_image {
                    url
                }
                url_key
                url_suffix
                price {
                    regularPrice {
                        amount {
                            value
                            currency
                        }
                    }
                }
            }
            total_count
        }
    }
`;

export const GET_SEARCH_BLOGS = gql`
    query lofBlogList(
        $search: String
        $filter: BlogFilterInput
        $pageSize: Int
        $currentPage: Int
    ) {
        lofBlogList(
            search: $search
            filter: $filter
            pageSize: $pageSize
            currentPage: $currentPage
        ) {
            items {
                title
                identifier
                short_content
                creation_time
                image
            }
            total_count
        }
    }
`;
export const GET_SIDEBAR_BLOGS = gql`
    query getSidebarBlogs(
        $search: String
        $filter: BlogFilterInput
        $pageSize: Int
        $currentPage: Int
    ) {
        lofBlogList(
            search: $search
            filter: $filter
            pageSize: $pageSize
            currentPage: $currentPage
        ) {
            items {
                post_id
                title
                identifier
                short_content
                image
                creation_time
            }
            total_count
        }
    }
`;
export const BLOG_CATEGORY_FRAGMENT = gql`
    fragment BlogCategoryFragment on Category {
        category_id
        name
        identifier
        description
        stores
        is_active
        meta_keywords
        meta_description
        parent_id
        creation_time
        update_time
        image
    }
`;
export const GET_BLOG_CATEGORIES_LIST = gql`
    query lofBlogCategoryList(
        $search: String
        $pageSize: Int
        $currentPage: Int
    ) {
        lofBlogCategoryList(
            search: $search
            pageSize: $pageSize
            currentPage: $currentPage
        ) {
            items {
                ...BlogCategoryFragment
            }
        }
    }
    ${BLOG_CATEGORY_FRAGMENT}
`;
export const GET_POST_BY_CATEGORY_ID = gql`
    query lofBlogCategoryById($categoryId: Int!) {
        lofBlogCategoryById(category_id: $categoryId) {
            category_id
            name
            identifier
            description
            stores
            is_active
            meta_keywords
            meta_description
            parent_id
            creation_time
            update_time
            image
            posts {
                title
                identifier
                short_content
                image
                page_title
                creation_time
                author {
                    author_id
                    page_title
                    nick_name
                    meta_keywords
                    meta_description
                    user_id
                    email
                    is_view
                    social_networks
                    user_name
                }
            }
        }
    }
`;
export const GET_CATEGORY_META_DATA = gql`
    query lofBlogCategoryById($categoryId: Int!) {
        lofBlogCategoryById(category_id: $categoryId) {
            name
            identifier
            page_title
            meta_keywords
            meta_description
            posts {
                title
                identifier
                short_content
                image
                page_title
                creation_time
                author {
                    author_id
                    page_title
                    nick_name
                    meta_keywords
                    meta_description
                    user_id
                    email
                    is_view
                    social_networks
                    user_name
                }
            }
        }
    }
`;
// export const GET_POPULAR_BLOGS = gql`
//     query lofBlogList($pageSize: Int) {
//         lofBlogList(pageSize: $pageSize) {
//             items {
//                 ...BlogFragment
//             }
//             total_count
//         }
//     }
//     ${BlogFragment}
// `;
export const GET_POPULAR_BLOGS = gql`
    query lofBlogList {
        lofBlogList(sort: { hits: DESC }, pageSize: 5) {
            items {
                ...BlogFragment
            }
            total_count
        }
    }
    ${BlogFragment}
`;
// export const GET_LATEST_BLOGS = gql`
//     query lofBlogList($pageSize: Int, $currentPage: Int) {
//         lofBlogList(pageSize: $pageSize, currentPage: $currentPage) {
//             items {
//                 ...BlogFragment
//             }
//             total_count
//         }
//     }
//     ${BlogFragment}
// `;
export const GET_LATEST_BLOGS = gql`
    query lofBlogList {
        lofBlogList(sort: { creation_time: DESC }, pageSize: 5) {
            items {
                ...BlogFragment
            }
            total_count
        }
    }
    ${BlogFragment}
`;
// export const GET_POST_DETAIL = gql`
//     lofBlogById($post_id: Int!) {
//         lofBlogById(post_id: $post_id) {

//         }
//     }
// `;
export const GET_POST_BY_IDENTIFIER = gql`
    query lofBlogList($identifier: String!) {
        lofBlogList(filter: { identifier: { eq: $identifier } }) {
            items {
                ...BlogFragment
                content
                meta_description
                meta_keywords
                category_id
                creation_time
                hits
                author {
                    nick_name
                    user_id
                    avatar
                    author_id
                }
                related_posts {
                    items {
                        title
                        identifier
                        short_content
                        image
                        page_title
                        creation_time
                        author {
                            author_id
                            page_title
                            nick_name
                            meta_keywords
                            meta_description
                            user_id
                            email
                            is_view
                            social_networks
                            user_name
                        }
                    }
                }
                related_products {
                    items {
                        ... on ProductInterface {
                            color
                            id
                            sku
                            name
                            price {
                                regularPrice {
                                    amount {
                                        value
                                        currency
                                    }
                                }
                            }
                            url_key
                        }
                    }
                }
            }
        }
    }
    ${BlogFragment}
`;

export const GET_TAGS_LIST = gql`
    query lofBlogTagList {
        lofBlogTagList {
            items {
                alias
                meta_robots
                name
                posts {
                    items {
                        ...BlogFragment
                    }
                    total_count
                }
            }
        }
    }
    ${BlogFragment}
`;

export const GET_TAG_BY_ID = gql`
    query lofBlogTagById($tag_id: Int!) {
        lofBlogTagById(tag_id: $tag_id) {
            alias
            meta_robots
            name
            post {
                ...BlogFragment
            }
            tag_id
        }
    }
    ${BlogFragment}
`;

export const GET_RELATED_PRODUCT = gql`
    query lofBlogList($identifier: String!) {
        lofBlogList(filter: { identifier: { eq: $identifier } }) {
            items {
                related_products {
                    items {
                        ... on ProductInterface {
                            color
                            id
                            sku
                            name
                            price {
                                regularPrice {
                                    amount {
                                        value
                                        currency
                                    }
                                }
                            }
                            url_key
                        }
                    }
                }
            }
        }
    }
`;
export const GET_LIST_BLOGS_BY_AUTHOR = gql`
    query lofBlogAuthorById($authorId: Int!) {
        lofBlogAuthorById(author_id: $authorId) {
            posts {
                items {
                    ...BlogFragment
                }
            }
        }
    }
    ${BlogFragment}
`;

export const GET_BLOG_BY_TAG_NAME = gql`
    query lofBlogTagByAlias($alias: String!) {
        lofBlogTagByAlias(alias: $alias) {
            alias
            meta_robots
            name
            posts {
                items {
                    ...BlogFragment
                }
                total_count
            }
        }
    }
    ${BlogFragment}
`;
export const GET_RECENT_COMMENTS = gql`
    query lofBlogCommentList {
        lofBlogCommentList(sort: { creation_time: DESC }, pageSize: 5) {
            items {
                ...CommentFragment
            }
            total_count
        }
    }
    ${COMMENT_FRAGMENT}
`;

export const GET_BLOG_ARCHIVE = gql`
    query lofBlogArchive {
        lofBlogArchive {
            count
            time
        }
    }
`;

export const GET_ARCHIVE_BLOGS_BY_DATE = gql`
    query lofBlogList($like: String!, $pageSize: Int, $currentPage: Int) {
        lofBlogList(
            filter: { creation_time: { like: $like } },
            pageSize: $pageSize,
            currentPage: $currentPage,
        ) {
            items {
                ...BlogFragment
            }
            total_count
        }
    }
    ${BlogFragment}
`;
