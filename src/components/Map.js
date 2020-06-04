import React, { Component } from 'react';
import { Map as GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '70%'
  };

export class Map extends Component {
    render() {
      return (
        <GoogleMap
          google={this.props.google}
          zoom={6}
          style={mapStyles}
          initialCenter={{
           lat: -40.9006,
           lng: 174.8860
          }}
        />
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyCL1nILfyiuoXvn1FgzoUk6QfaMrVR-WOk'
  })(Map);