import { createContext, useState } from 'react';

const DataSetContext = createContext();
function DataSetProvider({ children }) {
    const [dataSet, setDataSet] = useState({id: "dasd"});
    const [emptyObjectType, setEmptyObjectType] = useState();
    const [song, setSong] = useState();
    const [listSong, setListSong] = useState([]);
    const [showDashboard, setShowDashBoard] = useState(false);
    return <DataSetContext.Provider value={{dtSet: [dataSet, setDataSet], objData: [emptyObjectType, setEmptyObjectType], song: {song, setSong}, showDashboard: {showDashboard, setShowDashBoard}, listSong: {listSong, setListSong}}}>{children}</DataSetContext.Provider>;
}

export { DataSetProvider, DataSetContext };
