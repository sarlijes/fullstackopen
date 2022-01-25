import axios from "axios"
const baseUrl = "/api/blogs"

let token

let auth

const setToken = (newToken) => {
    auth = {
        headers: {
            Authorization: `Bearer ${newToken}`
        }
    }
}

const removeToken = () => {
    token = null
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject, auth)
    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteBlog = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`, auth)
    return request.then(response => response.data)
}

export default { getAll, create, update, setToken, removeToken, deleteBlog, token }