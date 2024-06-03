import clsx from 'clsx';
import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import styles from './Heading.module.css';
import Button from '../../../components/Button';
import Profile from '~/images/Profile.svg';
import Search from '~/components/Search';
import Menu from '~/components/Menu';
import whiteUser from '~/images/whiteUSer.svg';
import Setting from '~/images/Setting.svg';
import Popper from '~/components/Popper';
import { useNavigate } from 'react-router-dom';
import MenuItem from '~/components/MenuItem/MenuItem';


const btns = [
    {
        title: 'Playlist',
        to: '/playlist',
    },
    {
        title: 'Favorite',
        to: '/favorite',
    },
    {
        title: 'Podcast',
        to: '/podcast',
    },
];

function Heading() {
    const [showOption, setShowOption] = useState(false);
    const [activeBtn, setActiveBtn] = useState(-1);
    const nav = useNavigate()
    const [data, setData] = useState([
        {
            icon: whiteUser,
            text: 'Profile',
            to: '/profile',
            click: ()=> {
                nav('/profile')
            }
        },
        {
            icon: Setting,
            text: 'Setting',
        },
        {
            icon: whiteUser,
            iconFill: 'invert(70%) sepia(96%) saturate(2456%) hue-rotate(315deg) brightness(103%) contrast(99%)',
            text: 'Log out',
            click: () =>{localStorage.removeItem('user')
           window.location.reload();
        
        }
        },
    ]);
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [user, setUser] = useState('Admin');

    useEffect(()=> {
        if(user && user.userName == 'Admin') {
            console.log(user.userName);
            setData(prev => {
                prev.unshift({
                    icon: whiteUser,
                    iconFill: 'invert(70%) sepia(96%) saturate(2456%) hue-rotate(315deg) brightness(103%) contrast(99%)',
                    text: 'Administrator',
                    click: ()=> {
                        nav('/admin')

                    }
                })

                return prev
            })
        }
    }, [])
    function handleHide() {
        setShowOption(false);
    }

    function handleShow() {
        setShowOption(true);
    }

    function handleClick(btnId) {
        console.log('set, ', btnId);
        setActiveBtn(btnId);
    }

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.dFlex)} onClick={(e) => handleClick(-2)}>
                {/* <Button to="/"><img src="" alt="logo"></img></Button> */}
                <Button disablehover={'true'} to="/">
                    <h1>MUSICPRO</h1>
                </Button>
            </div>
            <Search />

            <div>
                {btns.map((btn, index) => (
                    <span
                        key={index}
                        onClick={(e) => handleClick(index)}
                        className={clsx({ [styles.btnWrapper]: index == activeBtn })}
                    >
                        <Button to={btn.to} largest="true">
                            {btn.title}
                        </Button>
                    </span>
                ))}

                {user ||'' ? (
                    <Tippy
                        visible={true}
                        interactive={'true'}
                        onClickOutside={handleHide}
                        render={(attrs) =>
                            showOption && (
                                <div className={clsx(styles.menuWrapper, 'box')} tabIndex="-1" {...attrs}>
                                    <Popper left="true">
                                        
                                        <Menu data={data} largest="true" />
                                        {(user == 'Admin')&&<>
                                        <MenuItem value={
                                            {
                                                icon: '',
                                                text: 'MANAGEMENT',
                                                to: '/admin',
                                                click: ()=> {
                                                    nav('/admin')
                                                }
                                        }}/>
                                        
                                        </>}
                                    </Popper>
                                </div>
                            )
                        }
                    >
                        <span>
                            <Button onMouseEnter={handleShow} largest={'true'}>
                                {user.name}
                                <span className={clsx(styles.iconWrapper)}>
                                    <img src={Profile} className={clsx(styles.userIcon)}></img>
                                </span>
                            </Button>
                        </span>
                    </Tippy>
                ) : (
                    <Button disablehover to="/login" largest={'true'}>
                        {user?user.name: 'Login'}
                        <span className={clsx(styles.iconWrapper)}>
                            <img src={Profile} className={clsx(styles.userIcon)}></img>
                        </span>
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Heading;
