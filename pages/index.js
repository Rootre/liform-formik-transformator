import Head from 'next/head';

import FormikGenerator from 'Components/formik/Generator';

import liformSchema from 'Consts/aaa_json.json';
import Liform2Formik from 'Prototypes/Liform2Formik';

function Index() {

    const transformator = new Liform2Formik(liformSchema.login_form);

    const handleSubmit = props => {
        console.log(props);
    };

    return (
        <div>
            <Head>
                <title>Liform-Formik transformator</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h1>Liform -> Formik</h1>
            <FormikGenerator
                button={<button type={'submit'}>Odeslat</button>}
                structure={transformator.generateStructure()}
                defaultValues={transformator.generateDefaultValues()}
                onSubmit={handleSubmit}
                validationSchema={transformator.generateValidationSchema()}
            />
        </div>
    )
}

export default Index;