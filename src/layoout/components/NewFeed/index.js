import Button from '../../../components/Button';
import styles from './NewFeed.module.css';
import { useEffect, useRef } from 'react';

import clsx from 'clsx';
import RecPaner from '~/images/RecPaner.png';
import BackPaner from '~/images/BackPaner.png';
import Panner2 from '~/images/Panner2.jpeg';
import HorizontalList from '../HorizontalList';
function NewFeed() {
    return (
        <div className={clsx(styles.wrapper)} style={{ backgroundImage: `url(${BackPaner})` }}>
            <HorizontalList auto="true" disablebtn={'true'} disablescrolll={'true'} title={'New Releases'}>
                <div className={clsx(styles.body)}>
                    <div>
                        <img src={RecPaner} className={clsx(styles.img)} />
                    </div>

                    <div className={clsx(styles.infoWrapper)}>
                        <span className={clsx(styles.albumName)}>Album's name</span>
                        <span className={clsx(styles.artistName)}>Artist name</span>
                        <Button secondary={'true'} small={'true'}>
                            Listen
                        </Button>
                    </div>
                </div>
                <div className={clsx(styles.body)}>
                    <div>
                        <img src={Panner2} className={clsx(styles.img)} />
                    </div>

                    <div className={clsx(styles.infoWrapper)}>
                        <span className={clsx(styles.albumName)}>Today's Top List</span>
                        <span className={clsx(styles.artistName)}>Kung-Kook</span>
                        <Button secondary={'true'} small={'true'}>
                            Listen
                        </Button>
                    </div>
                </div>
            </HorizontalList>
        </div>
    );
}

export default NewFeed;
