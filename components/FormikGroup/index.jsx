import React from 'react';
import FormikChild from "../FormikChild";

/**
 *
 * @param {Children} children
 * @param {string} title
 * @return {React.Component}
 * @constructor
 */
function FormikGroup({group: {children, title}}) {

    return (
        <div>
            <strong>{title}</strong>
            {children.map((child, i) => <FormikChild key={i} child={child}/>)}
        </div>
    )
}

export default FormikGroup;