import React from 'react';

import FormikInput from '../Input';

import styles from './styles.scss';

function PhoneNumber({defaultCountry, field}) {
    return (
        <div className={styles.wrapper}>
            <FormikInput
                defaultCountry={defaultCountry}
                field={field}
            />
        </div>
    );
}

export default PhoneNumber;