
import instant from ".."
export const getUserPlaylist = async (username)=> {
    return await instant(`/Playlist/${username}`)
}


export const getSongByPlaylist = async (id)=> {
    return await instant(`Playlist/songof/${id}`)
}
