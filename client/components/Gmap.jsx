import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const SGmap = styled.div`
height:100%;
div#map{width:100%;height:100%;}`;
const Gmap = React.createClass({

  componentDidUpdate() {
    console.log('uuuuuuuuu');
    if (this.props.gmap.initialized && this.props.gmap.map == null) this.initMap();
  },
  componentDidMount() {
    if (this.props.gmap.initialized) this.initMap();
  },
  componentWillUnmount() {
    this.props.removeMap(); this.props.redrawMarkers(false);
  },

  initMap() {
    this.props.removeMarkers();
    const latlng = new google.maps.LatLng(this.props.gmap.lat, this.props.gmap.lng);
    const mapOptions =
      {
        zoom: 8,
        center: latlng,
        gestureHandling: true,
      };

    const map = new google.maps.Map(this.node, mapOptions);
    this.props.setMap(map);
    console.log('ingmap');


  //  window.service = new google.maps.places.AutocompleteService();
    // window.google
  //  window.geocoder = new google.maps.Geocoder();
    // window.geocoder.setRegion('nl');
  //  this.props.setGeocoder(geocoder);
  //  this.props.mapInit();

  //  if (this.props.markers) this.props.redrawMarkers(true);
  },


  render() {
    let gmap;

    return (
      <SGmap >
        <div id="map" ref={(node) => this.node = node} />

      </SGmap>
    );
  },

});

export default Gmap;
