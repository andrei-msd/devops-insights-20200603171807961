import React, { Component } from 'react';
import { Map as GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '70%'
  };

export class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
          markers: []
        };
        this.onClick = this.onClick.bind(this);
      }
    
      onClick(props, map, coord) {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
    
        this.setState( event => {
            this.props.onCityClick(lat, lng);
          return {
            markers: [ 
              {
                position: {lat, lng}
              }
            ]
          };
          
        });
      }
    
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
                onClick={this.onClick}
            >
              {this.state.markers.map((marker) => (
                <Marker
                  position={marker.position}
                />
              ))}
            </GoogleMap>
        );
      }
    }
  
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyCL1nILfyiuoXvn1FgzoUk6QfaMrVR-WOk'
  })(Map);