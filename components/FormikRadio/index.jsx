import React from 'react';
import {Field} from 'formik';

function FormikRadio({name, labels, values}) {
    return (
        <div>
            {values.map((value, i) => (
                <span key={i}>
                    {labels[i] && <label htmlFor={`${name}.${value}`}>{labels[i]}</label>}
                    <Field id={`${name}.${value}`} name={name} type={'radio'}/>
                </span>
            ))}
        </div>
    )
}

export default FormikRadio;