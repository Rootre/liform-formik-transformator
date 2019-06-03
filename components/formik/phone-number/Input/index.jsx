import React, {useEffect, useState} from 'react';
import {AsYouType, formatIncompletePhoneNumber, parsePhoneNumberFromString} from 'libphonenumber-js';
import {countries} from 'libphonenumber-js/metadata.min.json';
import classNames from 'classnames';
import {Field} from 'formik';

import Dropdown from '../../Dropdown';
import FormikError from '../../Error';
import FormikLabel from '../../Label';

import getFieldError from 'Helpers/getFieldError';

import inputStyles from '../../Input/style.scss';

const _countries = Object.keys(countries).map(name => ({name}));

function PhoneNumberInput({autofocus, defaultCountry, field: {disabled, label, name, required, type}}) {
    const [country, setCountry] = useState(defaultCountry);
    const [phone, setPhone] = useState('wefwe');
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

        return val ? val.isValid() : false;
    }

    function handleChange(e) {
        setPhone(e.target.value);
    }

    useEffect(() => {
        autofocus && inputRef.current.focus();
    }, [autofocus]);

    return (
        <Field name={name} validate={value => {
            if (_isValid(value)) {
                return;
            }

            return 'Error';
        }}>
            {({field, form}) => (
                <div className={inputStyles.wrapper}>
                    <FormikLabel name={name} label={label}/>
                    <Dropdown
                        activeItem={_countries.filter(({name}) => name === country).pop()}
                        className={inputStyles.dropdown}
                        items={_countries}
                        onSelect={({name}) => setCountry(name)}
                    />
                    <input
                        className={classNames(inputStyles.input, {
                            [inputStyles.error]: getFieldError(name, form),
                        })}
                        disabled={disabled}
                        id={name}
                        type={type}
                        ref={inputRef}
                        placeholder={_getTemplate()}
                        value={_getPhoneFormatted(phone)}
                        onChange={e => handleChange(e)}
                        onBlur={() => form.setFieldValue(name, _getPhoneFormatted(phone))}
                    />
                    <FormikError name={name}/>
                </div>
            )}
        </Field>
    );
}

export default PhoneNumberInput;