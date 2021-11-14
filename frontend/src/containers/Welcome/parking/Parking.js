import React, { useState } from 'react';
import { PageHeader, Row, Card, Col, Form, Input, Button, Modal, InputNumber, Layout} from 'antd';
import 'antd/dist/antd.css';
import styled from "@xstyled/styled-components";
import { TableSection } from './components/TableSection'
import { SiderMenu } from "..//../Menu/Sider";
import { useSelector, useDispatch } from 'react-redux'
import { PlusOutlined } from '@ant-design/icons';
import * as actions from "../../../redux/actions/index"

const { Header, Content, Footer, Sider } = Layout;

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


export const Parking = () => {

    const [form] = Form.useForm();

    const modalStore = useSelector((state) => state.modalMarker);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();

    const showModal = () => {

        setIsModalVisible(true);
        };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        const markerInfo = {
            //id: idMarker,
            name: values.name,
            lat: values.lat,
            lng: values.lng,
            cost: values.cost
        };

        dispatch(actions.markerAddAC(markerInfo))
        setIsModalVisible(false);
        console.log('Values of the form to save are: ', markerInfo);
    };

    return (
        <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <SiderMenu />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200, minHeight: "100vh" }}>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div style={{textAlign: "center", fontSize: "30px", textTransform: "uppercase"}}>
        <h1 style={{color: "#1890ff"}}>Easy Park</h1>
        </div>
          </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
          <StyledCard>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <h1 style={{ justifyContent: 'center', alignItems: 'center', size: 50, textAlign: "right" }}>
                                        Parking lot
                                </h1>
                                </Col>
                                <Col span={12}>
                                    <h1 style={{ justifyContent: 'center', alignItems: 'center', size: 50, textAlign: "right" }}>
                                        <a><span onClick={showModal}><PlusOutlined /></span></a>
                                    </h1>
                                </Col>
                            </Row>
                            <h3>Here you can add, update or delete a Parking lot </h3>
                            <TableSection
                                modalStore={modalStore}
                            />
                        </StyledCard>
                        <Modal title="Add Parking Lot" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                            <Form {...formItemLayout} form={form} name="basic" onFinish={onFinish}>
                                <Form.Item
                                    name="name"
                                    label="Parking lot"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Parking lot is required!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="lat"
                                    label="Latitude"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'latitude is required!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="lng"
                                    label="Longitude"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'longitude is required!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="cost"
                                    label="Cost per hour"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Cost is required!',
                                        },
                                    ]}
                                >
                                    <InputNumber />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ position: "absolute", right: -155 }}>
                                        Update
                       </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
          </div>
        </Content>
        <Footer style={{marginTop: '22px', textAlign: 'center',backgroundColor: "white" }}>Copyrights ©2021 - All rights reserved</Footer>
      </Layout>
    </Layout>
    );
};


const StyledPageHeader = styled(PageHeader)`
    width: 100%;
`;

const StyledCard = styled(Card)`
    width: 96%;
`;
