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
            scroll={{
                x: 100
            }}
        />
    )
}

export default TablePosts