import React from 'react';
import {Field} from 'formik';

import FilteringDropdown from '../FilteringDropdown';
import FormikError from '../Error';

import getFieldError from 'Helpers/getFieldError';

import styles from './style.scss';

/**
 * @param {object} field
 * @return {React.Component}
 * @constructor
 */
function FormikSelect({field: {enum_titles, enum_values, name, label, value: defaultValue}}) {
    const items = enum_values.map((value, i) => ({
        name: enum_titles[i],
        value,
    }));

    return (
        <div className={styles.wrapper}>
            {label && <label className={styles.label} htmlFor={name}>{label}</label>}
            <Field name={name}>
                {({field, form}) => (
                    <FilteringDropdown
                        activeItem={defaultValue ? {
                            name: enum_titles[enum_values.indexOf(defaultValue)],
                            value: defaultValue,
                        } : items[0]}
                        autofocus
                        hasError={getFieldError(name, form)}
                        items={items}
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