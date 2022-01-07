import React from 'react';
import { arrayOf, func, number, oneOfType, shape, string } from 'prop-types';
import { mergeClasses } from "../../classify";
import mapProduct from "@magento/venia-ui/lib/util/mapProduct";
import SuggestedBrand from './suggestedBrand';
import defaultClasses from './suggestedBrands.css';

const SuggestedBrands = props => {
    const { limit, onNavigate, products } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const items = products.slice(0, limit).map((product, index) => (
        <li key={index} className={classes.item}>
            <SuggestedBrand
                {...mapProduct(product)}
                onNavigate={onNavigate}
            />
        </li>
    ));

    return <ul className={classes.root}>{items}</ul>;
};

export default SuggestedBrands;

SuggestedBrands.defaultProps = {
    limit: 3
};

SuggestedBrands.propTypes = {
    classes: shape({
        item: string,
        root: string
    }),
    limit: number.isRequired,
    onNavigate: func,
    products: arrayOf(
        shape({
            id: oneOfType([number, string])
        })
    ).isRequired
};
