import React from 'react';
import {ErrorMessage, Field} from 'formik';

/**
 * @param {string} name
 * @param {string[]} labels
 * @param {string[]} values
 * @return {React.Component}
 * @constructor
 */
function FormikRadio({name, label, labels, values}) {
    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            {values.map((value, i) => (
                <span key={i}>
                    {labels[i] && <label htmlFor={`${name}.${value}`}>{labels[i]}</label>}
                    <Field id={`${name}.${value}`} value={value} name={name} type={'radio'}/>
                </span>
            ))}
            <ErrorMessage name={name}/>
        </div>
    )
}

export default FormikRadio;