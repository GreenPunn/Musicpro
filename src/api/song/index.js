import instant from "..";

export const getTopSongs = () => {
    return instant.get(`Song`)
}

export const getSongsByAlbum = (id) => {
    return instant.get(`Song/byAlbum/${id}`)
}

export const getSongsByArtist = async (id) =>{
    return await instant.get(`Song/byartist/${id}`)
}

export const getSongById = async (id) => {
    return await instant.get(`Song/${id}`)
}