import React from 'react';
import {Field} from 'formik';

import Dropdown from '../Dropdown';
import FormikError from '../Error';

import getFieldError from 'Helpers/getFieldError';

import styles from './style.scss';

/**
 * @param {object} field
 * @return {React.Component}
 * @constructor
 */
function FormikSelect({field: {enum_titles, enum_values, name, label, value}}) {
    return (
        <div className={styles.wrapper}>
            {label && <label className={styles.label} htmlFor={name}>{label}</label>}
            <Field name={name}>
                {({field, form}) => (
                    <Dropdown
                        activeItem={value ? {
                            name: enum_titles[enum_values.indexOf(value)],
                            value,
                        } : false}
                        hasError={getFieldError(name, form)}
                        items={enum_values.map((value, i) => ({
                            name: enum_titles[i],
                            value,
                        }))}
                        onDidMount={item => form.setFieldValue(name, item.value)}
                        onSelect={item => form.setFieldValue(name, item.value)}
                    />
                )}
            </Field>
            <FormikError name={name}/>
        </div>
    )
}

export default FormikSelect;