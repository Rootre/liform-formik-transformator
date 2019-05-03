import React from 'react';
import {Formik, Form} from 'formik';

import FormikChild from '../Child';

/**
 * @param {React.Component} [button]
 * @param {object} defaultValues
 * @param {function} onSubmit
 * @param {Structure} structure
 * @param {object} [validationSchema]
 * @return {React.Component}
 * @constructor
 */
function FormikGenerator({button = null, defaultValues, onSubmit, structure, validationSchema = {}}) {
    return (
        <Formik initialValues={defaultValues} onSubmit={onSubmit} validationSchema={validationSchema}>
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