import React, {useEffect, useState} from 'react';
import {AsYouType, formatIncompletePhoneNumber, parsePhoneNumberFromString} from 'libphonenumber-js';
import {countries} from 'libphonenumber-js/metadata.min.json';
import classNames from 'classnames';
import {Field} from 'formik';

import FilteringDropdown from '../../FilteringDropdown';
import FormikError from '../../Error';
import FormikLabel from '../../Label';

import getFieldError from 'Helpers/getFieldError';

import inputStyles from '../../Input/style.scss';
import styles from './style.scss';

const _countries = Object.keys(countries).map(country => ({
    name: `+${countries[country][0]}`,
    value: country,
}));

function PhoneNumberInput({autofocus, defaultCountry, field: {disabled, label, name, required, type}}) {
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

    useEffect(() => {
        autofocus && inputRef.current.focus();
    }, [autofocus]);

    return (
        <Field name={name} validate={value => {
            if (_isValid(value)) {
                return;
            }

            return 'Format error';
        }}>
            {({field, form}) => {
                const hasError = getFieldError(name, form);

                return (
                    <div className={styles.wrapper}>
                        <FormikLabel label={label}/>
                        <div className={classNames(styles.container, {
                            [styles.error]: hasError,
                        })}>
                            <input
                                {...field}
                                className={classNames(inputStyles.input, styles.input, {
                                    [inputStyles.error]: hasError,
                                })}
                                disabled={disabled}
                                id={name}
                                name={name}
                                type={type}
                                ref={inputRef}
                                placeholder={_getTemplate()}
                                value={_getPhoneFormatted(field.value)}
                            />
                            <FilteringDropdown
                                activeItem={_countries.filter(({value}) => value === country).pop()}
                                className={styles.dropdown}
                                hasError={hasError}
                                items={_countries}
                                onSelect={({value}) => setCountry(value)}
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