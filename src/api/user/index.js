import instant from "..";

export const postUser = (body)=> {
    return instant.post('/User', body);
}

export const getListUsers = async ()=> {
  const token = localStorage.getItem('token');
    return await instant.get(`User`,  {
        headers: {
          Authorization: `Bearer ${token}`
        }})
}


export const getUser = async (username, pass)=> {
    const token = localStorage.getItem('token');
    return await instant.get(`User/${username}?password=${pass}`,  {
        headers: {
          Authorization: `Bearer ${token}`
        }})
}

export const delUser = async (username)=> {
  const token = localStorage.getItem('token');
    return await instant.delete(`User/${username}`,  {
        headers: {
          Authorization: `Bearer ${token}`
        }})
}
