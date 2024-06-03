import clsx from "clsx";
import styles from "./AccountItem.module.css"
import Button from "../Button";
import { delUser, getUser } from "~/api/user";
import { useEffect, useState } from "react";
function AccountItem({data, ...props}) {






        
    return <div className={clsx(styles.wrapper)}>
        <span className={clsx(styles.span)}>{data.userName}</span>
        <span className={clsx(styles.span)}>{data.name}</span>
        <span className={clsx(styles.span)}>{data.email}</span>
        <div className={clsx(styles.btnsWrapper)}>
            <div className={clsx(styles.btnWrapper)}><Button onClick={props.click} >X</Button></div>
        </div>
    </div>
}

export default AccountItem;