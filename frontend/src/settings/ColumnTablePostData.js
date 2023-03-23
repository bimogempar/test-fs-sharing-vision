import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Col, Popconfirm, Row, Tag } from "antd";

export const ColumnTablePostData = ({ navigate, filter, handleDelete }) => [
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
        ...(filter !== 'trash' && {
            title: 'Action',
            key: 'action',
            render: record => (
                <Row gutter={[24, 0]}>
                    <Col>
                        <EditTwoTone
                            onClick={() => navigate(`/article/${record.id}`, { state: record })}
                        />
                    </Col>
                    {
                        <Col>
                            <Popconfirm
                                title="Delete the post"
                                description="Are you sure to delete this post?"
                                onConfirm={() => handleDelete(record)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <DeleteTwoTone
                                    twoToneColor={'red'}
                                />
                            </Popconfirm>
                        </Col>
                    }
                </Row>
            )
        })
    },
]