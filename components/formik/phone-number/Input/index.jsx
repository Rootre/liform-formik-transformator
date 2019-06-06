import React, {useEffect, useState} from 'react';
import {AsYouType, formatIncompletePhoneNumber, parsePhoneNumberFromString} from 'libphonenumber-js';
import {countries} from 'libphonenumber-js/metadata.min.json';
import classNames from 'classnames';
import {FastField} from 'formik';

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

function PhoneNumberInput({autofocus, defaultCountry, field, field: {disabled, label, name, type, value}}) {
    const parsedDefaultValue = value && parsePhoneNumberFromString(value);

    const [country, setCountry] = useState(parsedDefaultValue ? parsedDefaultValue.country : defaultCountry);
    const asYouType = new AsYouType(country);
    const inputRef = React.createRef();

    function _getFullNumber(phone) {
        const parsedPhone = parsePhoneNumberFromString(phone, country);
        return parsedPhone ? parsedPhone.number : phone;
    }
    function _getPhoneFormatted(phone) {
        const parsedPhone = parsePhoneNumberFromString(phone, country);
        return formatIncompletePhoneNumber(parsedPhone ? parsedPhone.nationalNumber : phone, country);
    }
    function _getTemplate() {
        return asYouType.getTemplate();
    }

    function _isValid(phone) {
        const val = parsePhoneNumberFromString(phone, country);

        return val && val.isValid();
    }

    function handleFilterSelect({value}) {
        setCountry(value);
        inputRef.current.focus();
    }

    useEffect(() => {
        autofocus && inputRef.current.focus();
    }, [autofocus]);

    return (
        <FastField name={name} validate={value => {
            if (_isValid(value)) {
                return;
            }

            const errors = getSingleFieldErrors(field);

            return errors.format || errors[Object.keys(errors)[0]];
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
                                onChange={e => {
                                    e.target.value = _getFullNumber(e.target.value);
                                    field.onChange(e);
                                }}
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
                                activeItem={_countries.filter(({value}) => value === country).slice(-1)[0]}
                                autofocus
                                className={styles.dropdown}
                                hasError={hasError}
                                items={_countries}
                                itemTemplate={({highlightedResult, name}) => (
                                    <div dangerouslySetInnerHTML={{__html: highlightedResult || name}}/>
                                )}
                                onSelect={item => handleFilterSelect(item)}
                            />
                        </div>
                        <FormikError name={name}/>
                    </div>
                );
            }}
        </FastField>
    );
}

export default PhoneNumberInput;