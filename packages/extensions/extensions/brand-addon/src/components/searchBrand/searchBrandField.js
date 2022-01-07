import React from 'react';
import { func } from 'prop-types';
import { Search as SearchIcon, X as ClearIcon } from 'react-feather';
import { useSearchField } from '@magento/peregrine/lib/talons/SearchBar';
import Icon from "@magento/venia-ui/lib/components/Icon";
import TextInput from "@magento/venia-ui/lib/components/TextInput";
import Trigger from "@magento/venia-ui/lib/components/Trigger";

const clearIcon = <Icon src={ClearIcon} size={24} />;
const searchIcon = <Icon src={SearchIcon} size={24} />;

const SearchBrandField = props => {
    const { isSearchOpen, onChange, onFocus } = props;
    const { inputRef, resetForm, value } = useSearchField({ isSearchOpen });

    const resetButton = value ? (
        <Trigger action={resetForm}>{clearIcon}</Trigger>
    ) : null;

    return (
        <TextInput
            after={resetButton}
            before={searchIcon}
            field="search_query"
            onFocus={onFocus}
            onValueChange={onChange}
            forwardedRef={inputRef}
        />
    );
};

export default SearchBrandField;

SearchBrandField.propTypes = {
    onChange: func,
    onFocus: func
};
