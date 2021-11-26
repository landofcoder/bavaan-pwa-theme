import React from 'react';
import { GET_BLOG_CATEGORIES, GET_BLOG_CATEGORIES_LIST } from './Blog.gql'
import { useQuery } from '@apollo/client';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

const unflatten = (arr) => {
    const tree = [];
    const mappedArr = {};
    let arrElem;
    let mappedElem;

    for (var i = 0, len = arr.length; i < len; i++) {
        arrElem = arr[i];
        arrElem.label = arrElem.name;
        mappedArr[arrElem.category_id] = arrElem;
        mappedArr[arrElem.category_id]['children'] = [];
    }

    for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            if (mappedElem.parent_id) {
                mappedArr[mappedElem['parent_id']]['children'].push(mappedElem);
            }
            else {
                tree.push(mappedElem);
            }
        }
        const unflatten = (arr) => {
            const tree = [];
            const mappedArr = {};
            let arrElem;
            let mappedElem;
        
            for (var i = 0, len = arr.length; i < len; i++) {
                arrElem = arr[i];
                arrElem.label = arrElem.name;
                mappedArr[arrElem.category_id] = arrElem;
                mappedArr[arrElem.category_id]['children'] = [];
            }
        
            for (var id in mappedArr) {
                if (mappedArr.hasOwnProperty(id)) {
                    mappedElem = mappedArr[id];
                    if (mappedElem.parent_id) {
                        mappedArr[mappedElem['parent_id']]['children'].push(mappedElem);
                    }
                    else {
                        tree.push(mappedElem);
                    }
                }
            }
            return tree;
        }}
    return tree;
}
const dataCleaning = ((categoryArray, classes) => {
    const groupCategory = [];
    groupCategory.push({
        value: 0,
        label: "All"
    })
    categoryArray.map((category, index) => {
        const item = {
            value: category.category_id,
            label: <React.Fragment key={index}>
                <img src={category.image ? `http://magento2.landofcoder.com/media/${category.image}` : ''} width={32} height={32} />
                <p style={{ padding: "9px 0 0 15px" }}>{category.name}</p>
            </React.Fragment>
        }
        item['className'] = classes.customOptionCategory
        groupCategory.push(item)
    })
    
    return groupCategory
})
const conditionFunc = (category) => {
    return
}
const groupCategoryHandle = ((categoryArray) => {
    const length = categoryArray.length;
    const result = [];
    for (let i = 0; i < length; i++) {
        const parent = {...categoryArray[i], children: []}
        if (!parent.parent_id) {
            for (let j = 0; j < length; j++) {
                if (categoryArray[i].parent_id == parent.category_id) {
                    parent.children.push(categoryArray[i])
                }
            }
            result.push(parent)

        }
    }
})
export const useCateTree = props => {
    const {
        data: cateData,
        loading: cateLoading,
        error: cateError
    } = useQuery(GET_BLOG_CATEGORIES_LIST, {
        variables: {
            search: "",
            pageSize: 20,
            currentPage: 1
        }
    })

    let dataCateTree = [];
    if (cateLoading) {
        return <LoadingIndicator />
    }
    if (cateError) {
        return null
    }
    if (cateData && cateData.lofBlogCategoryList && cateData.lofBlogCategoryList.items) {
        dataCateTree = dataCleaning(cateData.lofBlogCategoryList.items, props)
        return {
            dataCateTree,
            cateLoading,
        }
    }
}