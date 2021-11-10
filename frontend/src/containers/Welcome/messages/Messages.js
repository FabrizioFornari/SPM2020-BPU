import React, { useEffect } from 'react';
import { Card } from 'antd';
import { useStoreState, useStoreActions } from "easy-peasy";
import 'antd/dist/antd.css';
import styled from "@xstyled/styled-components";
import { Sider } from "../../Menu/Sider";
import { TableSection } from "./components/TableSection"

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
        <div className="hero">

            <div style={{ width: "100%", display: "table" }}>
                <div style={{ display: "table-row" }}>
                    <div style={{ width: 300, display: "table-cell" }}> <Sider style={{ height: 710, opacity: 40 }} /> </div>
                    <div style={{ display: "table-cell" }}>
                        <StyledCard>
                            <h1>Parking violation</h1>
                            <h3> </h3>
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


const StyledCard = styled(Card)`
    width: 96%;
    margin-top: 140px;
`;
