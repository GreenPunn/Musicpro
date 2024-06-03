import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Button from '~/components/Button';
import styles from './Playlist.module.css';
import ItemList from '~/components/ItemList';
import HeaderOnly from '~/layoout/HeaderOnly';
import Rectangle2 from '~/images/Rectangle2.png';
import singlePauseIcon from '~/images/singlePauseIcon.svg';
import { DataSetContext } from '~/provider/DatasetProvider';
import { getSongsByAlbum } from '~/api/song';
import { getSongByPlaylist, getUserPlaylist } from '~/api/playlist';



function Playlist() {
    const [playlists, setPlaylists] = useState([])
    const [songs, setSongs] = useState([])
    const context = useContext(DataSetContext)
    const [dataSet, setDataSet] = context.dtSet;
    const [emptyObjectType, setEmptyObjectType] = context.objData

    const nav = useNavigate()

    useEffect(()=> {
        if(!localStorage.getItem('user')) {
           nav('/login')
        }

        window.scrollTo(0, 0);
        getSong()


        
        

    }, [])

    async function handlePlaylistClick(item) {
        await getSongByPlaylist(item.id)
        .then(res => {
            setSongs(res)
        })
    }

    useEffect(()=> {
        handleChooseSong(songs[0])
    }, [songs])

    
    const getSong = async function() {
        await getUserPlaylist(JSON.parse(localStorage.getItem('user')).userName)
        .then(res => setPlaylists(res))
    }

    function handleChooseSong(song) {
        context.song.setSong(song);
        context.listSong.setListSong(songs);
        context.showDashboard.setShowDashBoard(true);
    }
    return (
        <div>
            <HeaderOnly title={'Playlist'}>
                 <div className={clsx(styles.wrapper)} >


                        <div className={clsx(styles.container, styles.playlistContainer)}>
                            {playlists&&playlists.map((item, index) => {
                                return <ItemList
                                
                                onClick={()=> handlePlaylistClick(item)}
                                key={index}
                                data={item}
                                index={index + 1}
                            />
                            })}
                            
                        </div>
                        <div className={clsx(styles.container, styles.songContainer)}>


                        {songs&&songs.map((item, index) => {
                                return <ItemList
                                small="true"
                                key={index}
                                data={item}
                                index={index + 1}
                            />
                            })}
                        </div>
                </div>
            </HeaderOnly>
        </div>
    );
}

export default Playlist;
