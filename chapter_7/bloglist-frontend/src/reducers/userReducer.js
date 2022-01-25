const userReducer = (state = [], action) => {
    // if (action.type === "ADD_BLOG") {
    //     state.push(action.content)
    // }
    if (action.type === "ADD_ALL_USERS") {
        state = action.content
    }
    return state
}

export const addAllUsers = userList => {
    return {
        type: "ADD_ALL_USERS",
        content: userList,
    }
}

export default userReducer