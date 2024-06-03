import clsx from "clsx"
import styles from './Footer.module.css'
import FooterItem from "~/components/FooterItem"
import FacebookIcon from '~/images/FacebookIcon.svg'
import InstaIcon from '~/images/InstaIcon.svg'
import TwitterIcon from '~/images/TwitterIcon.svg'
const data = [
    {
        title: 'Company',
        content: [
            'About',
            'Jobs',
            'For the Record'
        ]
    },{
        title: 'Community',
        content: [
            'For Artists',
            'Developer',
            'Advertisting',
            'Inverster',
            'Vendors'
        ]
    },
    {
        title: 'Useful links',
        content: [
            'Support',
            'Free Mobile App',
            'For the Record'
        ]
    },
    {
        title: 'Plan',
        content: [
            'Premium Invidual',
            'Premium Student',
            'For Free'
        ]
    },
    
]
function Footer() {
    return <>
        <div className={clsx(styles.wrapper)}>
           {data.map(line => <FooterItem data={line} />)}
           <div className={clsx(styles.contact)} >
                <img className={clsx(styles.icon)} src={FacebookIcon} />
                <img className={clsx(styles.icon)} src={TwitterIcon} />
                <img className={clsx(styles.icon)} src={InstaIcon} />
           </div>
        </div>
    </>
}

export  default Footer