import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const google = window.google

const GoogleMapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `502px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),  
  lifecycle({
      componentWillMount() {
        this.setState({
            zoomToMarkers: map => {                
                if(map==null) {
                  return;
                }
                const bounds = new window.google.maps.LatLngBounds();
                bounds.extend(new window.google.maps.LatLng(this.props.lat, this.props.long));
                map.fitBounds(bounds);
            }
        })
      },
      componentWillReceiveProps() {
          this.setState({
              zoomToMarkers: map => {
                  if(map==null) {
                    return;
                  }
                  const bounds = new window.google.maps.LatLngBounds();
                  bounds.extend(new window.google.maps.LatLng(this.props.lat, this.props.long));
                  map.fitBounds(bounds);
              }
          })
      },
  }),
  withGoogleMap
)(props => {  
  return (<div>    
    <GoogleMap ref={props.zoomToMarkers} center={new google.maps.LatLng(props.lat, props.long)} defaultZoom={0} defaultCenter={{ lat: props.lat, lng: props.long }}>
      
        <Marker position={{ lat: props.lat, lng: props.long }} />
      
    </GoogleMap>  
  </div>
)});

export default GoogleMapComponent