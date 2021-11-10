import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Menu, Avatar, Divider, Badge } from 'antd';
import {
    ToolOutlined,
    LogoutOutlined,
    UserOutlined,
    HomeOutlined,
    GoogleOutlined,
    CarryOutOutlined,
    ProfileOutlined,
    NotificationOutlined
} from '@ant-design/icons';
import { useStoreState, useStoreActions } from "easy-peasy";
import { Link } from 'react-router-dom'
import { IsUsersAccessPermit, IsParkingViolationsAccessPermit } from '../../utils/utils'
import * as actions from "../../redux/actions/index"
import { useSelector, useDispatch } from 'react-redux'
import styled from "@xstyled/styled-components";

const { SubMenu } = Menu;

export const Sider = () => {

    const userData = useStoreState((state) => state.users.userData)
    const isUsersAccessPermit = IsUsersAccessPermit(userData.roles)
    const isParkingViolationsAccessPermit = IsParkingViolationsAccessPermit(userData.roles)
    const { logOutUser } = useStoreActions(actions => ({
        logOutUser: actions.users.logOutUser
    }));
    const reservationsStore = useStoreState((state) => state.reservations);
    const modalData = useSelector((state) => state.modalMarker);


    const dispatch = useDispatch();

    const handleClick = (e) => {
        dispatch(actions.menuChangeKeyAC(e.key))
        console.log('click ', e);
    };

    const logOut = () => {
        console.log("Log Out function is called")
        logOutUser()
    };

    return (
        <>
            <Menu
                theme={"dark"}
                onClick={handleClick}
                style={{ width: 230, height: "100vh", position: "fixed" }}
                defaultOpenKeys={(modalData.selectedKeys === "4" || modalData.selectedKeys === "5") ? ['sub1'] : [""]}
                selectedKeys={[modalData.selectedKeys]}
                mode="inline"
            >
                <Avatar
                    style={{
                        backgroundColor: '#596fff',
                        display: "block",
                        margin: "auto",
                        marginTop: 30

                    }}
                    icon={<UserOutlined />}
                    size={100}
                />
                <h2 style={{ marginTop: 45, color: "white", textAlign: "center" }}>{userData.name + " " + userData.lastName}</h2>
                <Divider style={{ 'background-color': 'white' }}></Divider>

                <Menu.Item key="1" icon={<HomeOutlined />} style={{ marginTop: 45 }}>
                    <Link to="/home">Home</Link>
                </Menu.Item>

                <Menu.Item key="9" icon={<NotificationOutlined />}>
                    <Link to="/messages">
                        <Badge count={reservationsStore.nrParkingViolations}>
                            <div style={{ color: "#fff", marginRight: 13 }} >Messages</div>
                        </Badge>
                    </Link>
                </Menu.Item>

                <Menu.Item key="2" icon={<CarryOutOutlined />}>
                    <Link to="/reservation">Reservations</Link>
                </Menu.Item>

                {isUsersAccessPermit &&
                <Menu.Item key="3" icon={<ToolOutlined />}>
                    <Link to="/users">Users</Link>
                </Menu.Item>}

                {isParkingViolationsAccessPermit &&
                <Menu.Item key="10" icon={<NotificationOutlined />}>
                    <Link to="/parkingviolations">
                        <Badge count={reservationsStore.nrOfAllParkingViolations}>
                            <div style={{ color: "#fff", marginRight: 13 }} >Parking Violations</div>
                        </Badge>
                    </Link>
                </Menu.Item>}

                {isUsersAccessPermit ?

                    <SubMenu key="sub1" icon={<GoogleOutlined />} title="Maps">
                        <Menu.Item key="4"><Link to="/map">Maps</Link></Menu.Item>
                        <Menu.Item key="5"><Link to="/parking">Parking</Link></Menu.Item>
                    </SubMenu>
                    :
                    <Menu.Item key="6" icon={<GoogleOutlined />}>
                        <Link to="/map">Maps</Link>
                    </Menu.Item>
                }



                <Menu.Item key="7" icon={<ProfileOutlined />}>
                    <Link to="/profile">Account Settings</Link>
                </Menu.Item>

                <Menu.Item key="8" icon={<LogoutOutlined />} onClick={logOut}>
                    Log out
                </Menu.Item>
            </Menu>
        </>

    );
};



