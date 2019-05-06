import React from 'react';
import {Field} from 'formik';
import classNames from 'classnames';

import FormikError from '../Error';

import getFieldError from 'Helpers/getFieldError';

import styles from './styles.scss';

/**
 * @param {string} name
 * @param {string[]} labels
 * @param {string[]} values
 * @return {React.Component}
 * @constructor
 */
function FormikRadio({disabled, name, label, labels, values}) {
    return (
        <Field name={name}>
            {({field, form}) => (
                <div className={classNames(styles.wrapper, {
                    [styles.error]: getFieldError(name, form.errors),
                })}>
                    {label && <label className={styles.label} htmlFor={name}>{label}</label>}
                    {values.map((value, i) => (
                        <span className={styles.radio} key={i}>
                            <input {...field} id={`${name}.${value}`} type={'radio'} value={value} disabled={disabled}/>
                            {labels[i] && <label htmlFor={`${name}.${value}`}>{labels[i]}</label>}
                        </span>
                    ))}
                    <FormikError name={name}/>
                </div>
            )}
        </Field>
    )
}

export default FormikRadio;