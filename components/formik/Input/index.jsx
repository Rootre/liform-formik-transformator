import React from 'react';
import {Field} from 'formik';
import classNames from 'classnames';

import FormikError from '../Error';
import FormikLabel from '../Label';

import getFieldError from 'Helpers/getFieldError';

import styles from './style.scss';

function FormikInput({field: {disabled, label, name, required, type}, inputRef, validate}) {
    return (
        <Field name={name} validate={validate}>
            {({field, form}) => (
                <div className={styles.wrapper}>
                    <FormikLabel name={name} label={label}/>
                    <input
                        className={classNames(styles.input, {
                            [styles.error]: getFieldError(name, form),
                        })}
                        disabled={disabled}
                        id={name}
                        type={type}
                        ref={inputRef}
                        {...field}
                    />
                    <FormikError name={name}/>
                </div>
            )}
        </Field>
    );
}

export default FormikInput;