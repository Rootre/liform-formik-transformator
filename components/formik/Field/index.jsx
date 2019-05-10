import React from 'react';
import {Field} from 'formik';
import classNames from 'classnames';

import FormikCheckbox from '../Checkbox';
import FormikCheckboxes from '../Checkboxes';
import FormikError from '../Error';
import FormikRadio from '../Radio';
import FormikSelect from '../Select';

import getFieldError from 'Helpers/getFieldError';

import styles from './style.scss';

/**
 * @type {Field}
 * @return {React.Component}
 * @constructor
 */
function FormikField({field, field: {disabled, label, name, required, type}}) {
    switch (type) {
        case 'checkbox':
            return <FormikCheckbox field={field}/>;
        case 'radio':
            return <FormikRadio field={field}/>;
        case 'select':
            return <FormikSelect field={field}/>;
        case 'hidden':
            return <Field name={name} type={'hidden'}/>;
        case 'checkboxes':
            return <FormikCheckboxes field={field}/>;
        default:
            return (
                <Field name={name}>
                    {({field, form}) => (
                        <div className={styles.wrapper}>
                            {label && <label className={styles.label} htmlFor={name}>{label}</label>}
                            <input className={classNames(styles.input, {
                                [styles.error]: getFieldError(name, form),
                            })} disabled={disabled} id={name} type={type} {...field}/>
                            <FormikError name={name}/>
                        </div>
                    )}
                </Field>
            );
    }
}

export default FormikField;