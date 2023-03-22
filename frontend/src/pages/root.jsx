import { Col, Row, Typography, Tabs, Grid, message } from 'antd';
import React, { useEffect, useState } from 'react';
import TablePosts from '../components/TablePosts';
import { ColumnTablePostData } from '../settings/ColumnTablePostData';
import { OptionTab } from '../settings/OptionTab';
import axios from 'axios';
const { Title } = Typography;
const { useBreakpoint } = Grid;

const Root = () => {
    const screens = useBreakpoint();
    const [messageApi, contextHolder] = message.useMessage();
    const [filter, setFilter] = useState('publish');
    const [data, setData] = useState([]);

    const fetchTable = () => {
        axios.get(`${process.env.REACT_APP_BE_URL}article`)
            .then(res => {
                const { data: { data: newData, message } } = res
                if (newData.length > 0) {
                    switch (filter) {
                        case 'publish':
                            setData(newData.filter(x => x.status === 'publish'))
                            break;
                        case 'draft':
                            setData(newData.filter(x => x.status === 'draft'))
                            break;
                        case 'trash':
                            setData(newData.filter(x => x.status === 'trash'))
                            break;
                        default:
                            break;
                    };
                } else {
                    setData([]);
                }
                messageApi.open({
                    type: 'success',
                    content: message,
                })
            }).catch(err => {
                const { err: { message } } = err;
                messageApi.open({
                    type: 'error',
                    content: message,
                })
            })
    }

    useEffect(() => {
        fetchTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    return (
        <Row
            style={{ padding: screens.lg ? '15px' : 0 }}
            justify="center"
        >
            {contextHolder}
            <Col
                span={24}
                lg={20}
                xl={16}
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