import { Col, Row, Typography, Tabs, message, Button } from 'antd';
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

    const handleDeleteArticle = (e) => {
        messageApi.open({
            key: 'create',
            type: 'loading',
            content: 'Loading...',
        })
        axios.patch(`${process.env.REACT_APP_BE_URL}article/${e.id}`, { ...e, status: 'trash' })
            .then(res => {
                setTimeout(() => {
                    setData(prev => prev.filter(x => x.id !== e.id))
                    messageApi.open({
                        key: 'create',
                        type: 'success',
                        content: 'Post deleted successfully',
                    })
                }, 1000);
            })
            .catch(err => {
                messageApi.open({
                    key: 'create',
                    type: 'error',
                    content: err.message,
                });
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
            <Row justify="space-between">
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    size={'small'}
                    items={OptionTab}
                    onChange={(e) => setFilter(e)}
                />
                <Button type='primary' onClick={() => navigate('/article/create')}>
                    Add New
                </Button>
            </Row>
            <Row>
                <Col
                    span={24}
                >
                    <TablePosts
                        loading={loadingTable}
                        columns={ColumnTablePostData({ navigate, filter, handleDelete: handleDeleteArticle })}
                        data={data}
                    />
                </Col>
            </Row>
        </>
    )
}

export default Root;