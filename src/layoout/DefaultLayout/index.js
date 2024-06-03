import clsx from 'clsx';
import styles from './DefaultLayout.module.css';
import NewFeed from '../components/NewFeed';
import HorizontalList from '../components/HorizontalList';
import Layer from '../components/Layer';
import Heading from '../components/Heading';
import Footer from './Footer';
function DefaultLayout({ children, newfeed }) {
    return (
        <>
            <Heading />
            {newfeed && <NewFeed />}
            <div className={clsx(styles.wrapper)}>{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
