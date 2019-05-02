import React from 'react';

import FormikGroup from 'Components/FormikGroup';
import FormikField from 'Components/FormikField';

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