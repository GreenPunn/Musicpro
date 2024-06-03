import HeaderOnly from "~/layoout/HeaderOnly";
import AccountItem from "~/components/AccountItem";
import { useEffect, useState } from "react";
import { delUser, getListUsers } from "~/api/user";
import clsx from "clsx";
import styles from './Admin.module.css'
import Button from "~/components/Button";
import SongItem from "~/components/SongItem";

const accoutnHeadingData = [
    'Tên bài hát',
    'Nghệ sĩ',
    'Producer',
    'Ngày đăng',
    'Lượt nghe'
]

function Admin() {
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
                setCurrUser('')
                let newList = prev.filter(user => user.userName !==currUser);
                return newList
            })
        })
    }
    return (
        <HeaderOnly title={"Administrator"}>
            <div className={clsx(styles.accountManagementHeading)}>

                {accoutnHeadingData.map(item => <span className={clsx(styles.headingItem)}>
                    {item}
                </span>)}
            </div>
            {data.map((item, index) => {
                return <SongItem data={item} click={()=> handleClick(item.userName)} key={index} />
            })}

            {dialog&&<div className={clsx(styles.dialogWrapper)}>
                <span>{`Xác nhận xóa user ${currUser}`}</span>
                <div className={clsx(styles.btnsWrapper)}>
                    <Button onClick={hanndleDel}>Xóa</Button>
                    <Button onClick={handleCancle}>Hủy</Button>
                </div>
            </div>}
        </HeaderOnly>
    );
}

export default Admin;