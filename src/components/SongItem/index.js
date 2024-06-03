import clsx from "clsx";
import styles from "./SongItem.module.css"
import Button from "../Button";
import { delUser, getUser } from "~/api/user";
import { useEffect, useState } from "react";
function SongItem({data, ...props}) {






        
    return <div className={clsx(styles.wrapper)}>
        <span className={clsx(styles.span)}>{data.name}</span>
        <span className={clsx(styles.span)}>{data.artist}</span>
        <span className={clsx(styles.span)}>{data.producer}</span>
        <span className={clsx(styles.span)}>{data.date}</span>
        <span className={clsx(styles.span)}>{data.streams}</span>
        <div className={clsx(styles.btnsWrapper)}>
            <div className={clsx(styles.btnWrapper)}><Button onClick={props.click} >X</Button></div>
        </div>
    </div>
}

export default SongItem;