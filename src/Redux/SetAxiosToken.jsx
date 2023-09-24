import axios from "axios"

export let SetAxiosToken = async (token) => {
    if (token) {
        axios.defaults.headers['auth'] = token
    }
    else {
        delete axios.defaults.headers['auth']
    }
}

export default SetAxiosToken;