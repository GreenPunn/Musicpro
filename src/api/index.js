import axios from "axios";
const instant = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    timeout: 300000
})

instant.interceptors.response.use(
    res => {
        return res.data
    }, 
    err => {
        if(err.response.data == 'username is existed!') {
            return 'userExisted'
        }if(err.response.data == 'user not found'){
            return 'invalidAuthenInfo'
        }
        return err.response.data
    })
export default instant