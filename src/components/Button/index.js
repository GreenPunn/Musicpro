import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Button.module.css';
function Button(props) {
    if (props.to) {
        return (
            <Link
                {...props}
                style={{ backgroundColor: props.back ? props.back : '' }}
                className={clsx(styles.wrapper, {
                    [styles.largestBtn]: props.largest,
                    [styles.secondary]: props.secondary,
                    [styles.smallBtn]: props.small,
                    [styles.disableHover]: props.disablehover,
                    [styles.flexStart]: props.flexstart,
                    [styles.squarepadding]: props.squarepadding,
                })}
                to={props.to}
            >
                {props.children}
            </Link>
        );
    }

    return (
        <button
            {...props}
            style={{ backgroundColor: props.back ? props.back : '' }}
            className={clsx(styles.wrapper, {
                [styles.largestBtn]: props.largest,
                [styles.secondary]: props.secondary,
                [styles.smallBtn]: props.small,
                [styles.disableHover]: props.disablehover,
                [styles.flexStart]: props.flexstart,
                [styles.squarepadding]: props.squarepadding,
            })}
            {...props}
        >
            {props.children}
        </button>
    );
}

export default Button;
