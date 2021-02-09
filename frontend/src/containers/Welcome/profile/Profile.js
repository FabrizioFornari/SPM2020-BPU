import React, { useState } from 'react';
import { Card, Avatar, Tag, Tabs, Row, Col, Radio, Form, Button, Input, Modal } from 'antd';
import { useStoreState, useStoreActions } from "easy-peasy";
import 'antd/dist/antd.css';
import styled, { justifyContent } from "@xstyled/styled-components";
import { UserOutlined, DashOutlined } from '@ant-design/icons';
import { Sider } from "..//../Menu/Sider";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
export const Profile = () => {

    const userData = useStoreState((state) => state.users.userData)
    const [isVisible, setIsVisible] = useState(false);
    const [disabled, setDisabled] = useState(userData.disabled == "No" ? false : true);
    const editUser = useStoreActions((actions) => actions.users.editUser);
    const changePassword = useStoreActions((actions) => actions.users.changePassword);


    const { TabPane } = Tabs;
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        const userData = {
            name: values.name,
            lastName: values.surname,
            email: values.email,
            disabled: disabled
        };

        editUser(userData);
        setIsVisible(false);
        console.log('Values of the form to save are: ', userData);
    };


    const onChangePassword = (values) => {

        const userData = {
            email: values.email,
            password: values.currentPassword,
            newPassword: values.newPassword,
        };

        changePassword(userData);

        console.log('Values of the form to update are: ', userData);
    };

    const handleCancel = () => {
        setIsVisible(false)
    };

    const showModal = () => {

        setIsVisible(true)
    };

    const [fields, setFields] = useState([
        {
            name: ['name'],
            value: userData.name,
        },
        {
            name: ['surname'],
            value: userData.lastName,
        },
        {
            name: ['email'],
            value: userData.email,
        },
    ]);

    const [fieldsChangePassword, setFieldsChangePassword] = useState([
        {
            name: ['name'],
            value: userData.name,
        },
        {
            name: ['surname'],
            value: userData.lastName,
        },
        {
            name: ['email'],
            value: userData.email,
        },
    ]);

    return (

        <div className="hero">

            <div style={{ width: "100%", display: "table" }}>
                <div style={{ display: "table-row" }}>
                    <div style={{ width: 300, display: "table-cell" }}> <Sider style={{ height: 710, opacity: 40 }} /> </div>
                    <div style={{ display: "table-cell" }}>
                        <StyledCard>
                            <a><span onClick={showModal}><DashOutlined style={{ marginLeft: "98%", fontSize: '26px', }} /></span></a>
                            <Avatar
                                style={{
                                    backgroundColor: '#596fff',
                                    display: "block",
                                    margin: "auto"

                                }}
                                icon={<UserOutlined />}
                                size={100}
                            />
                            <h1 style={{ textAlign: "center" }}>{userData.name} {userData.lastName}</h1>

                            <div style={{
                                whiteSpace: "nowrap",
                                overflowX: "auto",
                                margin: "auto",
                                textAlign: "center",
                                marginTop: 20
                            }}>
                                <>
                                    {userData.rolesString.map(role => {
                                        let color;
                                        if (role === 'Driver') {
                                            color = '#0000ff';
                                        }
                                        if (role === 'Municipality') {
                                            color = '#339966';
                                        }
                                        if (role === 'Policeman') {
                                            color = 'red';
                                        }
                                        if (role === '"Tow Truck"') {
                                            color = 'geekblue';
                                        }
                                        return (
                                            <Tag color={color} key={role}>
                                                {role.toUpperCase()}
                                            </Tag>
                                        );
                                    })}
                                </>
                            </div>
                            <Tabs defaultActiveKey="1" style={{ margin: "auto", marginTop: 20, width: "55%" }}>
                                <TabPane tab="About" key="1">
                                    <Row>
                                        <Col span={12}><b>First Name</b></Col>
                                        <Col span={12}>{userData.name}</Col>
                                    </Row>
                                    <Row style={{ marginTop: 20 }}>
                                        <Col span={12}><b>Last Name</b></Col>
                                        <Col span={12}>{userData.lastName}</Col>
                                    </Row>
                                    <Row style={{ marginTop: 20 }}>
                                        <Col span={12}><b>Email</b></Col>
                                        <Col span={12}>{userData.email}</Col>
                                    </Row>
                                    <Row style={{ marginTop: 20 }}>
                                        <Col span={12}><b>Disabled</b></Col>
                                        <Col span={12}>{userData.disabled}</Col>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Change password" key="2">
                                    <Form  {...formItemLayout} fields={fieldsChangePassword} onFinish={onChangePassword}>
                                        <Form.Item
                                            name="email"
                                            label="Email"
                                            rules={[
                                                {
                                                    type: 'email',
                                                },
                                            ]}
                                        >
                                            <Input disabled />
                                        </Form.Item>

                                        <Form.Item
                                            name="currentPassword"
                                            label="Current Password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your current password!',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input.Password />
                                        </Form.Item>

                                        <Form.Item
                                            name="newPassword"
                                            label="New Password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input.Password />
                                        </Form.Item>

                                        <Form.Item
                                            name="confirmPassword"
                                            label="Confirm new Password"
                                            dependencies={['password']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('newPassword') === value) {
                                                            return Promise.resolve();
                                                        }

                                                        return Promise.reject('The two passwords that you entered do not match!');
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" style={{ float: "right", marginRight: -160 }}>
                                                Update
                                    </Button>
                                        </Form.Item>
                                    </Form>
                                </TabPane>
                            </Tabs>

                        </StyledCard>
                        <Modal title="Account Information" visible={isVisible} onCancel={handleCancel} footer={null}>
                            <Form  {...formItemLayout} fields={fields} onFinish={onFinish}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Username is required!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="surname"
                                    label="Surname"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        {
                                            type: 'email',
                                        },
                                    ]}
                                >
                                    <Input disabled />
                                </Form.Item>
                                <Form.Item name="radioGroup" label="Disabled " value={disabled}>
                                    <Radio.Group value={disabled} defaultValue={disabled} onChange={event => setDisabled(event.target.value)}>
                                        <Radio value={true}>Yes</Radio>
                                        <Radio value={false}>No</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ float: "right", marginRight: -160 }}>
                                        Update
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </div>

        </div>

    );
};


const StyledCard = styled(Card)`
    width: 96%;
    margin-top: 140px;
`;
