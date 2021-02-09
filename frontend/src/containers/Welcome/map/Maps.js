import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import ReactDOM from 'react-dom';
import { CurrentLocation } from "./components/CurrentLocation"
import 'antd/dist/antd.css';
import styled from "@xstyled/styled-components";
import { ParkingModal } from "./components/ParkingModal";
import { useSelector, useDispatch } from 'react-redux'
import * as actions from "../../../redux/actions/index"
import { store } from "../../..//redux/store";
import { Sider } from "..//../Menu/Sider";


export class Maps extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,  // Hides or shows the InfoWindow
      activeMarker: {},          // Shows the active marker upon click
      selectedPlace: {},          // Shows the InfoWindow to the selected place upon a marker
      parkingName: "",
      markerObjects: store.getState().modalMarker.markersData,
      parkingLotCost: 0
    };

  }


  componentDidMount() {
    console.log("Behavior before the component is added to the DOM");
  }



  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      //showingInfoWindow: true
      isModalVisible: true,
      parkingName: props.name,
      parkingLotCost: props.cost
    });

    store.dispatch(actions.modalOpenAC())

    console.log(e)
    console.log(props)
    console.log(marker)
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  showModal = () => {
    this.setState({
      isModalVisible: true
    });

  };

  handleOk = () => {
    this.setState({
      isModalVisible: false
    });
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false
    });
  };

  render() {

    const data = this.state.markerObjects;

    return (

      <div className="hero">

        <div style={{ width: "100%", display: "table" }}>
          <div style={{ display: "table-row" }}>

            <div style={{ width: 300, display: "table-cell" }}>
              <Sider style={{ height: 710, opacity: 40 }} />
            </div>

            <div style={{ display: "table-cell" }}>
              <CurrentLocation
                centerAroundCurrentLocation
                google={this.props.google}
                style={{ height: '70vh', width: 300 }}
              >

                {data.map(item => (
                  <Marker
                    key={item.id}
                    title={item.name}
                    name={item.name}
                    position={{ lat: item.lat, lng: item.lng}}
                    onClick={this.onMarkerClick}
                    cost={item.cost}
                  />
                ))}
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                >
                  <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                  </div>
                </InfoWindow>
              </CurrentLocation>
              <ParkingModal
                parkingName={this.state.parkingName}
                ifIsModalVisible={this.state.isModalVisible}
                parkingLotCost={this.state.parkingLotCost}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Maps = GoogleApiWrapper({
  apiKey: "AIzaSyDJfReL2XNwelmWIkJaDP2MXuDN5CRkkYo",
})(Maps);

const rootElement = document.getElementById("root");
ReactDOM.render(<Maps />, rootElement);


const StyledDiv = styled.div`
    margin: auto;
    width: 50%;
    padding: 10px;
`;