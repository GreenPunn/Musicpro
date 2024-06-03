import PropTypes from 'prop-types';
import {useState, useEffect} from 'react'

function useDebounce(value, timeOut) {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(()=>{ 
        const handler = setTimeout(()=> setDebounceValue(value), timeOut)

        return ()=> {clearTimeout(handler)}
    }, [value])

    return debounceValue
}

useDebounce.propTypes = {
    timeOut: PropTypes.number,
}

export default useDebounce