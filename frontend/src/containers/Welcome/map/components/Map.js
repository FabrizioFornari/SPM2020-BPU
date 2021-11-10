/*global google*/
import ReactDOM from "react-dom";
import React from "react";
import { store } from "../../../..//redux/store";

import {
    GoogleMap,
    StandaloneSearchBox,
    DirectionsRenderer,
    Marker
} from "@react-google-maps/api";

const defaultLocation = { lat: 45.4642, lng: 9.1900 };
let destination = { lat: 43.2984, lng: 13.4535 };
let origin = { lat: 45.4642, lng: 9.19 };
let directionsService;
class Map extends React.Component {
    state = {
        directions: null,
        bounds: null,
        markerObjects: store.getState().modalMarker.markersData,
    };

    onMapLoad = map => {
        directionsService = new google.maps.DirectionsService();
        //load default origin and destination
        this.changeDirection(origin, destination);
    };

    //function that is called when SearchBox has loaded and assigned ref to this.searchbox  to get the searchbox object
    onSBLoad = ref => {
        this.searchBox = ref;
    };

    onPlacesChanged = () => {
        //pass the new place location as the origin
        this.changeDirection(
            this.searchBox.getPlaces()[0].geometry.location,
            destination
        );
    };

    //function that is calling the directions service
    changeDirection = (origin, destination) => {
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    //changing the state of directions to the result of direction service
                    this.setState({
                        directions: result
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    };

    render() {

        const data = this.state.markerObjects;


        return (
            <div>
                <div id="searchbox">
                    <StandaloneSearchBox
                        onLoad={this.onSBLoad}
                        onPlacesChanged={this.onPlacesChanged}
                    >
                        <input
                            type="text"
                            placeholder="Customized your placeholder"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-120px"
                            }}
                        />
                    </StandaloneSearchBox>
                </div>
                <br />
                <div>
                    <GoogleMap
                        center={defaultLocation}
                        zoom={5}
                        onLoad={map => this.onMapLoad(map)}
                        mapContainerStyle={{ height: "400px", width: "800px" }}
                    >
                        {this.state.directions !== null && (
                            <DirectionsRenderer directions={this.state.directions} />
                        )}

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
                    </GoogleMap>
                </div>
            </div>
        );
    }
}

export default Map;