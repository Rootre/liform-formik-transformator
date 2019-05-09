import React, {useState} from 'react';
import {Field} from 'formik';
import classNames from 'classnames';

import FormikError from '../Error';

import getFieldError from 'Helpers/getFieldError';

import styles from './styles.scss';

/**
 * @param {string} name
 * @return {React.Component}
 * @constructor
 */
function FormikCheckbox({disabled, label, name, value}) {
    const [isChecked, setIsChecked] = useState(value);

    return (
        <Field name={name} value={value}>
            {({field, form}) => (
                <div className={classNames(styles.wrapper, {
                    [styles.error]: getFieldError(name, form.errors),
                })}>
                    <input
                        {...field}
                        checked={isChecked}
                        id={name}
                        disabled={disabled}
                        onChange={() => {
                            form.setFieldValue(name, !isChecked);
                            setIsChecked(!isChecked);
                        }}
                        type={'checkbox'}
                    />
                    <label htmlFor={name}>{label}</label>
                    <FormikError name={name}/>
                </div>
            )}
        </Field>
    )
}

export default FormikCheckbox;