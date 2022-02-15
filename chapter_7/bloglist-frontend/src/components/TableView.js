import React from "react"

const renderTableData = ( arr ) => {
    return arr.map((item) => {
        if (item.content !== undefined) {
            return (
                <tr key={item.id}>
                    <td>{item.content}</td>
                </tr>
            )
        } else {
            return (
                <tr key={item.id}>
                    <td>{item.title}</td>
                </tr>
            )
        }
    })
}

const TableView = ({ arr }) => {
    return (
        <div className="App">
            <div className="App-body">
                <table id='users'>
                    <tbody>
                        {renderTableData(arr)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableView