import React from 'react'
import { GET_RECENT_COMMENTS } from '../talons/Blog.gql'
import { useQuery } from '@apollo/client'
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator'

export const useRecentComment = props => {
    const {
        data: recentData,
        error: recentError,
        loading: recentLoading
    } = useQuery(GET_RECENT_COMMENTS)

    if (recentLoading) {
        return <LoadingIndicator />
    }
    if (recentError) {
        return 'Can not find items'
    }
    return {
        recentData,
        recentError,
        recentLoading
    }
}