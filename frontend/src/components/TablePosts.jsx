import { Table } from 'antd'
import React from 'react'

const TablePosts = ({
    data,
    columns,
}) => {
    return (
        <Table
            columns={columns}
            dataSource={data}
        />
    )
}

export default TablePosts