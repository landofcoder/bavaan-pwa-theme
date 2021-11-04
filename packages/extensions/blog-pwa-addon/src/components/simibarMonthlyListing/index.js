import React from 'react'
import classes from './style.css'
import { GET_BLOG_ARCHIVE } from '../../talons/Blog.gql'
import { useQuery } from '@apollo/client';
import { Link } from '@magento/venia-drivers';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { Calendar as CalendarIc } from 'react-feather';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

const calendarIcon = <Icon src={CalendarIc} attrs={{ width: 13 }} />;
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

const timeArchiveFormat = (archiveTime) => {
    const arr = archiveTime.split('-')
    const montIndex = parseInt(arr.pop())
    return months[montIndex].concat(" ", arr[0])
}

const SimibarMonthlyListing = props => {
    const {
        data,
        error,
        loading
    } = useQuery(GET_BLOG_ARCHIVE)
    if (loading) {
        return <LoadingIndicator />
    }
    if (error) {
        return 'Can not find items'
    }
    return (
        <div className={classes.archiveContainer}>
            <div className={classes.listArchiveHeader}>{`Monthly Archive`}</div>
            <ul className={classes.archiveContainer}>
                {data.lofBlogArchive.map((item, index) => {
                    const arr = item.time.split('-')
                    return (
                        <li key={index} >
                        <Link className={classes.archiveItemContainer} to={`/blog/date/${arr[0]}/${arr[1]}?page=${1}`}>
                            {timeArchiveFormat(item.time)} ( {item.count} )
                        </Link>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SimibarMonthlyListing