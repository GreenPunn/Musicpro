import clsx from 'clsx';
import CryptoJS from 'crypto-js';
import { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Authen from '.';
import { getUser } from '~/api/user';
import styles from './Login.module.css';
import Label from '~/images/Label.svg';
import Button from '~/components/Button';
import InputField from '~/components/InputField';
function Login() {
    const [logged, setLogged] = useState(false);
    const [errId, setErrId] = useState(-1);
    const [username, setUsername] = useState('');
    const [errLogin, setErrLogin] = useState('');
    const [password, setPassword] = useState('');
    const refBtn = useRef();
    const inputFields = [
        {
            hook: { value: username, setValue: setUsername },
            mess: 'Enter username',
            filed: 'Username',
            type: 'text',
        },
        {
            hook: { value: password, setValue: setPassword },
            mess: 'Enter password',
            filed: 'Password',
            type: 'password',
        },
    ];

    function handleSubmit() {
        if (username == '') {
            setErrId(0);
        } else if (password == '') {
            setErrId(1);
        } else {
            getUser(username, hashStringSHA1(password))
            .then(res => {
                if(res === 'invalidAuthenInfo') {
                    setErrLogin("Username or password is invalid")
                    console.log('err    ')
                }else {

                    localStorage.setItem('token', res.jwt)
                    localStorage.setItem('user', JSON.stringify(res.user))
                    console.log( res.jwt)
                    setLogged(true);
                }
            })
        }
    }
    function hashStringSHA1(message) {
        const hash = CryptoJS.SHA1(message).toString(CryptoJS.enc.Hex);
        return hash;
    }
    return (
        <Authen>
            {logged && <Navigate to={'/'} replace={true} />}
            <div className={clsx(styles.wrapper)}>
                <img src={Label} className={clsx(styles.labelImg)} />
                {inputFields.map((item, index) => {
                    return (
                        <InputField
                            eId={errId}
                            key={index}
                            field={item.filed}
                            errId={index}
                            type={item.type}
                            valueHook={item.hook}
                            errHook={{ errId, setErrId }}
                            mess={item.mess}
                        />
                    );
                })}
                <span className={clsx(styles.errLabel)}>{errLogin}</span>
                <div className={clsx(styles.btnsWrapper)}>
                    <Button to="/signup" back="#252525">
                        <span className={clsx(styles.btnInner)}>Sign up</span>
                    </Button>
                    <div className={clsx(styles.space)}></div>
                    <Button onClick={handleSubmit} back="#F0FB54">
                        <span className={clsx(styles.blackText, styles.btnInner)}>Login</span>
                    </Button>
                </div>
            </div>
            <Button ref={refBtn} to="/"></Button>
        </Authen>
    );
}

export default Login;
