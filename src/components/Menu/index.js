import clsx from 'clsx';
import styles from './Menu.module.css';
import MenuItem from '../MenuItem/MenuItem';
import { useEffect, useState, useContext } from 'react';
import { getArtistById } from '~/api/artist/artistsAPI';
import { DataSetContext } from '~/provider/DatasetProvider';
import { getAlbumById } from '~/api/album/albumsAPI';
import { getSongById } from '~/api/song';
function Menu(props) {
    var [songs, setSongs] = useState([])
    var [albums, setAlbums] = useState([])
    var [artists, setArtists] = useState([])
    const context = useContext(DataSetContext)
    const [dataSet, setDataSet] = context.dtSet;
    const [emptyObjectType, setEmptyObjectType] = context.objData
    async function handleChooseSong(song) {
        context.song.setSong(song);
        context.listSong.setListSong([song]);
        context.showDashboard.setShowDashBoard(true);
    }
    useEffect(()=> {
        if(props.multitask) {
            setSongs(
                props.data.songs.map((song, index)=> {
                return {text: song.name, click : ()=> {
                    handleChooseSong(song)
                }}
            }))
            setArtists( 
                props.data.artists.map((artist, index)=> {
                return {image: artist.image,text: artist.name, click : async ()=> {
                    await getArtistById(artist.id)
                    .then(res => {
                        setDataSet(res)
                        setEmptyObjectType("Artists")
                    })
                }}
            }))
    
            // setAlbums( 
            //     props.data.albums.map((album, index)=> {
            //     return {image: album.image,text: album.name, click : async ()=> {
            //         await getAlbumById(album.id)
            //         .then(res => {
            //             setDataSet(res)
            //             setEmptyObjectType("Albums")
            //         })
            //     }}
            // }))
        }
    }, [props.data])
    console.log(props.data)

    return (
        <div className={clsx(styles.wrapper)}>
            {props.multitask? 
            <>
                <span className={clsx(styles.taskTitle)}>Songs</span>
                {songs? songs.map((song, index) => {
                    return <div key={index} style={{marginLeft:6}}><MenuItem value={song} {...props} /></div>
                }):""}

                <span className={clsx(styles.taskTitle)}>Albums</span>
                {albums? albums.map((album, index) => {
                    return <div key={index} style={{marginLeft:6}}><MenuItem to={'/collection'} value={album} {...props} /></div>
                }):""}
                <span className={clsx(styles.taskTitle)}>Artists</span>
                {artists? artists.map((artist, index) => {
                    return <div key={index} style={{marginLeft:6}}><MenuItem to={'/collection'} value={artist} {...props} /></div>
                }):""}
            </>
            :props.data.map((data, index) => (
                
                <MenuItem onClick={()=>{}} key={index} {...props} value={data} />
            ))}
        </div>
    );
}

export default Menu;
