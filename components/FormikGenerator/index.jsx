import React from 'react';
import {Formik, Form} from 'formik';
import FormikChild from "../FormikChild";

function FormikGenerator({defaultValues, structure}) {

    return (
        <Formik initialValues={defaultValues}>
            {props => {
                console.log(props);
                return (
                    <Form>
                        {structure.children.map((child, i) => <FormikChild key={i} child={child}/>)}
                    </Form>
                )
            }}
        </Formik>
    )
}

export default FormikGenerator;