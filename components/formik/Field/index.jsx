import React from 'react';
import {ErrorMessage, Field} from 'formik';

import FormikCheckbox from '../Checkbox';
import FormikRadio from '../Radio';
import FormikSelect from '../Select';

/**
 * @type {Field}
 * @return {React.Component}
 * @constructor
 */
function FormikField({field: {disabled, label, name, enum_titles, enum_values, required, type, value}}) {
    switch (type) {
        case 'checkbox':
            return <FormikCheckbox name={name} label={label} value={value}/>;
        case 'radio':
            return <FormikRadio name={name} label={label} labels={enum_titles} values={enum_values}/>;
        case 'select':
            return <FormikSelect name={name} label={label} labels={enum_titles} value={value} values={enum_values}/>;
        default:
            return (
                <div>
                    {label && <label htmlFor={name}>{label}</label>}
                    <Field id={name} name={name} type={type} required={required} disabled={disabled}/>
                    <ErrorMessage name={name}/>
                </div>
            );
    }
}

export default FormikField;