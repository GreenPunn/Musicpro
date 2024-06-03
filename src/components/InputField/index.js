import clsx from 'clsx';
import styles from './InputField.module.css';
function InputField({ valueHook, mess, field, eId, errHook, type, errId }) {
    function handleChange(e) {
        valueHook.setValue(e.target.value);
        errHook.setErrId(-1);
    }

    return (
        <>
            <span className={clsx(styles.errLabel)}>{errHook.errId == errId && mess}</span>
            <input
                onInput={handleChange}
                value={valueHook.value}
                placeholder={field}
                type={type}
                className={clsx(styles.inputField)}
            />
        </>
    );
}

export default InputField;
