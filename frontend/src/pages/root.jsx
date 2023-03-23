import { Col, Row, Typography, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react';
import TablePosts from '../components/TablePosts';
import { ColumnTablePostData } from '../settings/ColumnTablePostData';
import { OptionTab } from '../settings/OptionTab';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const Root = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loadingTable, setLoadingTable] = useState(false);
    const [filter, setFilter] = useState('publish');
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchTable = () => {
        setLoadingTable(true);
        axios.get(`${process.env.REACT_APP_BE_URL}article`)
            .then(res => {
                const { data: { data: newData } } = res
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
                setLoadingTable(false);
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
        <>
            <Title level={2}>All Posts</Title>
            {contextHolder}
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
                        loading={loadingTable}
                        columns={ColumnTablePostData({ navigate })}
                        data={data}
                    />
                </Col>
            </Row>
        </>
    )
}

export default Root;