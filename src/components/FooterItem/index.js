import Footer from "~/layoout/DefaultLayout/Footer";

import clsx from "clsx";
import styles from './FooterItem.module.css'
function FooterItem({data}) {
    return <div className={styles.wrapper}>
        <span className={clsx(styles.title)}>
            {data.title}
        </span>
        {data.content.map(line => <span className={clsx(styles.content)}>{line}</span>)}
    </div>
}

export default FooterItem