import React from 'react';
import classNames from 'classnames';

import FormikChild from '../Child';

import styles from './style.scss';

/**
 * @param {Children} children
 * @param {string} title
 * @return {React.Component}
 * @constructor
 */
function FormikGroup({group: {block, children, title}}) {
    return (
        <div className={classNames({
            [styles.inline]: block === 'inline',
        })}>
            {children.map((child, i) => (
                <div className={styles.child} key={i}>
                    <FormikChild child={child}/>
                </div>
            ))}
        </div>
    );
}

export default FormikGroup;