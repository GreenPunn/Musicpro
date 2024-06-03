import clsx from 'clsx';
import styles from './CircleItem.module.css';
import Profile from '~/images/Profile.svg';
import Button from '../Button';
import { useContext } from 'react';
import { DataSetContext } from '~/provider/DatasetProvider';
function CircleItem(props) {
    const [dataSet, setDataSet] = useContext(DataSetContext).dtSet
    const [emptyObjectType, setEmptyObjectType] = useContext(DataSetContext).objData
    function handleData() {
        setDataSet(props.data)
        setEmptyObjectType('Artists')
    }
    return (
        <Button disablehover="true" to="/collection" onClick={handleData}>
            <div {...props} className={clsx(styles.wrapper)}>
                <img className={clsx(styles.image, {[styles.sCircle]: props.s, [styles.lCircle]: props.l})} src={props.data.image ? props.data.image : Profile}></img>
                <span className={clsx(styles.nameField)}>{props.data.name}</span>
            </div>
        </Button>
    );
}

export default CircleItem;
