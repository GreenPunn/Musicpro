import clsx from 'clsx';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './HorizontalList.module.css';
import Button from '~/components/Button';
function HorizontalList({ children, title, onClick, ...props }) {
    const [hidden, setHidden] = useState(false);
    const preventDefault = useRef((ev) => {
        if (ev.preventDefault) {
            ev.preventDefault();
        }
        ev.returnValue = false;
    });
    const enableBodyScroll = () => {
        document && document.removeEventListener('wheel', preventDefault.current, false);
    };
    const disableBodyScroll = () => {
        console.log('disable');
        document &&
            document.addEventListener('wheel', preventDefault.current, {
                passive: false,
            });
    };

    function onWheel(apiObj, ev) {
        const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

        if (isThouchpad) {
            ev.stopPropagation();
            return;
        }

        if (ev.deltaY < 0) {
            apiObj.scrollNext();
        } else if (ev.deltaY > 0) {
            apiObj.scrollPrev();
        }
    }
    //===================

    useEffect(() => {
        hidden ? disableBodyScroll() : enableBodyScroll();
    }, [hidden]);

    const intervalInRef = useRef();
    useEffect(() => {
        return () => {
            if (intervalInRef.current) {
                clearInterval(intervalInRef);
                console.log('clear');
            }
            enableBodyScroll();
        };
    }, []);

    function handleSetInterval(apiObj, ev) {
        console.log('init several');
        intervalInRef.current = setInterval(() => {
            apiObj.scrollNext();
        }, 3000);
    }

    return (
        <div
            className={clsx(styles.wrapper)}
            onMouseLeave={() => {
                enableBodyScroll();
            }}
            onMouseEnter={() => {
                !props.disablescrolll == true && disableBodyScroll();
            }}
        >
            <div className={clsx(styles.headingWrapper)}>
                <span className={clsx(styles.title)}>{title}</span>
                {!props.disablebtn && (
                    <Button  onClick={onClick} disablehover={'true'} to={'/empty'}>
                        <span className={clsx(styles.btn)}>Show all</span>
                    </Button>
                )}
            </div>
            <ScrollMenu
               
                onInit={props.auto ? handleSetInterval : () => {}}
                onWheel={onWheel}
                className={clsx(styles.listWrapper)}
            >
                {children}
            </ScrollMenu>
        </div>
    );
}

export default HorizontalList;
