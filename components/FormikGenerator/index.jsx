import React from 'react';
import {Formik, Form} from 'formik';
import FormikChild from "../FormikChild";

function FormikGenerator({button, defaultValues, structure}) {

    const handleSubmit = props => {
        console.log(props);
    };

    return (
        <Formik initialValues={defaultValues} onSubmit={handleSubmit}>
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