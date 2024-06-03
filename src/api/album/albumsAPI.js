import instant from "..";

export const getAlbums = () => {
    return instant.get(`Album`)
}

export const getMoreAlbums = async () => {
    return await instant.get('Album/more')
}

export const getAlbumById =async (id) => {
    return await instant.get(`Album/${id}`)
}