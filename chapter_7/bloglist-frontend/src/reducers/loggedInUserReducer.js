const loggedInUserReducer = (state = null, action) => {
    if (action.type === "LOGIN") {
        state = action.user
    }
    if (action.type === "LOGOUT") {
        state = null
    }
    return state
}

export const login = user => {
    return {
        type: "LOGIN",
        user: user,
    }
}

export const logout = () => {
    return {
        type: "LOGOUT",
        user: null,
    }
}

export default loggedInUserReducer