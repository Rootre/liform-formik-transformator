import React from 'react';
import {Field} from 'formik';

import FormikError from '../Error';

/**
 * @param {object} field
 * @return {React.Component}
 * @constructor
 */
function FormikSelect({field: {enum_titles, enum_values, name, label, value}}) {
    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            <Field name={name}>
                {({field, form}) => (
                    <select defaultValue={value} onChange={e => form.setFieldValue(name, e.target.value)}>
                        {enum_values.map((value, i) => (
                            <option key={i} value={value}>{enum_titles[i]}</option>
                        ))}
                    </select>
                )}
            </Field>
            <FormikError name={name}/>
        </div>
    )
}

export default FormikSelect;