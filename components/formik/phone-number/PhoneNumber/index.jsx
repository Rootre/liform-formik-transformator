import React from 'react';

import PhoneNumberInput from '../Input';

import styles from './styles.scss';

function PhoneNumber({defaultCountry, field}) {
    return (
        <div className={styles.wrapper}>
            <PhoneNumberInput
                defaultCountry={defaultCountry}
                field={field}
            />
        </div>
    );
}

export default PhoneNumber;