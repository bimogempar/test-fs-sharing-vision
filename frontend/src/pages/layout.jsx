import React from 'react';
import { Col, Row, Grid, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
const { useBreakpoint } = Grid;

const Layout = () => {
    const screens = useBreakpoint();
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <Row
            style={{ padding: screens.lg ? '15px' : 0 }}
            justify="center"
        >
            <Col
                span={24}
                lg={20}
                xl={16}
                style={{ padding: '15px' }}
            >
                {location.pathname !== '/' && <Button style={{ marginBottom: '24px' }} type='default' shape='circle' onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />} />}
                <Outlet />
            </Col>
        </Row>
    )
}

export default Layout