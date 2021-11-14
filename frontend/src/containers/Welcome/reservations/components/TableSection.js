import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Form, Input, Button, DatePicker, Space, Popconfirm, Row, Col } from 'antd';
import { useStoreState, useStoreActions } from "easy-peasy";
import { useSelector, useDispatch } from 'react-redux'
import styled from "@xstyled/styled-components";
import moment from 'moment';
import * as actions from "../../../../redux/actions/index"
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

    const dispatch = useDispatch();
    const fetchResevations = useStoreActions((actions) => actions.reservations.fetchReservations);
    const editReservation = useStoreActions((actions) => actions.reservations.editReservation);
    const deleteReservation = useStoreActions((actions) => actions.reservations.deleteReservation);
    const enter = useStoreActions((actions) => actions.reservations.enter);
    const exit = useStoreActions((actions) => actions.reservations.exit);
    const userData = useStoreState((state) => state.users.userData)
    const fetchNrOfParkingViolations = useStoreActions((actions) => actions.reservations.fetchNrOfParkingViolations);

    const modalData = useSelector((state) => state.modalMarker);

    const [parkingLot, setParkingLot] = useState("Basic Modal");

    const [form] = Form.useForm();

    useEffect(() => {
        fetchResevations(userData.email);
    }, []);

    useEffect(() => {
        fetchNrOfParkingViolations(userData.email);
    }, []);


    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (reservationInfo) => {

        form.setFieldsValue({ name: reservationInfo.fullName });
        form.setFieldsValue({ email: reservationInfo.email });
        form.setFieldsValue({ startDate: moment.utc(reservationInfo.startDate) });
        form.setFieldsValue({ endDate: moment.utc(reservationInfo.endDate) });
        form.setFieldsValue({ cost: reservationInfo.cost });
        form.setFieldsValue({ id: reservationInfo.id });
        setParkingLot(reservationInfo.parkingLot)

        dispatch(actions.modalchangeStartDateAC(moment.utc(reservationInfo.startDate)))
        dispatch(actions.modalchangeEndDateAC(moment.utc(reservationInfo.endDate)))

        setIsModalVisible(true);
        console.log(reservationInfo)
    };

    const onDelete = (reservationInfo) => {
        const reservationData = {
            id: reservationInfo.id,
            email: userData.email,
        };

        deleteReservation(reservationData)

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

    const onEnter = (reservationInfo) => {
        console.log("doEnter")

        const reservationData = {
            id: reservationInfo.id,
            date: moment(),
            email: reservationInfo.email,
        };

        enter(reservationData);
        console.log(reservationData)
    };


    const onExit = (reservationInfo) => {

        const reservationData = {
            id: reservationInfo.id,
            date: moment(),
            email: reservationInfo.email,
        };

        exit(reservationData);
        console.log(reservationData)
    };



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
            title: 'Parking Check-In',
            dataIndex: 'startDate',
            render: (text, record) => (
                <div>
                    {moment(text).format('MMMM Do YYYY, h:mm a')}
                </div>
            ),
        },
        {
            title: 'Parking Check-Out',
            dataIndex: 'endDate',
            render: (text, record) => (
                <div>
                    {moment(text).format('MMMM Do YYYY, h:mm a')}
                </div>
            ),
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
        },
        {
            title: 'Enter',
            dataIndex: 'enterDate',
            render: (text, record) => (
                <div>
                    {text === null ?
                        <CloseOutlined />
                        :
                        <CheckOutlined />
                    }
                </div>
            ),
        },
        {
            title: 'Exit',
            dataIndex: 'exitDate',
            render: (text, record) => (
                <div>
                    {text === null ?
                        <CloseOutlined />
                        :
                        <CheckOutlined />
                    }
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
                    <Row>
                        <Col span={12}>
                            {record.enterDate === null ?
                                <a><span onClick={() => onEnter(record)}><LoginOutlined /></span></a>
                                :
                                <a disabled ><span onClick={() => onEnter(record)}><LoginOutlined /></span></a>
                            }
                        </Col>
                        <Col span={12}>
                            {record.exitDate === null && record.enterDate != null?
                                <a><span onClick={() => onExit(record)}><LogoutOutlined /></span></a>
                                :
                                <a disabled ><span onClick={() => onExit(record)}><LogoutOutlined /></span></a>
                            }
                        </Col>
                    </Row>
                </div>
            ),
        },
    ];

    return (
        <div>
            <StyledTable
                columns={columns}
                dataSource={reservationsStore.reservationsData}
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
                        label="ARRIVAL"
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
                        label="DEPARTURE"
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