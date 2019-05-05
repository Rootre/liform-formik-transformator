import React from 'react';
import {ErrorMessage} from 'formik';

import styles from './style.scss';

function FormikError({name}) {
    return (
        <ErrorMessage name={name} render={msg => (
            <div className={styles.error}>{msg}</div>
        )}/>
    );
}

export default FormikError;