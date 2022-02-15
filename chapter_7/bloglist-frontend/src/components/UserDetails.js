import React from "react"
import TableView from "./TableView"
import { useParams } from "react-router-dom"

const UserDetails = ({ userList }) => {
    const id = useParams().id
    const user = userList.find(n => n.id === id)

    if (user === undefined) {
        return (
            <div className="App"></div>
        )
    }

    return (
        <div className="App">
            <h2 className="author">{user.name}</h2>
            <h3>Added blogs:</h3>
            <TableView arr={user.blogs} />
        </div>
    )
}
export default UserDetails