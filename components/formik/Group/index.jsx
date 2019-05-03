import React from 'react';

import FormikChild from '../Child';

/**
 * @param {Children} children
 * @param {string} title
 * @return {React.Component}
 * @constructor
 */
function FormikGroup({group: {children, title}}) {

    return (
        <fieldset>
            <legend>{title}</legend>
            {children.map((child, i) => <FormikChild key={i} child={child}/>)}
        </fieldset>
    )
}

export default FormikGroup;