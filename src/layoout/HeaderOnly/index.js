import clsx from 'clsx';
import styles from './HeaderOnly.module.css';
import Button from '~/components/Button';
import BackIcon from '~/images/BackIcon.svg';
import Heading from '../components/Heading';
import DefaultLayout from '../DefaultLayout';
function HeaderOnly({ title, children, ...props }) {
    return (
        <DefaultLayout>
            <div className={clsx(styles.wrapper)}>
                <Button disablehover to="/">
                    <span className={clsx(styles.btnWrapper)}>
                        <img src={BackIcon} />
                        <span className={clsx(styles.title)}>{title}</span>
                    </span>
                </Button>
                {children}
            </div>
        </DefaultLayout>
    );
}

export default HeaderOnly;
