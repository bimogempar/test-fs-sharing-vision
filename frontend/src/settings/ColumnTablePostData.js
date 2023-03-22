import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Col, Row } from "antd";

export const ColumnTablePostData = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Action',
        key: 'action',
        render: record => (
            <Row gutter={[24, 0]}>
                <Col>
                    <EditTwoTone
                        onClick={() => console.log(record)}
                    />
                </Col>
                <Col>
                    <DeleteTwoTone
                        twoToneColor={'red'}
                        onClick={() => console.log(record)}
                    />
                </Col>
            </Row>
        )
    },
]