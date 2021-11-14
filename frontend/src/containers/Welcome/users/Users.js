import React from 'react';
import { PageHeader, Card, Layout } from 'antd';
import 'antd/dist/antd.css';
import styled from "@xstyled/styled-components";
import { TableSection } from './components/TableSection'
import { useStoreState } from "easy-peasy";
import { SiderMenu } from "..//../Menu/Sider";

const { Header, Content, Footer, Sider } = Layout;

export const Users = () => {

    const usersStore = useStoreState((state) => state.users.usersData);

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
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
          <StyledCard>
              <h1>Users</h1>
              <h3>Here you can update user information </h3>
              <TableSection
              usersStore={usersStore}
              />
          </StyledCard>
          </div>
        </Content>
        <Footer style={{marginTop: '22px', textAlign: 'center',backgroundColor: "white" }}>Copyrights ©2021 - All rights reserved</Footer>
      </Layout>
    </Layout>
    );
};

const StyledPageHeader = styled(PageHeader)`
    width: 100%;
`;

const StyledCard = styled(Card)`
    width: 96%;
`;
