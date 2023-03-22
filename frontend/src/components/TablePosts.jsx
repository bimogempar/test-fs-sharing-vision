import { Table } from 'antd'
import React from 'react'

const TablePosts = ({
    loading,
    data,
    columns,
}) => {
    return (
        <Table
            loading={loading}
            columns={columns}
            dataSource={data}
        />
    )
}

export default TablePosts