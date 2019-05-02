import React from 'react';
import {Formik, Form} from 'formik';
import FormikChild from "../FormikChild";

function FormikGenerator({button, defaultValues, structure}) {

    return (
        <Formik initialValues={defaultValues}>
            {props => {
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