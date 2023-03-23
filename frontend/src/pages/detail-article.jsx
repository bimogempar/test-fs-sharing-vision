import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const { Title } = Typography;
const { TextArea } = Input;

const DetailArticle = () => {
    const location = useLocation();
    const [detailPost, setDetailPost] = useState('');

    const fetchDetail = () => {
        const idPost = location.pathname.split('/article/')[1];
        axios.get(`${process.env.REACT_APP_BE_URL}article/${idPost}`)
            .then(res => {
                const { data: { data } } = res;
                setDetailPost(data);
            })
    }

    useEffect(() => {
        if (location.state == null) {
            console.log('fetch detail bro');
            fetchDetail();
        } else {
            setDetailPost(location.state);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Title level={2}>Detail Article Post</Title>
            {
                detailPost !== "" &&
                <Form
                    onFinish={(e) => console.log(e)}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="vertical"
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label="Title" name="title" initialValue={detailPost.title} rules={[{ required: true, min: 20 }]}>
                        <Input
                            defaultValue={detailPost.title}
                        />
                    </Form.Item>
                    <Form.Item label="Content" name="content" initialValue={detailPost.content} rules={[{ required: true, min: 20 }]}>
                        <TextArea
                            defaultValue={detailPost.content}
                            rows={4}
                        />
                    </Form.Item>
                    <Form.Item label="Category" name="category" initialValue={detailPost.category} rules={[{ required: true, min: 3 }]}>
                        <Input
                            defaultValue={detailPost.category}
                        />
                    </Form.Item>
                    <Row gutter={[12, 0]}>
                        <Col>
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Col>
                        <Col>
                            <Button type="default" htmlType="submit">
                                Draft
                            </Button>
                        </Col>
                    </Row>
                </Form>
            }
        </>
    )
}

export default DetailArticle;