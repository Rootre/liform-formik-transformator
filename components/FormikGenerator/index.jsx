import React from 'react';
import {Formik, Form} from 'formik';

import FormikChild from 'Components/FormikChild';

/**
 * @param {React.Component} [button]
 * @param {object} defaultValues
 * @param {function} onSubmit
 * @param {Structure} structure
 * @return {React.Component}
 * @constructor
 */
function FormikGenerator({button = null, defaultValues, onSubmit, structure}) {
    return (
        <Formik initialValues={defaultValues} onSubmit={onSubmit}>
            {() => {
                return (
                    <Form>
                        {structure.children.map((child, i) => <FormikChild key={i} child={child}/>)}
                        {button}
                    </Form>
                )
            }}
        </Formik>
    )
}

export default FormikGenerator;