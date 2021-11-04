import { useState } from 'react';
import { GET_POST_BY_IDENTIFIER } from './Blog.gql'
import { useQuery } from '@apollo/client';

// export const usePost = props => {
//     const { postUrl } = props;
//     const {
//         data: resultData,
//         loading: resultLoading
//     } = useQuery(GET_BLOG_POST_BY_URL_KEY,
//         {
//             variables: {
//                 url_key: postUrl.replace('.html', '')
//             },
//             skip: !postUrl
//         }
//     )
//     return {
//         resultData,
//         resultLoading
//     }
// }
export const usePost = props => {
    const { postUrl } = props;
    const {
        data: resultData,
        loading: resultLoading
    } = useQuery(GET_POST_BY_IDENTIFIER,
        {
            variables: {
                identifier: postUrl.replace('.html', '')
            }
        }
    )
    if (resultData) {
    }
    return {
        resultData,
        resultLoading
    }
}