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

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    const response = await request
    return response.data
}

const addComment = async (id, newObject) => {
    console.log("🚀 ~ file: blogService.js ~ line 37 ~ addComment ~ newObject", newObject)
    const request = axios.post(`${baseUrl}/${id}/comments`, newObject, auth)
    const response = await request
    return response.data
}

const deleteBlog = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`, auth)
    const response = await request
    return response.data
}

export default { getAll, create, update, setToken, removeToken, deleteBlog, token, addComment }