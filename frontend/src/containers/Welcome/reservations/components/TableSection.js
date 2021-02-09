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


export const TableSection = ({ reservationsStore }) => {

    const dispatch = useDispatch();
    const fetchResevations = useStoreActions((actions) => actions.reservations.fetchReservations);
    const editReservation = useStoreActions((actions) => actions.reservations.editReservation);
    const deleteReservation = useStoreActions((actions) => actions.reservations.deleteReservation);
    const modalData = useSelector((state) => state.modalMarker);

    const [parkingLot, setParkingLot] = useState("Basic Modal");


    const [form] = Form.useForm();

    useEffect(() => {
        fetchResevations();
    }, []);


    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (reservationInfo) => {

        form.setFieldsValue({ name: reservationInfo.fullName });
        form.setFieldsValue({ email: reservationInfo.email });
        form.setFieldsValue({ startDate: moment.utc(reservationInfo.startDate) });
        form.setFieldsValue({ endDate: moment.utc(reservationInfo.endDate) });
        form.setFieldsValue({ cost: reservationInfo.cost });
        form.setFieldsValue({ id: reservationInfo.id });
        setParkingLot( reservationInfo.parkingLot)

        dispatch(actions.modalchangeStartDateAC(moment.utc(reservationInfo.startDate)))
        dispatch(actions.modalchangeEndDateAC(moment.utc(reservationInfo.endDate)))

        setIsModalVisible(true);
        console.log(reservationInfo)
    };

    const onDelete = (reservationInfo) => {

        deleteReservation(reservationInfo.id)

        console.log("Delete reservation with id")
        console.log(reservationInfo.id)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        const reservationData = {
            id: values.id,
            fullName: values.name,
            email: values.email,
            startDate: values.startDate,
            endDate: values.endDate,
            cost: values.cost,
            parkingLot: parkingLot

        };

        editReservation(reservationData);
        setIsModalVisible(false);
        console.log('Values of the form to edit are: ', reservationData);
    };


    const onChangeStartDate = (date, dateString) => {
        dispatch(actions.modalchangeStartDateAC(date))
        var duration = moment.duration(modalData.endDate.diff(date));
        var hours = duration.asHours();
        form.setFieldsValue({ cost: parseInt(hours) * 1 + " €" });
    };

    const onChangeEndDate = (date, dateString) => {
        dispatch(actions.modalchangeEndDateAC(date))
        var duration = moment.duration(date.diff(modalData.startDate));
        var hours = duration.asHours();
        form.setFieldsValue({ cost: parseInt(hours) * 1 + " €" });

    };

    function disabledStartDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day') || current && current > modalData.endDate.endOf('day');
    }

    function disabledEndDate(current) {
        // Can not select days before today and today
        return current && current < modalData.startDate.endOf('day');
    }

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Parking Lot',
            dataIndex: 'parkingLot',
            key: 'parkingLot',
        },
        {
            title: 'From',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'To',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
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
                dataSource={reservationsStore}
                loading={reservationsStore.loading}
            />
            <Modal title={parkingLot} visible={isModalVisible} onCancel={handleCancel} footer={null}>
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
                        name="startDate"
                        label="From"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker showTime onChange={onChangeStartDate} disabledDate={disabledStartDate} />
                    </Form.Item>

                    <Form.Item
                        name="endDate"
                        label="To"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker showTime onChange={onChangeEndDate} disabledDate={disabledEndDate} />
                    </Form.Item>
                    <Form.Item
                        name="cost"
                        label="Cost"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input disabled />
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