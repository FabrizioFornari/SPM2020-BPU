import React from 'react';
import { Card, Button } from "antd"
import { CarOutlined } from "@ant-design/icons"
import styled from "@xstyled/styled-components";

//import { useHistory } from "react-router-dom";
import './Home.css'
import "antd/dist/antd.css";

class Home extends React.Component {

    routeChangeSignUp = () => {
        this.props.history.push('/signup');
        //return <Redirect to="/signup/" />

    }

    routeChangeLogIn = () => {
        this.props.history.push('/login');
        //return <Redirect to="/login/" />

    }

    render() {
        return (
            <div className="hero" style={{ marginTop: 100, height: 300}}>
                <Card title={<StyledTitle level={2}><CarOutlined /> Easy Park</StyledTitle>} bordered={false}
                      style={{
                          width: 791, height: 528, backgroundColor: '#14a7ac', border: 0,
                          opacity: '0.82', borderRadius: '30px', margin: "auto"

                      }}
                      headStyle={{ border: 0 }}
                      bodyStyle={{ border: 0 }}
                >
                    <StyledDiv>
                        <StyledP> <StyledButton onClick={this.routeChangeSignUp}>Sign Up</StyledButton></StyledP>
                        <br></br>
                        <br></br>
                        <StyledP> <StyledButton onClick={this.routeChangeLogIn}>Log In</StyledButton></StyledP>
                    </StyledDiv>
                </Card>
            </div>
        )
    }
}

export default Home;



const StyledTitle = styled.div`
    font-family: BerlinSansFBDemi;
    font-size: 52px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 23.92px;
    text-align: center;
    color: #ffffff;
`;

const StyledButton = styled(Button)`
    width: 261px;
    height: 57px;
    border-radius: 15px;
    background-image: linear-gradient(to top, #ffffff, #ffffff);

    font-family: BerlinSansFBDemi;
    font-size: 36px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 16.56px;
    text-align: center;
    color: #14a7ac;
}
`;


const StyledDiv = styled.div`
    margin: auto;
    width: 60%;
    padding: 10px;
`;

const StyledP = styled.p`
    margin: auto;
    width: 60%;
    padding: 10px;
`;
