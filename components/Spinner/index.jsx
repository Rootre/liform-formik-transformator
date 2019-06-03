import React from 'react';
import classNames from 'classnames';

import SpinnerSVG from 'Static/svg/spinner.svg';

import styles from './styles.scss';

const Spinner = ({className, height = 20, width = 20}) => (
    <div className={classNames(styles.wrapper, className)}>
        <SpinnerSVG width={width} height={height} className={styles.spinner}/>
    </div>
);

export default Spinner;