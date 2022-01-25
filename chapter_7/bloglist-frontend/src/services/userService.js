import axios from "axios"
const baseUrl = "/api/users"

// let token

// let auth

// const setToken = (newToken) => {
//     auth = {
//         headers: {
//             Authorization: `Bearer ${newToken}`
//         }
//     }
// }

// const removeToken = () => {
//     token = null
// }

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

// export default { getAll, setToken, removeToken, token }
export default { getAll }