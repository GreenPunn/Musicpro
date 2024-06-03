import clsx from 'clsx';
import { useRef, useState } from 'react';
import CryptoJS from 'crypto-js';
import Authen from '.';
import styles from './Login.module.css';
import Button from '~/components/Button';
import BackIcon from '~/images/BackIcon.svg';
import InputField from '~/components/InputField';

import { postUser } from '~/api/user';

function Signup() {
    const [errLabel, setErrLabel] = useState('');
    const [mailErr, setMailErr] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [confirmMess, setConfirmMess] = useState('');
    const [errId, setErrId] = useState(-1);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    let messCode = useRef(0)
    const showMessRef = useRef(()=> {
        setTimeout(()=>{
            setShowToast(false);
        }, 3000)
    })
    const inputFileds = [
        {
            hook: { value: userName, setValue: setUserName },
            mess: 'Enter username',
            filed: 'Username',
            type: 'text',
        },
        {
            hook: { value: email, setValue: setEmail },
            mess: mailErr,
            filed: 'Email',
            type: 'email',
        },
        {
            hook: { value: password, setValue: setPassword },
            mess: 'Enter password',
            filed: 'Password',
            type: 'password',
        },
        {
            hook: { value: confirm, setValue: setConfirm },
            mess: confirmMess,
            filed: 'Confirm Password',
            type: 'password',
        },
    ];

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function handleSubmit() {
        if (userName == '') {
            setErrId(0);
        } else if (email == '') {
            setMailErr('Enter email');
            setErrId(1);
        } else if (!isValidEmail(email)) {
            setMailErr('Invalid email');
            setErrId(1);
        } else if (password == '') {
            setErrId(2);
        } else if (confirm == '') {
            setConfirmMess('Enter password');
            setErrId(3);
        } else if (confirm != password) {
            setConfirmMess('Password is not mess');
            setErrId(3);
        } else {
            pushUs()
        }
    }

    function hashStringSHA1(message) {
        const hash = CryptoJS.SHA1(message).toString(CryptoJS.enc.Hex);
        return hash;
    }

    const pushUs = async function() {
        postUser({userName, name: userName, email, passwordHash: hashStringSHA1(password), image: '', playlists: []})
        .then(
            res => {
                console.log('outer res', res)
                if(res == 'userExisted') {
                    setToastMessage('User name have already existed!')
                    messCode.current = 0
                    setShowToast(true)
                    showMessRef.current()
                }else {
                    messCode.current = 1
                    setToastMessage('Signup successfully!')
                    setShowToast(true)
                    showMessRef.current()


                }
            })
        
    }
    return (
        <>
            {showToast&&<div className={clsx(styles.toastWrapper, {[styles.success]: messCode.current==1, [styles.fail]: messCode.current==0})}>
                {toastMessage}</div>}
            <div className={clsx(styles.backBtn)}>
                <Button to="/login">
                    <img src={BackIcon} /> <span className={clsx(styles.backBtnText)}>Login</span>
                </Button>
            </div>
            <Authen>
                <div className={clsx(styles.wrapper)}>
                    <span className={clsx(styles.title)}>Sign Up</span>
                    {inputFileds.map((item, index) => {
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
                    <span className={clsx(styles.errLabel)}>{errLabel!=''?errLabel:''}</span>
                    <div className={clsx(styles.btnsWrapper)}>
                        <Button onClick={handleSubmit} to="/signup" back="#F0FB54">
                            <span className={clsx(styles.btnInner, styles.blackText)}>Sign up</span>
                        </Button>
                    </div>
                </div>
            </Authen>
        </>
    );
}

export default Signup;
//
