import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link } from 'react-router-dom';
//import { useHistory } from "react-router-dom";
import styled from "@xstyled/styled-components";
import "antd/dist/antd.css";

import { Form, Input, Row, Col, Button, PageHeader,Radio } from 'antd';

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
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


export const SignUp = () => {


    const saveUser = useStoreActions((actions) => actions.users.saveUser);

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);


    const [form] = Form.useForm();

    const onFinish = (values) => {

        console.log('Received values of form: ', values);

        const userData = {
            name: name,
            lastName: lastName,
            email: email,
            password: password,
            disabled: disabled
        };
        saveUser(userData);
        form.resetFields();
        //window.location.href = '/login'; 
        console.log('Values of the form to save are: ', userData);
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
                            <StyledP>Let's get you set up</StyledP>
                            <p>It should only take a cople of
                            minutes to create your account
                            </p>
                        </div>
                    </Col>
                    <Col span={12} style={{ backgroundColor: "white", borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}>

                        <div span={12} style={{ marginTop: "60px", alignContent: "center" }}>

                            <SubTitle>Sign Up</SubTitle>
                            <Form
                                {...formItemLayout}
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                scrollToFirstError
                            >

                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Name!',
                                        },
                                    ]}
                                >
                                    <Input onChange={event => setName(event.target.value)} />
                                </Form.Item>

                                <Form.Item
                                    name="lastName"
                                    label="Surname"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Surname!',
                                        },
                                    ]}
                                >
                                    <Input onChange={event => setLastName(event.target.value)} />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="E-mail"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}
                                >
                                    <Input onChange={event => setEmail(event.target.value)} />
                                </Form.Item>

                                <Form.Item name="radio-group" label="Disabled " value={disabled}>
                                    <Radio.Group value={disabled} defaultValue={disabled} onChange={event => setDisabled(event.target.value)}>
                                        <Radio value={true}>Yes</Radio>
                                        <Radio value={false}>No</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password onChange={event => setPassword(event.target.value)} />
                                </Form.Item>

                                <Form.Item
                                    name="confirm"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject('The two passwords that you entered do not match!');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    <StyledButton type="primary" htmlType="submit">
                                        Register
                                     </StyledButton>
                                    <br></br>Or <Link to="/login">login now!</Link>
                                </Form.Item>
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
    width: 150px;
`;


const StyledP = styled.p`
    width: 314px;
    height: 27px;
    margin: 42px 81px 45px 0;
    font-family: Britannic;
    font-size: 25px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 3px;
    text-align: center;
    color: #ffffff;
    margin-top: 100px

`;