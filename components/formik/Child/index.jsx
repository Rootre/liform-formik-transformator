import React from 'react';

import FormikField from '../Field';
import FormikGroup from '../Group';

/**
 * @param {object} child
 * @param {Field} [child.field]
 * @param {Group} [child.group]
 * @return {React.Component}
 * @constructor
 */
function FormikChild({child}) {
    if (!child.group && !child.field) {
        console.warn('Failed to render FormikChild component', child);

        return null;
    }

    return child.group
        ? <FormikGroup group={child.group}/>
        : <FormikField field={child.field}/>
}

export default FormikChild;