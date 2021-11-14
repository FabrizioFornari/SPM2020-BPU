import React, { useState, useEffect, useRef } from 'react';
import { Table, Tag, Modal, Form, Input, Button, DatePicker, InputNumber } from 'antd';
import { useStoreState, useStoreActions } from "easy-peasy";
import { useSelector, useDispatch } from 'react-redux'
import * as actions from "../../../../redux/actions/index"
import moment from 'moment'

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

export const ParkingModal = ({ parkingName, initialStartDate, initialEndDate, parkingLotCost }) => {

  const modalData = useSelector((state) => state.modalMarker);
  const dispatch = useDispatch();
  const userData = useStoreState((state) => state.users.userData)
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [cost, setCost] = useState(0);
  const saveReservation = useStoreActions((actions) => actions.reservations.saveReservation);

  const [form] = Form.useForm();

  const onFinish = (values) => {

    console.log('Received values of form: ', values);

    const reservationData = {
      fullName: values.name,
      email: values.email,
      startDate: values.startDate,
      endDate: values.endDate,
      cost: values.cost,
      parkingLot: parkingName
    };

    saveReservation(reservationData);
    dispatch(actions.modalCloseAC());
    form.resetFields();

    let newArr = [...fields]; // copying the old datas array
    newArr[0] = {
      name: ['name'],
      value: userData.name + " " + userData.lastName,
    };

    newArr[1] = {
      name: ['email'],
      value:  userData.email,
    };

    newArr[2] = {
      name: ['startDate'],
      value: moment(),
    };

    newArr[3] = {
      name: ['endDate'],
      value: moment(),
    };

    setFields(newArr);
    console.log('Values of the form to save are: ', reservationData);
  };

  const handleCancel = () => {
    console.log("yyyyyyyyyyyyyyyyyyy")
    dispatch(actions.modalCloseAC());
    form.resetFields();

    let newArr = [...fields]; // copying the old datas array
    newArr[0] = {
      name: ['name'],
      value: userData.name + " " + userData.lastName,
    };

    newArr[1] = {
      name: ['email'],
      value:  userData.email,
    };

    newArr[2] = {
      name: ['startDate'],
      value: moment(),
    };

    newArr[3] = {
      name: ['endDate'],
      value: moment(),
    };

    setFields(newArr);


  };

  useEffect(() => {
    // action on update of movies
  }, [startDate]);

  useEffect(() => {
    // action on update of movies
  }, [endDate]);

  const onChangeStartDate = (date, dateString) => {
    setStartDate(date)
    dispatch(actions.modalchangeStartDateAC(date))
    var duration = moment.duration(modalData.endDate.diff(date));
    var hours = duration.asHours();
    form.setFieldsValue({ cost: Math.round(hours) * parkingLotCost + " €" });
  };

  const onChangeEndDate = (date, dateString) => {
    setEndDate(date)
    dispatch(actions.modalchangeEndDateAC(date))
    var duration = moment.duration(date.diff(modalData.startDate));
    var hours = duration.asHours();
    console.log("hours:")
    console.log(Math.round(hours))
    form.setFieldsValue({ cost: Math.round(hours) * parkingLotCost + " €" });
  };

  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledStartDate(current) {
    // Can not select days before today and today
    return current && current < moment().subtract(1, 'days').endOf('day') || current && current > moment(modalData.endDate).endOf('day');
  }


  function disabledEndDate(current) {
    // Can not select days before today and today
    return current && current < moment(modalData.startDate).subtract(1, 'days').endOf('day');
  }

  const [fields, setFields] = useState([
    {
      name: ['name'],
      value: userData.name + " " + userData.lastName,
    },
    {
      name: ['email'],
      value: userData.email,
    },
    {
      name: ['startDate'],
      value: moment(),
    },
    {
      name: ['endDate'],
      value: moment(),
    },
    {
      name: ['cost'],
      value: parseInt(moment.duration(endDate.diff(startDate)).asHours()) * 1 + " €",
    },
  ]);


  return (
    <div>
      <Modal title={parkingName} visible={modalData.isModalVisible} onCancel={handleCancel} footer={null} >
        <Form {...formItemLayout} form={form} name="basic" fields={fields} onFinish={onFinish}>
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
            <DatePicker
              showTime={{
                format: "HH:mm"
              }}
              onChange={onChangeStartDate}
              disabledDate={disabledStartDate}
            />
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
            <DatePicker
              showTime={{
                format: "HH:mm"
              }}
              onChange={onChangeEndDate}
              disabledDate={disabledEndDate}

            />
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
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ position: "absolute", right: -155 }}>
              Reserve Parking
        </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>

  );
};
