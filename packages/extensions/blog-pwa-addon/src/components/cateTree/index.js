import React from 'react';
import { useCateTree } from '../../talons/useCateTree'
import classes from './cateTree.css'
import { useHistory } from '@magento/venia-drivers';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Redirect } from 'react-router-dom';

const CateTree = props => {
    const { categoryId, selectCategory } = props;
    const { dataCateTree } = useCateTree(classes)
    const history = useHistory();
    if (!dataCateTree || !dataCateTree.length)
        return ''
    const handle = (event) => {
        event.value != 0 ? history.push(`/blog/category/${event.value}?page=${1}`): history.push("/blog.html")
    }
    const defaultOption = dataCateTree[0]
    return (
        <div className={classes.catetreeRoot}>
            <div className={classes.catetreeHeader}>{`Categories`}</div>
                <Dropdown
                    placeholderClassName={classes.placeholderCategory}
                    options={dataCateTree}
                    value={defaultOption}
                    placeholder="Select an option"
                    controlClassName={classes.controlCategory}
                    onChange={handle}
                />
        </div>
    )
}
export default CateTree