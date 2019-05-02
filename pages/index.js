import Head from 'next/head';

import FormikGenerator from 'Components/FormikGenerator';

import liformSchema from 'Consts/liform_schema.json';
import Liform2Formik from 'Prototypes/Liform2Formik';

function Index() {

    const transformator = new Liform2Formik(liformSchema);

    const structure = transformator.generateStructure();
    const defaultValues = transformator.generateDefaultValues();

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
                structure={structure}
                defaultValues={defaultValues}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default Index;