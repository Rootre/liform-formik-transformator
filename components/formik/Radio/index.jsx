import React from 'react';
import {Field} from 'formik';
import classNames from 'classnames';

import FormikError from '../Error';
import FormikLabel from '../Label';

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
                    <FormikLabel className={styles.title} label={label} name={name}/>
                    {enum_values.map((value, i) => (
                        <span className={styles.radio} key={i}>
                            <input {...field} id={`${name}.${value}`} type={'radio'} value={value} disabled={disabled}/>
                            <FormikLabel className={styles.label} label={enum_titles[i]} name={`${name}.${value}`}/>
                        </span>
                    ))}
                    <FormikError name={name}/>
                </div>
            )}
        </Field>
    )
}

export default FormikRadio;