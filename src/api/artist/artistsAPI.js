import instant from "..";

export const getArtists = () => {
    return instant.get(`Artist`)
}

export const getMoreArtist = async () => {
    return await instant.get('Artist/more')
}

export const getArtistById = async (id) => {
    return await instant.get(`Artist/${id}`)
}