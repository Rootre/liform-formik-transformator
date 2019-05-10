import React from 'react';
import {Field} from 'formik';
import classNames from 'classnames';

import FormikError from '../Error';

import getFieldError from 'Helpers/getFieldError';

import styles from './styles.scss';

/**
 * @param {object} field
 * @return {React.Component}
 * @constructor
 */
function FormikRadio({field: {disabled, enum_titles, enum_values, name, label}}) {
    return (
        <Field name={name}>
            {({field, form}) => (
                <div className={classNames(styles.wrapper, {
                    [styles.error]: getFieldError(name, form),
                })}>
                    {label && <label className={styles.label} htmlFor={name}>{label}</label>}
                    {enum_values.map((value, i) => (
                        <span className={styles.radio} key={i}>
                            <input {...field} id={`${name}.${value}`} type={'radio'} value={value} disabled={disabled}/>
                            {enum_titles[i] && <label htmlFor={`${name}.${value}`}>{enum_titles[i]}</label>}
                        </span>
                    ))}
                    <FormikError name={name}/>
                </div>
            )}
        </Field>
    )
}

export default FormikRadio;