import React from 'react';
import {Field} from 'formik';

import FormikError from '../Error';

/**
 * @param {string} name
 * @param {string[]} labels
 * @param {string[]} values
 * @return {React.Component}
 * @constructor
 */
function FormikSelect({name, label, value, labels, values}) {
    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            <Field name={name}>
                {({field, form}) => (
                    <select defaultValue={value} onChange={e => form.setFieldValue(name, e.target.value)}>
                        {values.map((value, i) => (
                            <option key={i} value={value}>{labels[i]}</option>
                        ))}
                    </select>
                )}
            </Field>
            <FormikError name={name}/>
        </div>
    )
}

export default FormikSelect;