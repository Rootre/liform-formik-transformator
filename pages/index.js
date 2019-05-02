import Head from 'next/head';

import liformSchema from 'Consts/liform_schema.json';
import Liform2Formik from 'Prototypes/Liform2Formik';

function Index() {

    const transformator = new Liform2Formik(liformSchema);
    const structure = transformator.generateStructure();

    console.log('structure', structure);

    return (
        <div>
            <Head>
                <title>Liform-Formik transformator</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h1>Liform -> Formik</h1>
        </div>
    )
}

export default Index;