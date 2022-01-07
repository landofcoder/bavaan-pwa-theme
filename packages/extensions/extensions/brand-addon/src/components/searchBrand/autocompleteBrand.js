import React from 'react';
import { gql } from '@apollo/client';
import { bool, func, shape, string } from 'prop-types';
import { useAutocompleteBrand } from "../../hooks/useAutocompleteBrand";
import { useIntl } from 'react-intl';
import defaultClasses from './autocompleteBrand.css';
import { mergeClasses } from "../../classify";
import Suggestions from './suggestions';

const GET_AUTOCOMPLETE_BRAND_RESULTS = gql`
    query lofBrandList($brandName: String) {
        lofBrandList(search: $brandName, currentPage: 1, pageSize: 3) {
            items {
                brand_id
                creation_time
                description
                image
                meta_description
                meta_keywords
                name
                thumbnail
                url_key
            }
            total_count
        }
    }
`;

const AutocompleteBrand = props => {
    const { setVisible, valid, visible } = props;
    const talonProps = useAutocompleteBrand({
        queries: {
            getAutocompleteResults: GET_AUTOCOMPLETE_BRAND_RESULTS
        },
        valid,
        visible
    });
    const {
        displayResult,
        filters,
        messageType,
        products,
        resultCount,
        value
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClassName = visible ? classes.root_visible : classes.root_hidden;

    const { formatMessage } = useIntl();
    const MESSAGES = new Map()
        .set(
            'ERROR',
            formatMessage({
                id: 'autocomplete.error',
                defaultMessage: 'An error occurred while fetching results.'
            })
        )
        .set(
            'LOADING',
            formatMessage({
                id: 'autocomplete.loading',
                defaultMessage: 'Fetching results...'
            })
        )
        .set(
            'PROMPT',
            formatMessage({
                id: 'autocomplete.prompts',
                defaultMessage: 'Search for a brand'
            })
        )
        .set(
            'EMPTY_RESULT',
            formatMessage({
                id: 'autocomplete.emptyResult',
                defaultMessage: 'No results were found.'
            })
        )
        .set('RESULT_SUMMARY', (_, resultCount) =>
            formatMessage(
                {
                    id: 'autocomplete.resultSummary',
                    defaultMessage: '{resultCount} items'
                },
                { resultCount: resultCount }
            )
        )
        .set(
            'INVALID_CHARACTER_LENGTH',
            formatMessage({
                id: 'autocomplete.invalidCharacterLength',
                defaultMessage: 'Search term must be at least three characters'
            })
        );

    const messageTpl = MESSAGES.get(messageType);
    const message =
        typeof messageTpl === 'function'
            ? messageTpl`${resultCount}`
            : messageTpl;

    return (
        <div className={rootClassName}>
            <div className={classes.message}>{message}</div>
            <div className={classes.suggestions}>
                <Suggestions
                    displayResult={displayResult}
                    products={products || {}}
                    filters={filters}
                    searchValue={value}
                    setVisible={setVisible}
                    visible={visible}
                />
            </div>
        </div>
    );
};

export default AutocompleteBrand;

AutocompleteBrand.propTypes = {
    classes: shape({
        message: string,
        root_hidden: string,
        root_visible: string,
        suggestions: string
    }),
    setVisible: func,
    visible: bool
};
