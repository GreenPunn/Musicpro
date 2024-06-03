import Button from '../Button';
import styles from './RecItem.module.css';
import clsx from 'clsx';
import { useContext } from 'react';
import { DataSetContext } from '~/provider/DatasetProvider';
import { getSongsByAlbum } from '~/api/song';
function RecItem({ data, ...props }) {
    const [dataSet, setDataSet] = useContext(DataSetContext).dtSet;
    const [emptyObjectType, setEmptyObjectType] = useContext(DataSetContext).objData
    function handleData() {
        setEmptyObjectType('Albums')
        setDataSet(data)
    }
    return (
        <Button onClick={handleData} disablehover="true" to="/collection">
            <div {...props} className={clsx(styles.wrapper)}>
                <img className={clsx(styles.img)} src={data.image} />
                <div className={clsx(styles.infoWrapper)}>
                    <span className={clsx(styles.mediumSpan)}>{data.name}</span>
                    <span className={clsx(styles.smallSpan)}>{data.artists}</span>
                </div>
            </div>
        </Button>
    );
}

export default RecItem;
