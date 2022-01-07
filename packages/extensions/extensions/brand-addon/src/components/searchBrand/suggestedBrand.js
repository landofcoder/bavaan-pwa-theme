import React, { useCallback } from 'react';
import { func, shape, string } from 'prop-types';
import { mergeClasses } from "../../classify";
import { Link } from 'react-router-dom';
import Image from "@magento/venia-ui/lib/components/Image";
import defaultClasses from './suggestedBrand.css';

const SuggestedBrand = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { thumbnail, name, onNavigate, meta_description } = props;

    const handleClick = useCallback(() => {
        if (typeof onNavigate === 'function') {
            onNavigate();
        }
    }, [onNavigate]);

    const lowercase = name.toLowerCase();
    const formatted = lowercase.replace(' ', '-');

    return (
        <Link className={classes.root} to={`/brand/${formatted}.html`} onClick={handleClick}>
            <Image
                alt={name}
                classes={{ image: classes.thumbnail, root: classes.image }}
                resource={thumbnail}
            />
            <div>
                <p className={classes.name}>{name}</p>
            </div>
            <div>
                <p className={classes.meta_description}>{meta_description}</p>
            </div>
        </Link>
    );
};

SuggestedBrand.propTypes = {
    url_key: string.isRequired,
    name: string.isRequired,
    onNavigate: func,
    thumbnail: string.isRequired,
    meta_description: string.isRequired,
    classes: shape({
        root: string,
        image: string,
        name: string,
        price: string,
        thumbnail: string
    })
};

export default SuggestedBrand;
