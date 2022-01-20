const notificationReducer = (state = "", action) => {
    if (action.type === "NEW_NOTIFICATION") {
        state = action.content
    }
    if (action.type === "EMPTY_NOTIFICATION") {
        state = ""
    }
    return state
}
export default notificationReducer