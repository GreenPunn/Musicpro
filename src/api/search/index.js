
import instant from ".."
export const getSearchResult = async (searchVAlue)=> {
    return await instant(`/Search/${searchVAlue}`)
}

