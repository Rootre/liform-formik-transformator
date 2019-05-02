import React from 'react';

import FormikGroup from 'Components/FormikGroup';
import FormikField from 'Components/FormikField';

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