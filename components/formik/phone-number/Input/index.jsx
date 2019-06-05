import React, {useEffect, useState} from 'react';
import {AsYouType, formatIncompletePhoneNumber, parsePhoneNumberFromString} from 'libphonenumber-js';
import {countries} from 'libphonenumber-js/metadata.min.json';
import classNames from 'classnames';
import {Field} from 'formik';

import FilteringDropdown from '../../FilteringDropdown';
import FormikError from '../../Error';
import FormikLabel from '../../Label';

import getFieldError from 'Helpers/getFieldError';
import getSingleFieldErrors from 'Helpers/getSingleFieldErrors';

import inputStyles from '../../Input/style.scss';
import styles from './style.scss';

const _countries = Object.keys(countries).map(country => ({
    name: `+${countries[country][0]}`,
    value: country,
}));

function PhoneNumberInput({autofocus, defaultCountry, field, field: {name}}) {
    const [country, setCountry] = useState(defaultCountry);
    const asYouType = new AsYouType(country);
    const inputRef = React.createRef();

    function _getPhoneFormatted(phone) {
        return formatIncompletePhoneNumber(phone, country);
    }

    function _getTemplate() {
        return asYouType.getTemplate();
    }

    function _isValid(phone) {
        const val = parsePhoneNumberFromString(phone, country);

        return phone && val ? val.isValid() : false;
    }

    function handleFilterSelect({value}) {
        setCountry(value);
        inputRef.current.focus();
    }

    useEffect(() => {
        autofocus && inputRef.current.focus();
    }, [autofocus]);

    return (
        <Field name={name} validate={value => {
            if (_isValid(value)) {
                return;
            }

            const errors = getSingleFieldErrors(field);

            return errors.format || errors[Object.keys(errors).shift()];
        }}>
            {({field, form}) => {
                const hasError = getFieldError(name, form);

                return (
                    <div className={styles.wrapper}>
                        <FormikLabel label={field.label}/>
                        <div className={classNames(styles.container, {
                            [styles.error]: hasError,
                        })}>
                            <input
                                {...field}
                                className={classNames(inputStyles.input, styles.input, {
                                    [inputStyles.error]: hasError,
                                })}
                                disabled={field.disabled}
                                id={name}
                                name={name}
                                type={field.type}
                                ref={inputRef}
                                placeholder={_getTemplate()}
                                value={_getPhoneFormatted(field.value)}
                            />
                            <FilteringDropdown
                                activeItem={_countries.filter(({value}) => value === country).pop()}
                                autofocus
                                className={styles.dropdown}
                                hasError={hasError}
                                items={_countries}
                                onSelect={item => handleFilterSelect(item)}
                            />
                        </div>
                        <FormikError name={name}/>
                    </div>
                );
            }}
        </Field>
    );
}

export default PhoneNumberInput;