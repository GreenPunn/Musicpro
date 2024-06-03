import instant from "..";
export const isUserLiked = async (username, songId)=> {
    return instant.get(`/Favorite?songId=${songId}&username=${username}`)
}