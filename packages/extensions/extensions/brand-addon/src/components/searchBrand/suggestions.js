import React, { Fragment } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { useSuggestionsBrand} from "../../hooks/useSuggestionsBrand";
import SuggestedBrands from "./suggestedBrands";

const Suggestions = props => {
    const {
        displayResult,
        filters,
        products,
        setVisible,
        visible
    } = props;
    const { items } = products;

    const talonProps = useSuggestionsBrand({
        displayResult,
        filters,
        items,
        setVisible,
        visible
    });
    const { onNavigate, shouldRender } = talonProps;

    // render null without data
    if (!shouldRender) {
        return null;
    }

    return (
        <Fragment>
            <SuggestedBrands onNavigate={onNavigate} products={items} />
        </Fragment>
    );
};

export default Suggestions;

Suggestions.propTypes = {
    classes: shape({
        heading: string
    }),
    products: shape({
        filters: arrayOf(
            shape({
                filter_items: arrayOf(shape({})),
                name: string.isRequired
            }).isRequired
        ),
        items: arrayOf(shape({}))
    }),
    searchValue: string,
    setVisible: func,
    visible: bool
};
