import React from 'react';
import {Formik, Form} from 'formik';

import FormikChild from '../Child';

import Context from './Context';

/**
 * @param {React.Component} [button]
 * @param {object} defaultValues
 * @param {string} defaultCountry
 * @param {function} onSubmit
 * @param {Structure} structure
 * @param {object} [validationSchema]
 * @return {React.Component}
 * @constructor
 */
function FormikGenerator({button = null, defaultCountry = 'CZ', defaultValues, onSubmit, structure, validationSchema = {}}) {
    return (
        <Context.Provider value={defaultCountry}>
            <Formik
                initialValues={defaultValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {() => (
                    <Form>
                        {structure.children && structure.children.map((child, i) => (
                            <FormikChild key={i} child={child}/>
                        ))}
                        {button}
                    </Form>
                )}
            </Formik>
        </Context.Provider>
    )
}

export default FormikGenerator;