import clsx from 'clsx';
import HeaderOnly from '~/layoout/HeaderOnly';
import styles from './Empty.module.css';
import CircleItem from '~/components/CircleItem';
import { useEffect, useContext, useState } from 'react';
import { DataSetContext } from '~/provider/DatasetProvider';
import { getMoreAlbums } from '~/api/album/albumsAPI';
import { getMoreArtist } from '~/api/artist/artistsAPI';
import RecItem from '~/components/RecItem/indedx';
function Empty() {
    
    const [data, setData] = useState([])
    const [emptyObjectType, setEmptyObjectType] = useContext(DataSetContext).objData

    useEffect(()=> {
        if(emptyObjectType == 'Albums') {
            getMoreAlbums(emptyObjectType)
            .then(res=> setData(res))
        }else {
            getMoreArtist()
            .then(res => setData(res))    
        }
    }, [])
    console.log("player data: ", data)

    return <HeaderOnly title={emptyObjectType}><div className={clsx(styles.wrapper)}>
    {data.map((item, index) => (
        <div className={clsx(styles.itemWrapper)}>
            {emptyObjectType == 'Albums'?<RecItem l="true" key={index} data={item} /> :<CircleItem l="true" key={index} data={item} />}
        </div>
    ))}
</div></HeaderOnly>;
}

export default Empty;
