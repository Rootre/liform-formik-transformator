import React from 'react';
import FormikChild from "../FormikChild";

function FormikGroup({group: {children, title}}) {

    return (
        <div>
            <strong>{title}</strong>
            {children.map((child, i) => <FormikChild key={i} child={child}/>)}
        </div>
    )
}

export default FormikGroup;