import clsx from 'clsx';
import styles from './Authen.module.css';
function Authen({ children }) {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.formWrapper)}>{children}</div>
        </div>
    );
}
export default Authen;
