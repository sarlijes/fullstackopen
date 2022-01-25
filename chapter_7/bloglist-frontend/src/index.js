
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import { createStore, combineReducers } from "redux"

import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import loggedInUserReducer from "./reducers/loggedInUserReducer"
import userReducer from "./reducers/userReducer"

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    loggedInUser: loggedInUserReducer,
    userList: userReducer
})

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root"))