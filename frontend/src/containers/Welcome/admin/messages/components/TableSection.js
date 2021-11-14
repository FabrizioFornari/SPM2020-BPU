import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Form, Input, Button, DatePicker, InputNumber, Popconfirm, Row, Col } from 'antd';
import { useStoreState, useStoreActions } from "easy-peasy";
import { useSelector, useDispatch } from 'react-redux'
import styled from "@xstyled/styled-components";
import moment from 'moment';
import * as actions from "../../../../../redux/actions/index"
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';

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


export const TableSection = ({ reservationsStore }) => {

    const fetchAllParkingViolationsData = useStoreActions((actions) => actions.reservations.fetchAllParkingViolationsData);
    const deleteParkingViolation = useStoreActions((actions) => actions.reservations.deleteParkingViolation);
    const updateParkingViolation = useStoreActions((actions) => actions.reservations.updateParkingViolation);
    const userData = useStoreState((state) => state.users.userData)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchAllParkingViolationsData();
    }, []);


    const showModal = (parkingviolationData) => {
        console.log(parkingviolationData)
        form.setFieldsValue({ name: parkingviolationData.fullName });
        form.setFieldsValue({ date: moment.utc(parkingviolationData.date) });
        form.setFieldsValue({ cost: parkingviolationData.fine });
        form.setFieldsValue({ parkingLot: parkingviolationData.parkingLot });
        form.setFieldsValue({ description: parkingviolationData.description });
        form.setFieldsValue({ id: parkingviolationData.id });

        setIsModalVisible(true);
    }

    const onDelete = (ParkingViolationInfo) => {
        deleteParkingViolation(ParkingViolationInfo.id)
    }

    const handleCancel = () =>{
        setIsModalVisible(false);
    }

    const onFinish = (formData) =>{
        updateParkingViolation(formData)
        setIsModalVisible(false);
    }


    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text, record) => (
                <div>
                    {moment(text).format('MMMM Do YYYY, h:mm a')}
                </div>
            ),
        },
        {
            title: 'Parking Lot',
            dataIndex: 'parkingLot',
            key: 'parkingLot',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Cost',
            dataIndex: 'fine',
            render: (text, record) => (
                <div>
                    {text + " €"}
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'id',
            dataIndex: 'id',
            render: (text, record) => (
                <div>
                    <Row>
                        <Col span={12}><a onClick={() => showModal(record)}><EditOutlined /></a></Col>
                        <Col span={12}><Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record)}><a ><DeleteOutlined /></a></Popconfirm></Col>
                    </Row>
                </div>
            ),
        },
    ];

    return (
        <div>
            <StyledTable
                columns={columns}
                dataSource={reservationsStore.allParkingViolationsData}
                loading={reservationsStore.loading}
            />
            <Modal title={"PARKING VIOLATION"} visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form {...formItemLayout} form={form} name="basic" onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[
                            {
                                required: true,
                                message: 'Username is required!',
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker showTime disabled/>
                    </Form.Item>
                    <Form.Item
                        name="parkingLot"
                        label="Parking Lot"
                        rules={[
                            {
                                required: true,
                                message: 'Parking Lot is required!',
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Description is required!',
                            },
                        ]}
                    >
                        <Input.TextArea disabled />
                    </Form.Item>
                    <Form.Item
                        name="cost"
                        label="Cost(€)"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name="id"
                        label="ID"
                        style={{ display: 'none' }}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ position: "absolute", right: -155 }}>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    );
};

const StyledTable = styled(Table)`

`;