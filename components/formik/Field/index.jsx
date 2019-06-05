import React from 'react';
import {Field} from 'formik';

import FormikCheckbox from '../Checkbox';
import FormikCheckboxes from '../Checkboxes';
import FormikInput from '../Input';
import FormikPhone from '../phone-number/PhoneNumber';
import FormikRadio from '../Radio';
import FormikSelect from '../Select';

/**
 * @type {Field}
 * @param {object} field
 * @param {string} field.name
 * @param {string} field.type
 * @param {boolean} [field.disabled]
 * @param {string} [field.label]
 * @param {boolean} [field.required]
 * @return {React.Component}
 * @constructor
 */
function FormikField({field}) {
    switch (field.type) {
        case 'checkbox':
            return <FormikCheckbox field={field}/>;
        case 'radio':
            return <FormikRadio field={field}/>;
        case 'select':
            return <FormikSelect field={field}/>;
        case 'hidden':
            return <Field name={field.name} type={'hidden'}/>;
        case 'checkboxes':
            return <FormikCheckboxes field={field}/>;
        case 'tel':
            return <FormikPhone defaultCountry={'CZ'} field={field}/>;
        default:
            return <FormikInput field={field}/>;
    }
}

export default FormikField;