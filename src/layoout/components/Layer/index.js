import clsx from 'clsx';
import { useEffect, useState, useRef, useContext } from 'react';
import Pause from '~/images/Pause.svg';
import styles from './Layer.module.css';
import Button from '~/components/Button';
import { isUserLiked } from '~/api/favorite';
import NextIcon from '~/images/NextIcon.svg';
import PrevIcon from '~/images/PrevIcon.svg';
import SuffIcon from '~/images/SuffIcon.svg';
import VolumeIcon from '~/images/VolumeIcon.svg';
import whiteHeart from '~/images/whiteHeart.svg';
import YellowHeart from '~/images/YellowHeart.svg';
import AddListIcon from '~/images/AddListIcon.svg';
import ContinueIcon from '~/images/ContinueIcon.svg';
import YellowSuffIon from '~/images/YellowSuffIon.svg';
import { DataSetContext } from '~/provider/DatasetProvider';
import { faL } from '@fortawesome/free-solid-svg-icons';
function Layer({ data, hooks }) {
    const [islogged, setIsLogged] = useState(false);
    const [isSuffed, setIsSuffed] = useState(true);
    const [isPlay, setIsPlay] = useState(false);
    const [song, setSong] = useState({});
    const [volume, setVolume] = useState(40);
    const [progress, setProgress] = useState(0);
    const [songIndex, setSongIndex] = useState(0);
    const [liked, setLiked] = useState(false);
    const context = useContext(DataSetContext)
    const ref = useRef(new Audio());
    const refFunction = useRef()

    useEffect(() => {
        if (isPlay) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
        return () => {
            if (isPlay) {
                ref.current.pause();
            }
        };
    }, [isPlay]);

    useEffect(() => {
        ref.current.pause()
        console.log("change song: ", ref.current.paused,context.song.song)
        if(context.song.song) {
            if(localStorage.getItem('authen')) {
                isUserLiked(localStorage.getItem('authen'),context.song.song.id)
                .then(res => setLiked(res))
            }
            for (let i = 0; i < context.listSong.listSong.length; i++) {
                if (context.song.song.id == context.listSong.listSong[i].id) {
                    setSongIndex((prev) => {
                        return i;
                    });
    
                    break;
                }
            }
            ref.current.src = context.song.song.src;
            ref.current.play();
            setIsPlay(true);
        }
        return ()=> {
            ref.current.pause()
        }
    }, [context.song.song]);

    useEffect(() => {
        
        refFunction.current = () => {
            if(songIndex == context.listSong.listSong.length-1) {
                setIsPlay(false)
            }else {
                nextSong()
            }
        };
        ref.current.addEventListener('ended', refFunction.current)
        
        ref.current.addEventListener('timeupdate', updateProgress);
        return () => {
            ref.current.removeEventListener('ended',  refFunction.current);
            ref.current.removeEventListener('timeupdate', updateProgress);
        };
    }, [context.listSong.listSong]);



    useEffect(() => {
        ref.current.volume = volume / 100;
    }, [volume]);

    function handleClick() {
        setIsLogged(!islogged);
    }
    function handleSuffClick() {
        setIsSuffed(!isSuffed);
    }

    function handlePlay() {
        setIsPlay(!isPlay);
    }

    const updateProgress = () => {
        const currentProgress = (ref.current.currentTime / ref.current.duration) * 100;
        setProgress(currentProgress);
    };

    function nextSong() {
        setSongIndex((prevSongIndex) => {
            let newIndex = ((prevSongIndex+1)%  context.listSong.listSong.length)||0

            console.log("index:", newIndex);
            context.song.setSong(context.listSong.listSong[newIndex]);
            return newIndex;
        });
    }


    return (
        <div className={clsx(styles.wrapper)}>
            {<div className={clsx(styles.infoWrapper)}>
                <img className={clsx(styles.img)} src={context.song.song ? context.song.song.image : null}></img>
                <div className={clsx()}>
                    <span className={clsx(styles.span, styles.stableWidth)}>{context.song.song? context.song.song.name:""}</span>
                    <span className={styles.span}>{context.song.song&&context.song.song.artist.reduce((total, curr)=> {
                    return `${total+curr.name}-`
                }, '').slice(0, -1) || 'Artist'}</span>
                </div>
                <Button disablehover={'true'} onClick={handleClick}>
                    <img className={clsx(styles.icon)} src={liked ? YellowHeart : whiteHeart} />
                </Button>
            </div>}
            <div className={clsx(styles.middleLayerWrapper)}>
                <div className={clsx(styles.progressWrapper)}>
                    <span className={clsx(styles.progressNum)}>{`${
                        parseInt(ref.current.currentTime) <= 9
                            ? `0:0${parseInt(ref.current.currentTime)}`
                            : `0:${parseInt(ref.current.currentTime)}`
                    }`}</span>
                    <input
                        min={0}
                        max={100}
                        value={progress ? progress : 0}
                        onChange={(e) => {
                            ref.current.currentTime = (e.target.value * ref.current.duration) / 100;
                            if (!isPlay) {
                                setIsPlay(true);
                            }
                            setProgress(e.target.value);
                        }}
                        className={clsx(styles.progress)}
                        type="range"
                    />
                    <span className={clsx(styles.progressNum)}>
                        {ref.current.duration ? `0:${parseInt(ref.current.duration)}` : '0:30'}
                    </span>
                </div>
                <div className={clsx(styles.layerFunction)}>
                    <Button disablehover={'true'} onClick={handleSuffClick}>
                        <img src={isSuffed ? YellowSuffIon : SuffIcon} />
                    </Button>
                    <Button>
                        <img src={PrevIcon} />
                    </Button>
                    <Button onClick={handlePlay}>
                        <img src={isPlay ? ContinueIcon : Pause} />
                    </Button>
                    <Button onClick={nextSong}>
                        <img src={NextIcon} />
                    </Button>
                    <Button>
                        <img src={AddListIcon} />
                    </Button>
                </div>
            </div>
            <div className={clsx(styles.volumeWrapper)}>
                <img src={VolumeIcon} />
                <div className={clsx(styles.progressWrapper)}>
                    <input
                        onChange={(e) => {
                            setVolume(e.target.value);
                        }}
                        value={volume}
                        min={0}
                        max={100}
                        className={clsx(styles.progress, styles.smallBar)}
                        type="range"
                    />
                </div>
            </div>
        </div>
    );
}

export default Layer;
