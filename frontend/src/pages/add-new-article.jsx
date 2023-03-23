import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;
const { Title } = Typography;

const AddNewArticlePost = () => {
    const [btnStatus, setBtnStatus] = useState('publish')
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const handleNewArticle = (e) => {
        messageApi.open({
            key: 'create',
            type: 'loading',
            content: 'Loading...',
        })
        axios.post(`${process.env.REACT_APP_BE_URL}article`, { ...e, status: btnStatus })
            .then(res => {
                const { data: { message } } = res;
                setTimeout(() => {
                    messageApi.open({
                        key: 'create',
                        type: 'success',
                        content: message,
                    })
                    setTimeout(() => {
                        navigate('/')
                    }, 1000);
                }, 3000);
            })
            .catch(err => {
                messageApi.open({
                    key: 'create',
                    type: 'error',
                    content: err.message,
                });
            })
    }

    return (
        <>
            {contextHolder}
            <Title level={2}>Add New Article Post</Title>
            <Form
                onFinish={(e) => handleNewArticle(e)}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="vertical"
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="Title" name="title" rules={[{ required: true, min: 20 }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Content" name="content" rules={[{ required: true, min: 20 }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Category" name="category" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Row gutter={[12, 0]}>
                    <Col>
                        <Button type="primary" htmlType="submit" onClick={() => setBtnStatus('publish')}>
                            Create
                        </Button>
                    </Col>
                    <Col>
                        <Button type="default" htmlType="submit" onClick={() => setBtnStatus('draft')}>
                            Draft
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default AddNewArticlePost