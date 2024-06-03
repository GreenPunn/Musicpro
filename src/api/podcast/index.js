import instant from ".."
export const getPodcast = async ()=> {
    return instant.get(`Song/podcast`)
}