import clsx from 'clsx';
import styles from './ItemList.module.css';
import Button from '../Button';
import optionIcon from '~/images/optionIcon.svg';
function ItemList({ data, index, option, onClick, small }) {
    return (
        <div onClick={onClick} className={clsx(styles.wrapper, {[styles.m]: small})}>
            <span className={clsx(styles.index)}>{index < 10 ? `0${index}` :  `${index}`}</span>
            {data.image && <img className={clsx(styles.img)} src={data.image} />}{' '}
            <div className={styles.infoWrapper}>
                <span className={clsx(styles.songName)}>{data.name}</span>
                <span className={clsx(styles.artist)}>{data.artist?data.artist.reduce((total, curr)=> {
                    return `${total+curr.name}-`
                }, '').slice(0, -1) : 'Artist'}</span>
            </div>
            {option && (
                <Button>
                    <div className={clsx(styles.optionBtn)}>
                        <img src={optionIcon} />
                    </div>
                </Button>
            )}
        </div>
    );
}
export default ItemList;
