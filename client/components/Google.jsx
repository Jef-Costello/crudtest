import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const SGmap = styled.div`

div{width:200px;height:200px;}`;
const Google = React.createClass({

  componentDidUpdate() { },
  componentDidMount() {
    this.props.apiLoading();
    console.log('mounted');
    if (!this.props.gmap.apiLoading) {
      window.initMap = this.initMap;
      this.props.apiLoading();
      loadJS(`https://maps.googleapis.com/maps/api/js?key=${this.props.gmap.apiKey}&libraries=places&region=NL&callback=initMap`);
    } else this.initMap();
  },
  initMap() {
    window.service = new google.maps.places.AutocompleteService();
    // window.google
    window.geocoder = new google.maps.Geocoder();
    // window.geocoder.setRegion('nl');
  //  this.props.setGeocoder(geocoder);
    this.props.mapInit();
  },


  render() {
    return null;
  },

});

export default Google;
function loadJS(src) {
  const ref = window.document.getElementsByTagName('script')[0];
  console.log('gooooooogle');
  const script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

