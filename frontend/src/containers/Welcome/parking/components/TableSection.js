import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Form, Input, Button, DatePicker, Space, Popconfirm } from 'antd';
import { useStoreState, useStoreActions } from "easy-peasy";
import { useSelector, useDispatch } from 'react-redux'
import styled from "@xstyled/styled-components";
import moment from 'moment';
import * as actions from "../../../../redux/actions/index"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

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


export const TableSection = ({ modalStore }) => {

    const dispatch = useDispatch();
    const [idMarker, setIdMarker] = useState(0);

    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (parkingInfor) => {

        form.setFieldsValue({ name: parkingInfor.name });
        form.setFieldsValue({ lat: parkingInfor.lat });
        form.setFieldsValue({ lng: parkingInfor.lng });
        setIdMarker(parkingInfor.id);
        form.setFieldsValue({ cost: parkingInfor.cost });

        setIsModalVisible(true);
        console.log(parkingInfor)
    };

    const onDelete = (markerInfo) => {

        dispatch(actions.markerDeleteAC(markerInfo.id))
        console.log("Delete marker with id")
        console.log(markerInfo.id)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        const parkinglotIfo = {
            id: idMarker,
            name: values.name,
            lat: values.lat,
            lng: values.lng,
            cost: values.cost
        };

        dispatch(actions.markerEditDataAC(parkinglotIfo))
        setIsModalVisible(false);
        console.log('Values of the form to edit are: ', parkinglotIfo);
    };

    const columns = [
        {
            title: 'Parking lot',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'latitude ',
            dataIndex: 'lat',
            key: 'lat',
        },
        {
            title: 'longitude ',
            dataIndex: 'lng',
            key: 'lng',
        },
        {
            title: 'Cost per hour ',
            dataIndex: 'cost',
            render: (text, record) => (
                <div>
                    {text} €
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'id',
            dataIndex: 'id',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => showModal(record)}><EditOutlined /></a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record)}>
                        <a ><DeleteOutlined /></a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <StyledTable
                columns={columns}
                dataSource={modalStore.markersData}
                pagination={{ pageSize: 4 }}
            />
            <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} footer={null}>
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
                        <Input />
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