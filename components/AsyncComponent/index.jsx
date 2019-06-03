import React, {lazy, Suspense} from 'react';

import ErrorBoundary from 'Components/ErrorBoundary';
import Spinner from 'Components/Spinner';

const AsyncComponent = ({load, loader = <Spinner/>, ...rest}) => {
    // for SSR
    if (typeof window === 'undefined') {
        return loader;
    }

    const Component = lazy(load);

    return (
        <ErrorBoundary>
            <Suspense fallback={loader}>
                <Component {...rest}/>
            </Suspense>
        </ErrorBoundary>
    );
};

export default AsyncComponent;