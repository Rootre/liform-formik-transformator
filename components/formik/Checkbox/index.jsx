import React, {useState} from 'react';
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
function FormikCheckbox({field: {disabled, label, name, value}}) {
    const [isChecked, setIsChecked] = useState(value);

    return (
        <Field name={name} value={value}>
            {({field, form}) => (
                <div className={classNames(styles.wrapper, {
                    [styles.error]: getFieldError(name, form),
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
                    <FormikLabel className={styles.label} name={name} label={label}/>
                    <FormikError name={name}/>
                </div>
            )}
        </Field>
    )
}

export default FormikCheckbox;