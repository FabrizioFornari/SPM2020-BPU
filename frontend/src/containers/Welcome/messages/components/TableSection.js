import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Form, Input, Button, DatePicker, Space, Popconfirm, Row, Col } from 'antd';
import { useStoreState, useStoreActions } from "easy-peasy";
import { useSelector, useDispatch } from 'react-redux'
import styled from "@xstyled/styled-components";
import moment from 'moment';
import * as actions from "../../../../redux/actions/index"

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

    const fetchParkingViolationData = useStoreActions((actions) => actions.reservations.fetchParkingViolationData);
    const fetchNrOfParkingViolations = useStoreActions((actions) => actions.reservations.fetchNrOfParkingViolations);
    const userData = useStoreState((state) => state.users.userData)

    useEffect(() => {
        fetchParkingViolationData(userData.email);
    }, []);

    useEffect(() => {
        fetchNrOfParkingViolations(userData.email);
    }, []);

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
    ];

    return (
        <div>
            <StyledTable
                columns={columns}
                dataSource={reservationsStore.parkingViolationData}
                loading={reservationsStore.loading}
            />
        </div>

    );
};

const StyledTable = styled(Table)`

`;