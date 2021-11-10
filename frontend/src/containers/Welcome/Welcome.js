import React,{useEffect} from 'react';
import { Card } from 'antd';
import { useStoreState, useStoreActions } from "easy-peasy";
import 'antd/dist/antd.css';
import styled from "@xstyled/styled-components";
import { Sider } from "..//Menu/Sider";
import { useDispatch } from 'react-redux'
import * as actions from "../../redux/actions/index"
import { Calendar, Divider } from 'antd';

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
        <div className="hero">

            <div style={{width: "100%", display: "table"}}>
                <div style={{display: "table-row"}}>
                    <div style={{width: 256, display: "table-cell"}}> <Sider style={{height: 710, opacity: 40 }}/> </div>
                    <div style={{display: "table-cell"}}>
                        <StyledCard>
                            <h1 style={{ textAlign: "center" }}>Welcome, {userData.name} {userData.lastName}</h1>
                            <Divider />
                            <Calendar fullscreen={false} style={{ margin: "auto", width: "50%" }}/>
                        </StyledCard>
                    </div>
                </div>
            </div>


        </div>

    );
};

const StyledCard = styled(Card)`
    width: 50%;
    margin: auto;
    width: 60%;
    margin-top: 140px;
`;
