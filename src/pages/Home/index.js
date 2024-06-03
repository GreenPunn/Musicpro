import clsx from 'clsx';
import DefaultLayout from '~/layoout/DefaultLayout';
import HorizontalList from '~/layoout/components/HorizontalList';
import SquarePaner from '~/images/SquarePaner.png';
import RecItem from '~/components/RecItem/indedx';
import CircleItem from '~/components/CircleItem';
import styles from './Home.module.css';
import Widget from '~/components/Widget';
import Button from '~/components/Button';
import ItemList from '~/components/ItemList';
import { getAlbums } from '~/api/album/albumsAPI';
import { getArtists } from '~/api/artist/artistsAPI';
import { getTopSongs } from '~/api/song';
import { DataSetContext } from '~/provider/DatasetProvider';
import { useContext, useEffect, useState } from 'react';
function Home({ hooks }) {
    const [albums, setAlbums] = useState([])
    const [artists, setArtists] = useState([])
    const [songs, setSongs] = useState([])
    const context = useContext(DataSetContext)

    const [emptyObjectType, setEmptyObjectType] = useContext(DataSetContext).objData
    useEffect(() => {
        requestAlbum()
        requestArtist()
        requestSongs()
    }, []);
    const requestAlbum = async function() {
        getAlbums()
        .then(res => {
            setAlbums(res)
        })
    }

    const requestArtist = async function() {
        getArtists()
        .then(res => {
            setArtists(res)
        })
    }

    const requestSongs = async function() {
        getTopSongs()
        .then(res=> {
            setSongs(res)
        })
    }




    

     
    const tags = ['Bossa Nova', 'UK Garage', 'Classical', 'Jazz', 'Afo Beat', 'Jersey Club', 'Pop', 'Country'];
    const colors = ['#9F7CCB', '#5D5ADA', '#BE586C', '#DFBD58', '#D05959', '#2F2F2F', '#B43434', '#4AA14D8A'];
    function handleChooseSong(song) {
        
        context.song.setSong(song);
        context.listSong.setListSong(songs);
        context.showDashboard.setShowDashBoard(true);
    }
    return (
        <>
            <DefaultLayout newfeed={'true'}>
                <HorizontalList
                    onClick={() => {
                        setEmptyObjectType('Albums')
                    }}
                    title="Popular albums"
                >
                    {albums.map((item, index) => {
                        return <div key={index} className={clsx(styles.itemWrapper)}>
                                    <RecItem data={item} />
                                </div>;
                    })}
                </HorizontalList>

                <div className={clsx(styles.space)}></div>
                <HorizontalList
                    onClick={() => {
                        setEmptyObjectType('Artists')
                    }}
                    title="Artist"
                >
                    {artists.map((item, index) => {
                        return (
                            <div key={index} className={clsx(styles.itemWrapper)}>
                                <CircleItem s="true"  data={item} />
                            </div>
                        );
                    })}
                </HorizontalList>
                <div className={clsx(styles.widgetWrapper)}>
                    <Widget
                     title={'Genre'}>
                        <div className={styles.flexWidget}>
                            {tags.map((tag, index) => {
                                return (
                                    <span key={index} className={styles.marginRight}>
                                        <Button
                                            back={colors[index]}
                                            key={index}
                                            squarepadding={'true'}
                                            largest={'true'}
                                        >
                                            <span className={styles.tagStyle}>{tag}</span>
                                        </Button>
                                    </span>
                                );
                            })}
                        </div>
                    </Widget>
                    <Widget
                    onClick={() => {
                        setEmptyObjectType('Albums')
                    }}
                    
                    title={'Charts'}>
                        <div className={styles.flexWidget}>
                            {songs.map((item, index) => {
                                return (
                                    <ItemList
                                        onClick={() => handleChooseSong(item)}
                                        key={index}
                                        data={item}
                                        index={index + 1}
                                    />
                                );
                            })}
                        </div>
                    </Widget>
                </div>
            </DefaultLayout>
        </>
    );
}

export default Home;
