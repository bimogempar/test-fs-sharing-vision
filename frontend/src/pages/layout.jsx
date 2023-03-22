import { Col, Row, Grid } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom';
const { useBreakpoint } = Grid;

const Layout = () => {
    const screens = useBreakpoint();
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
                <Outlet />
            </Col>
        </Row>
    )
}

export default Layout