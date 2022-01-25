import React from "react"

const renderTableData = ( userList ) => {
    return userList.map((user) => {
        const { id, name } = user
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{user.blogs.length}</td>
            </tr>
        )
    })
}

const renderTableHeader = () => {
    return (
        <>
            <th >{"name"}</th >
            <th >{"blogs added"}</th >
        </>
    )
}

const Users = ({ userList }) => {
    console.log("🚀 ~ file: Users.js ~ line 18 ~ Users ~ userList", userList)
    return (
        <div className="App-body">
            <h1 id='title'>Users</h1>
            <table id='users'>
                <tbody>
                    <tr>{renderTableHeader()}</tr>
                    {renderTableData(userList)}
                </tbody>
            </table>
        </div>
    )
}

export default Users