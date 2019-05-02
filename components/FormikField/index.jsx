import React from 'react';
import {ErrorMessage, Field} from 'formik';

import FormikRadio from 'Components/FormikRadio';

function FormikField({field: {disabled, label, name, radio_titles, radio_values, required, type}}) {
    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            {type === 'radio'
                ? <FormikRadio name={name} labels={radio_titles} values={radio_values}/>
                : <Field id={name} name={name} type={type} required={required} disabled={disabled}/>
            }
            <ErrorMessage name={name}/>
        </div>
    );
}

export default FormikField;