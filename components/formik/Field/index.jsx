import React from 'react';
import {Field} from 'formik';
import classNames from 'classnames';

import FormikCheckbox from '../Checkbox';
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
function FormikField({field: {disabled, label, name, enum_titles, enum_values, required, type, value}}) {
    switch (type) {
        case 'checkbox':
            return <FormikCheckbox name={name} label={label} value={value}/>;
        case 'radio':
            return <FormikRadio name={name} label={label} labels={enum_titles} values={enum_values}/>;
        case 'select':
            return <FormikSelect name={name} label={label} labels={enum_titles} value={value} values={enum_values}/>;
        default:
            return (
                <Field name={name}>
                    {({field, form}) => {
                        return (
                            <div className={styles.wrapper}>
                                {label && <label className={styles.label} htmlFor={name}>{label}</label>}
                                <input className={classNames(styles.input, {
                                    [styles.error]: getFieldError(name, form.errors),
                                })} disabled={disabled} id={name} required={required} type={type} {...field}/>
                                <FormikError name={name}/>
                            </div>
                        )
                    }}
                </Field>
            );
    }
}

export default FormikField;