import React, { useEffect } from 'react';
import { Card , Layout} from 'antd';
import { useStoreState, useStoreActions } from "easy-peasy";
import 'antd/dist/antd.css';
import styled from "@xstyled/styled-components";
import { SiderMenu } from "../../Menu/Sider";
import { TableSection } from "./components/TableSection"

const { Header, Content, Footer, Sider } = Layout;

export const Messages = () => {

    const reservationsStore = useStoreState((state) => state.reservations);
    const updateSeenDriverFine = useStoreActions((actions) => actions.reservations.updateSeenDriverFine);
    const userData = useStoreState((state) => state.users.userData)

    const userInfo = {
        email: userData.email,
    };

    useEffect(() => {
        updateSeenDriverFine(userInfo);
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
        <Layout className="site-layout" style={{ marginLeft: 200, minHeight: "100vh"}}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
        <div style={{textAlign: "center", fontSize: "30px", textTransform: "uppercase"}}>
        <h1 style={{color: "#1890ff"}}>Easy Park</h1>
        </div>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>

            <StyledCard>
             <h1>Parking violation</h1>
             <h3> </h3>
             <TableSection
             reservationsStore={reservationsStore}/>
            </StyledCard>
           
           
            </div>
          </Content>
          <Footer style={{marginTop: '22px', textAlign: 'center',backgroundColor: "white" }}>Copyrights ©2021 - All rights reserved</Footer>
        </Layout>
      </Layout>


    );
};

const StyledCard = styled(Card)`
    width: 96%;
`;
