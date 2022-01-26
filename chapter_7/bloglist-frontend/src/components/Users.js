import React from "react"
import { Link } from "react-router-dom"

const renderTableData = ( userList ) => {
    return userList.map((user) => {
        const { id, name } = user
        return (
            <tr key={id}>
                <td><Link to={`/users/${id}`}>{name}</Link></td>
                <td>{user.blogs.length}</td>
            </tr>
        )
    })}

const renderTableHeader = () => {
    return (
        <tr>
            <th >{"name"}</th >
            <th >{"blogs added"}</th >
        </tr>
    )
}

const Users = ({ userList }) => {
    return (
        <div className="App">
            <div className="App-body">
                <h1 id='title'>Users</h1>
                <table id='users'>
                    <tbody>
                        {renderTableHeader()}
                        {renderTableData(userList)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users