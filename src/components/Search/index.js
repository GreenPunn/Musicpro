import clsx from 'clsx';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '../Menu';
import Button from '../Button';
import Popper from '../Popper';
import { useState, useEffect } from 'react';
import styles from './Search.module.css';
import SearchIcon from '~/images/SearchIcon.svg';
import useDebounce from '~/layoout/components/hooks/useDebounce';
import { getSearchResult } from '~/api/search';


function Search() {
    const [showResult, setShowResult] = useState(false);
    const [searchResult, setSearchResult] = useState()
    const [searchValue, setSearchValue] = useState('');
    const debounceValue = useDebounce(searchValue, 500);
    function handleShow() {
        console.log('call');
        if (!showResult) {
            setShowResult(true);
        }
    }

    function handleHide() {
        setShowResult(false);
    }

    const handleChange = (e) => {
        const inputValue = e.target.value;
        console.log(inputValue)
        if (!inputValue.startsWith(' ')) {
          setSearchValue(inputValue);
        }
      };

    useEffect(() => {
        if (!debounceValue) {
          setSearchResult([]);
          return;
        }
        getSearchResult(debounceValue).then(res => {
            setSearchResult(res)})
        
      }, [debounceValue]);
    return (
        <Tippy
            visible={true}
            interactive={'true'}
            onClickOutside={handleHide}
            render={(attrs) =>
                searchResult&&(searchResult.songs||searchResult.albums||searchResult.artists) &&
                showResult && (
                    <div className={clsx(styles.menuWrapper, 'box')} tabIndex="-1" {...attrs}>
                        <Popper center="true">
                            <Menu multitask="true" data={searchResult} largest={'true'} />
                        </Popper>
                    </div>
                )
            }
        >
            <div className={clsx(styles.wrapper)}>
                <span className={clsx(styles.searchIconWrapper)}>
                    <Button>
                        <img src={SearchIcon} />
                    </Button>
                </span>
                <input
                    onChange={handleChange}
                    value={searchValue}
                    onFocus={handleShow}
                    placeholder="Search by artist, song and album"
                    className={clsx(styles.inputField)}
                />
            </div>
        </Tippy>
    );
}

export default Search;
