import React from 'react';
import { oneOf, shape, string, bool } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Banner from '../Banner/Banner';
//import styles from './app.module.css';
import defaultClasses from './app.module.css';

const getSliderClassName = (position, style) =>
    `imageSliderModule_${position}Position${style}`;

const App = props => {
    const {
        children,
        classes: propClasses,
        position,
        style,
        disabled,
        onPress,
        ...restProps
    } = props;

    const classes = useStyle(defaultClasses, propClasses);
    const rootClassName = classes[getSliderClassName(priority, style)];

    return (
        <div className={rootClassName}>
            <div>
                <Banner priority="normal" negative={false}/>
            </div>
        </div>
    );
};

App.propTypes = {
    classes: shape({
        content: string,
        root: string,
        root_highPriority: string,
        root_lowPriority: string,
        root_normalPriority: string
    }),
    position: oneOf(['top', 'bottom', 'content', 'contentTop', 'contentBottom', 'header', 'headerAfter','productAfterDescription','categoryTop', 'categoryBottom','categoryDescription','productBeforeDescription']).isRequired,
    style: string,
    disabled: bool
};

App.defaultProps = {
    position: 'content',
    style: "",
    disabled: false
};

export default App;
