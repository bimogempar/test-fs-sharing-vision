import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Col, Row, Tag } from "antd";

export const ColumnTablePostData = ({ navigate }) => [
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
        title: 'Status',
        key: 'status',
        render: record => {
            const { status } = record;
            let color
            switch (status) {
                case 'publish':
                    color = 'green';
                    break;
                case 'draft':
                    color = 'gold';
                    break;
                case 'trash':
                    color = 'red';
                    break;
                default:
                    break;
            }
            return (
                <Tag color={color}>
                    {status.toUpperCase()}
                </Tag>
            )
        }
    },
    {
        title: 'Action',
        key: 'action',
        render: record => (
            <Row gutter={[24, 0]}>
                <Col>
                    <EditTwoTone
                        onClick={() => navigate(`/article/${record.id}`, { state: record })}
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