import React from 'react';
import { bool, shape, string } from 'prop-types';
import { Form } from 'informed';
import { useSearchBar } from '@magento/peregrine/lib/talons/SearchBar';

import { mergeClasses } from "../../classify";
import AutocompleteBrand from './autocompleteBrand';
import SearchBrandField from './searchBrandField';
import defaultClasses from './searchBrand.css';

const SearchBrandBar = React.forwardRef((props, ref) => {
    const { isOpen } = props;
    const talonProps = useSearchBar();
    const {
        containerRef,
        handleChange,
        handleFocus,
        handleSubmit,
        initialValues,
        isAutoCompleteOpen,
        setIsAutoCompleteOpen,
        valid
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;

    return (
        <div className={rootClassName} ref={ref}>
            <div ref={containerRef} className={classes.container}>
                <Form
                    autoComplete="off"
                    className={classes.form}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <div className={classes.autocomplete}>
                        <AutocompleteBrand
                            setVisible={setIsAutoCompleteOpen}
                            valid={valid}
                            visible={isAutoCompleteOpen}
                        />
                    </div>
                    <div className={classes.search}>
                        <SearchBrandField
                            isSearchOpen={isOpen}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
});

export default SearchBrandBar;

SearchBrandBar.propTypes = {
    classes: shape({
        autocomplete: string,
        container: string,
        form: string,
        root: string,
        root_open: string,
        search: string
    }),
    isOpen: bool
};
