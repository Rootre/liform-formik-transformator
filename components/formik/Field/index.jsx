import React from 'react';
import {ErrorMessage, Field} from 'formik';

import FormikCheckbox from '../Checkbox';
import FormikRadio from '../Radio';

/**
 * @type {Field}
 * @return {React.Component}
 * @constructor
 */
function FormikField({field: {disabled, label, name, enum_titles, enum_values, required, type, value}}) {
    return type === 'checkbox'
        ? <FormikCheckbox name={name} label={label} value={value}/>
        : type === 'radio'
            ? <FormikRadio name={name} label={label} labels={enum_titles} values={enum_values}/>
            : (
                <div>
                    {label && <label htmlFor={name}>{label}</label>}
                    <Field id={name} name={name} type={type} required={required} disabled={disabled}/>
                    <ErrorMessage name={name}/>
                </div>
            );
}

export default FormikField;