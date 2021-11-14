import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Form, Input, Button, Checkbox, Col, Row, Avatar } from 'antd';
import { useStoreState, useStoreActions } from "easy-peasy";
import styled from "@xstyled/styled-components";
import { UserOutlined } from '@ant-design/icons';

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


export const TableSection = ({ usersStore }) => {

  const fetchUsers = useStoreActions((actions) => actions.users.fetchUsers);
  const editUser = useStoreActions((actions) => actions.users.editUser);

  useEffect(() => {
    fetchUsers();
  }, []);


  const [isModalVisible, setIsModalVisible] = useState(false);

  const [fields, setFields] = useState([
    {
      name: ['name'],
      value: '',
    },
    {
      name: ['surname'],
      value: '',
    },
    {
      name: ['email'],
      value: '',
    },
    {
      name: ['checkboxgroup'],
      value: ["Driver"],
    },
  ]);

  const showModal = (userInfo) => {
    let newArr = [...fields]; // copying the old datas array
    newArr[0] = {
      name: ['name'],
      value: userInfo.name,
    };

    newArr[1] = {
      name: ['surname'],
      value: userInfo.lastName,
    };

    newArr[2] = {
      name: ['email'],
      value: userInfo.email,
    };

    newArr[3] = {
      name: ['checkboxgroup'],
      value: userInfo.roles,
    };

    setFields(newArr);

    setIsModalVisible(true);
    console.log(userInfo)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);

    const userData = {
      name: values.name,
      lastName: values.surname,
      email: values.email,
      roles: values.checkboxgroup
    };

    editUser(userData);
    setIsModalVisible(false);
    console.log('Values of the form to save are: ', userData);
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: '13%',
      render: () => <Avatar
          style={{
              backgroundColor: '#596fff',
              display: "block",
              
          }}
          icon={<UserOutlined />}
      />
  },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Roles',
      key: 'roles',
      dataIndex: 'roles',
      render: roles => (
        <>
          {roles.map(role => {
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
      ),
    },
    {
      title: 'Action',
      key: 'id',
      dataIndex: 'id',
      render: (text, record) => (
        <a onClick={() => showModal(record)}>Edit</a>
      ),
    },
  ];

  return (
    <div>
      <StyledTable
        columns={columns}
        dataSource={usersStore}
      />
      <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel} footer={null}>
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

          <Form.Item name="checkboxgroup" label="Roles">
            <Checkbox.Group>
              <Row>
                <Col >
                  <Checkbox
                    value="Municipality"
                    style={{
                      lineHeight: '32px',
                    }}
                  >
                    Municipality
              </Checkbox>
                </Col>

                <Col span={8}>
                  <Checkbox
                    value="Driver"
                    style={{
                      lineHeight: '32px',
                    }}
                  >
                    Driver
              </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="Tow Truck"
                    style={{
                      lineHeight: '32px',
                    }}
                  >
                    Tow Truck
              </Checkbox>
                </Col>

                <Col span={8}>
                  <Checkbox
                    value="Policeman"
                    style={{
                      lineHeight: '32px',
                    }}
                  >
                    Policeman
              </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" style={{float: "right", marginRight: -160}}>
              Save
        </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>

  );
};

const StyledTable = styled(Table)`

`;