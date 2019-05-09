import React from 'react';

import FormikCheckbox from '../Checkbox';

/**
 * @param {object} field
 * @return {React.Component}
 * @constructor
 */
function FormikCheckboxes({field: {enum_titles, enum_values, name, label}}) {
    if (!enum_values || enum_values.length === 0) {
        return null;
    }

    return (
        <div>
            {label && <label>{label}</label>}
            {enum_values.map((value, i) => <FormikCheckbox label={enum_titles[i]} name={`${name}[]`} value={value}/>)}
        </div>
    )
}

export default FormikCheckboxes;