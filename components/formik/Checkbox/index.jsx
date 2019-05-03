import React from 'react';
import {ErrorMessage, Field} from 'formik';

/**
 * @param {string} name
 * @return {React.Component}
 * @constructor
 */
function FormikCheckbox({label, name, value}) {
    return (
        <div>
            <Field id={name} name={name} type={'checkbox'}>
                {({field, form}) => (
                    <input type="checkbox" checked={field.value} id={name}
                           onChange={() => form.setFieldValue(name, !field.value)}/>
                )}
            </Field>
            <label htmlFor={name}>{label}</label>
            <ErrorMessage name={name}/>
        </div>
    )
}

export default FormikCheckbox;