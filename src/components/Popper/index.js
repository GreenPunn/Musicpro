import React from 'react';
import clsx from 'clsx';
import styles from './Popper.module.css';
function Popper(props) {

    return <div className={clsx(styles.wrapper, { [styles.center]: props.center })}>{props.children}</div>;
}

export default Popper;
