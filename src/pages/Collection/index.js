import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import Button from '~/components/Button';
import styles from './Collection.module.css';
import ItemList from '~/components/ItemList';
import HeaderOnly from '~/layoout/HeaderOnly';
import singlePauseIcon from '~/images/singlePauseIcon.svg';
import { DataSetContext } from '~/provider/DatasetProvider';
import { getSongsByAlbum, getSongsByArtist } from '~/api/song';
import { getArtistById } from '~/api/artist/artistsAPI';
function Collection() {
    const [dataSet, setDataSet]= useContext(DataSetContext).dtSet;
    const [songs, setSongs] = useState([])
    const [artist, setArtist] = useState({name:"Album"})

    const [emptyObjectType, setEmptyObjectType] = useContext(DataSetContext).objData
    const context = useContext(DataSetContext)
    useEffect(()=> {
        console.log(dataSet)
       
        window.scrollTo(0, 0);
    }, [])


    useEffect(()=> {

        if(emptyObjectType=='Albums') {
            if(dataSet){
                localStorage.setItem('dataSet',JSON.stringify(dataSet));
            }else {
                let localData = JSON.parse(localStorage.getItem('dataSet'));
                setDataSet(localData)
            }
            getSongsByAlbum(dataSet.id)
            .then(res => {
                setSongs(res)   
            })
            
        }
        if(emptyObjectType == 'Artists') {
            if(dataSet){
                localStorage.setItem('dataSet',JSON.stringify(dataSet));
                
            }else {
                let localData = JSON.parse(localStorage.getItem('dataSet'));
                setDataSet(localData)
            }
            getArtistById(dataSet.id).then(res => {setArtist(res)
            })

            getSongsByArtist(dataSet.id)
            .then(res => {
                setSongs(res)   
            })
            
        }
       
    }, [dataSet])

     function handleChooseSong(song) {
  
        context.song.setSong(prev => {

            context.listSong.setListSong(songs);
            context.showDashboard.setShowDashBoard(true);
            return song
        });
    }



    return (
        <div>
            <HeaderOnly title={dataSet ? dataSet.name:'Playlist'}>
                <div className={clsx(styles.wrapper)}>
                    <div className={clsx(styles.playlistInfo)}>
                        <img className={clsx(styles.img)} src={dataSet? dataSet.image:''} />
                        <div className={clsx(styles.infoWrapper)}>
                            <span className={clsx(styles.title)}>{dataSet ? dataSet.name :''}</span>
                            <span className={clsx(styles.artist)}>{artist.name}</span>
                            <span className={clsx(styles.category)}>{dataSet?dataSet.type:''}</span>
                            <Button onClick={songs.length>0?()=> { handleChooseSong(songs[0])}: ()=>console.log("songs empty")}>
                                <img src={singlePauseIcon} className={clsx(styles.iconWrapper)}></img>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.songsWrapper)}>
                    {songs.map((song, index) => {
                        return (
                            <div key={index} className={clsx(styles.songWrapper)}>
                                <ItemList onClick={e=>handleChooseSong(song)} option="true" index={index + 1} data={song} />                         
                            </div>
                        );
                    })}
                </div>
            </HeaderOnly>
        </div>
    );
}
export default Collection