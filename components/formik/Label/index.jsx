import React from 'react';
import classNames from 'classnames';

import styles from './style.scss';

function FormikLabel({className, label, name}) {
    if (!label) {
        return null;
    }

    return (
        <label className={classNames(className, styles.label)} htmlFor={name} dangerouslySetInnerHTML={{__html: label}}/>
    );
}

export default FormikLabel;