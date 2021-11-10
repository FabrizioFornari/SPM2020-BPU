import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker, Circle } from 'google-maps-react';
import ReactDOM from 'react-dom';
import { CurrentLocation } from "./components/CurrentLocation"
import 'antd/dist/antd.css';
import styled from "@xstyled/styled-components";
import { ParkingModal } from "./components/ParkingModal";
import * as actions from "../../../redux/actions/index"
import { store } from "../../..//redux/store";
import { Sider } from "..//../Menu/Sider";
import { moment } from 'moment';
import InfoWindowEx from "./components/InfoWindowEx";


export class Maps extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,  // Hides or shows the InfoWindow
      activeMarker: {},          // Shows the active marker upon click
      selectedPlace: {},          // Shows the InfoWindow to the selected place upon a marker
      parkingName: "",
      markerObjects: store.getState().modalMarker.markersData,
      parkingLotCost: 0,
      origin: { lat: -25.344, lng: 131.036 },
      dest: { lat: -25.344, lng: 131.036 },
      distance: '',
      duration: '',
      distanceInKm: 0
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
      ///isModalVisible: true,
      showingInfoWindow: true,
      parkingName: props.name,
      parkingLotCost: props.cost
    });

    //store.dispatch(actions.modalOpenAC())

    console.log(e)
    console.log(props)
    console.log(marker)

    console.log("CurrentLocation")
    console.log(store.getState().modalMarker.currentLocation.lat)
    console.log(store.getState().modalMarker.currentLocation.lng)
    console.log("MarkerClicked")
    console.log(props.position.lat)
    console.log(props.position.lng)

    const lat1 = store.getState().modalMarker.currentLocation.lat;
    const lon1 = store.getState().modalMarker.currentLocation.lng;
    const lat2 = props.position.lat;
    const lon2 = props.position.lng


    this.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

    console.log("DistanceFromLatLonInKm is: ")
    console.log(Math.round(this.state.distanceInKm))

  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1) * (Math.PI / 180);  // deg2rad below
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1) * (Math.PI / 180)) * Math.cos((lat2) * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km

    this.setState({
      distanceInKm: Math.round(d),
    });

  };

  showModal = place => {
    console.log(" showModal is called")
    store.dispatch(actions.modalOpenAC());
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

  showDetails = place => {
    console.log(place);
  };


  render() {

    const data = this.state.markerObjects;

    const coords = { lat: parseFloat(store.getState().modalMarker.currentLocation.lat), lng: parseFloat(store.getState().modalMarker.currentLocation.lng) };

    const google = window.google;

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
                  <Marker name={'Current Location'}
                  />
                  {data.map(item => (
                      <Marker
                          key={item.id}
                          title={item.name}
                          name={item.name}
                          position={{ lat: item.lat, lng: item.lng }}
                          onClick={this.onMarkerClick}
                          cost={item.cost}
                      />
                  ))}
                  <InfoWindowEx
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                  >
                    <div>
                      <h2>Parking lot: {this.state.selectedPlace.name}</h2>
                      <h3>Distance : {this.state.distanceInKm} km</h3>
                      <button
                          type="button"
                          onClick={this.showModal.bind(this, this.state.selectedPlace)}
                      >
                        Reserve Parking
                      </button>
                    </div>
                  </InfoWindowEx>
                  <Circle
                      radius={10000}
                      center={{ lat: parseFloat(store.getState().modalMarker.currentLocation.lat), lng: parseFloat(store.getState().modalMarker.currentLocation.lng) }}
                      onMouseover={() => console.log('mouseover')}
                      onClick={() => console.log('click')}
                      onMouseout={() => console.log('mouseout')}
                      strokeColor='transparent'
                      strokeOpacity={0}
                      strokeWeight={5}
                      fillColor='#FF0000'
                      fillOpacity={0.2}
                  />
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