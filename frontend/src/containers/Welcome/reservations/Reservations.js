import React, { useEffect } from 'react';
import { PageHeader, Button, Card } from 'antd';
import 'antd/dist/antd.css';
import styled from "@xstyled/styled-components";
import { TableSection } from './components/TableSection'
import { useStoreState, useStoreActions } from "easy-peasy";
import { Sider } from "..//../Menu/Sider";

export const Reservations = () => {

    const reservationsStore = useStoreState((state) => state.reservations.reservationsData);

    return (
        <div className="hero">

            <div style={{ width: "100%", display: "table" }}>
                <div style={{ display: "table-row" }}>
                    <div style={{ width: 300, display: "table-cell" }}> <Sider style={{ height: 710, opacity: 40 }} /> </div>
                    <div style={{ display: "table-cell" }}>
                        <StyledCard>
                            <h1>Reservations</h1>
                            <h3>Here you can update or delete your reservations </h3>
                            <TableSection
                                reservationsStore={reservationsStore}
                            />
                        </StyledCard>
                    </div>
                </div>
            </div>

        </div>

    );
};


const StyledPageHeader = styled(PageHeader)`
    width: 100%;
`;

const StyledCard = styled(Card)`
    width: 96%;
    margin-top: 140px;
`;
