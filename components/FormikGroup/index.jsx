import React from 'react';
import FormikChild from "../FormikChild";

function FormikGroup({group: {children}}) {

    return (
        <div>
            {children.map((child, i) => <FormikChild key={i} child={child}/>)}
        </div>
    )
}

export default FormikGroup;