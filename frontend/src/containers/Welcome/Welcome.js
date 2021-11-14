import React,{useEffect} from 'react';
import { useStoreState, useStoreActions } from "easy-peasy";
import 'antd/dist/antd.css';
import './index.css';
import styled from "@xstyled/styled-components";
import { useDispatch } from 'react-redux'
import * as actions from "../../redux/actions/index"
import { Layout, Card, Calendar } from 'antd';
import { SiderMenu } from "../Menu/Sider";

const { Header, Content, Footer, Sider } = Layout;

export const Welcome = () => {

    const userData = useStoreState((state) => state.users.userData)
    const fetchNrOfParkingViolations = useStoreActions((actions) => actions.reservations.fetchNrOfParkingViolations);
    const fetchNrOfAllParkingViolations = useStoreActions((actions) => actions.reservations.fetchNrOfAllParkingViolations);
    const dispatch = useDispatch();
    
    useEffect(() => {
		dispatch(actions.markerFetchDataAC());
    }, []);
    
    useEffect(() => {
        fetchNrOfParkingViolations(userData.email);
    }, []);

    useEffect(() => {
        fetchNrOfAllParkingViolations();
    }, []);

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
        <Content style={{ margin: '24px 16px 0', overflow: 'initial'}}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
          <h1 style={{ textAlign: "center" }}>Welcome, {userData.name} {userData.lastName}</h1>
          <div className="site-calendar-demo-card" >
          <Calendar fullscreen={false} />
          </div>
          </div>
        </Content>
        <Footer style={{marginTop: '22px', textAlign: 'center',backgroundColor: "white" }}>Copyrights ©2021 - All rights reserved</Footer>
      </Layout>
    </Layout>
    );
};

const StyledCard = styled(Card)`
    width: 50%;
    margin: auto;
    width: 60%;
    margin-top: 140px;
`;
