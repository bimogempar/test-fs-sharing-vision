import { Col, Row, Typography, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import TablePosts from '../components/TablePosts';
import { ColumnTablePostData } from '../settings/ColumnTablePostData';
import { OptionTab } from '../settings/OptionTab';
const { Title } = Typography;

const Root = () => {
    const [filter, setFilter] = useState('');
    const [data, setData] = useState([]);

    const fetchTable = () => {
        console.log('fetch again')
        setData([
            {
                title: 'title 1',
                category: 'category 1',
            },
            {
                title: 'title 2',
                category: 'category 2',
            }
        ])
    }

    useEffect(() => {
        fetchTable();
    }, [filter])

    console.log(data);

    return (
        <Row
            style={{ padding: '25px' }}
            justify="center"
        >
            <Col
                span={24}
                lg={16}
                style={{ padding: '15px' }}
            >
                <Title level={2}>All Posts</Title>
                <Row>
                    <Tabs
                        defaultActiveKey="1"
                        type="card"
                        size={'small'}
                        items={OptionTab}
                        onChange={(e) => setFilter(e)}
                    />
                </Row>
                <Row>
                    <Col
                        span={24}
                    >
                        <TablePosts
                            columns={ColumnTablePostData}
                            data={data}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Root;