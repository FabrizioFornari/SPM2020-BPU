import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Checkbox, Button, Row, Col, PageHeader } from "antd"
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "@xstyled/styled-components";
import "antd/dist/antd.css";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


export const LogIn = () => {

    const [form] = Form.useForm();
    const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

    useEffect(() => {
        forceUpdate({});
    }, []);


    const usersStore = useStoreState((state) => state.users);

    const { checkUser } = useStoreActions(actions => ({
        checkUser: actions.users.checkUser
    }));


    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        const userData = {
            email: values.username,
            password: values.password,
        };

        await checkUser(userData)

        console.log("userData", userData)
        console.log("usersStore.userData: ", usersStore.userData)

    };


    return (
        <div>
            <PageHeader
                style={{
                    backgroundColor: "#CCD7E4",
                    marginBottom: 20
                }}
                className="site-page-header"
                title="Easy Park"
            />
            <div className="hero">
                <Row gutter={24}
                    style={{
                        width: 791, height: 528, backgroundColor: '#14a7ac', border: 0,
                        opacity: '0.82', borderRadius: '30px', textAlign: "center", margin: "auto"

                    }}
                >
                    <Col span={12}>
                        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                        </div>
                    </Col>
                    <Col span={12} style={{ backgroundColor: "white", borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}>

                        <div span={12} style={{ marginTop: "60px", alignContent: "center" }}>

                            <SubTitle>Log in</SubTitle>
                            <Form form={form} name="normal_login" className="login-form" onFinish={onFinish}>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item shouldUpdate={true}>
                                    {() => (
                                        <StyledButton
                                            type="primary"
                                            htmlType="submit"
                                            disabled={
                                                !form.isFieldsTouched(true) ||
                                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                            }
                                        >
                                            Log in
                                        </StyledButton>
                                    )}
                                </Form.Item>
                                Or <Link to="/signup">register now!!</Link>
                            </Form>

                        </div>
                    </Col>
                </Row>
            </div>
        </div>

    );
};

const SubTitle = styled.div`
    width: 217px;
    height: 31px;
    margin: 0 108px 42px 17px;
    font-family: BerlinSansFBDemi;
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    text-align: center;
    color: #14a7ac;

`;


const StyledButton = styled(Button)`
    border-radius: 15px;
    background-image: linear-gradient(to top, #14a7ac, #14a7ac);
    width: 70%;
`;
