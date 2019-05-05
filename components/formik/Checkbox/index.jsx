import React, {useState} from 'react';
import {ErrorMessage, Field} from 'formik';

/**
 * @param {string} name
 * @return {React.Component}
 * @constructor
 */
function FormikCheckbox({label, name, value}) {
    const [isChecked, setIsChecked] = useState(value);

    return (
        <div>
            <Field id={name} name={name} type={'checkbox'} value={value}>
                {({field, form}) => (
                    <input
                        {...field}
                        id={name}
                        type={'checkbox'}
                        checked={isChecked}
                        onChange={() => {
                            form.setFieldValue(name, !isChecked);
                            setIsChecked(!isChecked);
                        }}/>
                )}
            </Field>
            <label htmlFor={name}>{label}</label>
            <ErrorMessage name={name}/>
        </div>
    )
}

export default FormikCheckbox;