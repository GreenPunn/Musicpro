import HeaderOnly from "~/layoout/HeaderOnly";
import AccountItem from "~/components/AccountItem";
import { useEffect, useState } from "react";
import { delUser, getListUsers } from "~/api/user";
import clsx from "clsx";
import styles from './Profile.module.css'
import Button from "~/components/Button";
import SongItem from "~/components/SongItem";
import Avatar from '~/images/Avatar.png'


function Profile() {
    const [data, setData] = useState([
        {
            name: 'Glory glory Man United',
            artist: 'Manchester United F.C',
            producer: 'Manchester United F.C.',
            date: '1-1-1983',
            streams: 1000000,
        },{
            name: 'Glory glory Man United',
            artist: 'Manchester United F.C',
            producer: 'Manchester United F.C.',
            date: '1-1-1983',
            streams: 3000000,
        },{
            name: 'Chúng ta của tương lai',
            artist: 'Sơn Tùng MTP',
            producer: 'Sơn Tùng MTP',
            date: '3-3-2024',
            streams: 91000000,
        }
    ])
    const [currUser, setCurrUser] = useState()
    const [dialog, setDialog] = useState(false)


    // useEffect(()=> {
    //     getListUsers()
    //     .then(res => {
    //         setData(res)
    //     })
    // }, [])

    // useEffect(()=> {
    //     if(currUser == ''){
    //         setDialog(false)
    //     }
    // }, [currUser])

    const userData = localStorage.getItem('user');

    if (userData) {
        setCurrUser(JSON.parse(userData));
    }



    function handleClick(usname) {
        setCurrUser(usname)
        setDialog(true)
    }

    function handleCancle() {
        setDialog(false)    
        setCurrUser('')
    }

    function hanndleDel() {
        delUser(currUser) 
        .then(res => {
            if(res =='successfully') {
                alert('remove successfully')
            }
            setData(prev => {
                setCurrUser({})
                let newList = prev.filter(user => user.userName !==currUser);
                return newList
            })
        })
    }
    return (
        <HeaderOnly title={"Profile"}>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.card)}>
                    <img src={Avatar} className={clsx(styles.avatar)} />
                    
                    <span className={clsx(styles.text, styles.username)} >{currUser? currUser.userName : 'User'}</span>
                    <span className={clsx(styles.text, styles.small)} >{currUser? currUser.name :'USer'}</span>
                    <span className={clsx(styles.text, styles.small)} >{currUser? currUser.email : 'us@gmial.com'}</span>
                </div>

            </div>
        </HeaderOnly>
    );
}

export default Profile;