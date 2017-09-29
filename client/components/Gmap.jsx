import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const SGmap = styled.div`

div{width:240px;height:240px;}`;
const Gmap = React.createClass({

  componentDidUpdate() { if (this.props.gmap.redrawMarkers) this.drawMarkers(); },
  componentDidMount() {
    if (!this.props.gmap.initialized && !this.props.gmap.apiLoading) {
      window.initMap = this.initMap;
      this.props.apiLoading();
      loadJS(`https://maps.googleapis.com/maps/api/js?key=${this.props.gmap.apiKey}&libraries=places&region=NL&callback=initMap`);
    } else this.initMap();
  },
  drawMarkers() {
    this.props.redrawMarkers(false);
    const rendered = [];
    this.props.filteredProducts.filtered.map((product) => {
      product.locations.map((location) => {
        if (rendered.indexOf(location.id) === -1) {
          rendered.push(location.id);
          const indx = this.props.locationsPublic.all.map(el =>
            el.id).indexOf(location.id);
            // const l=this.props.locations.all.map
          const latlng = new google.maps.LatLng(this.props.locationsPublic.all[indx].lat, this.props.locationsPublic.all[indx].lng);
        //  that.props.gmap.map.setCenter(latlng);
          const marker = new google.maps.Marker({
            position: latlng,
            title: location.name,
            map: this.props.gmap.map,
          });
          marker.addListener('click', () => {
            this.props.gmap.map.setCenter(marker.getPosition());
            this.props.selectLocationMap(location.id);
          });
            // marker.setPosition(latlng);
          //  marker.setMap(map);
          this.props.pushMarker(marker);

          console.log(location.lat);
        }
      });
    });
  },
  initMap() {
    const latlng = new google.maps.LatLng(this.props.gmap.lat, this.props.gmap.lng);
    const mapOptions =
      {
        zoom: 8,
        center: latlng,
        gestureHandling: true,
      };

    const map = new google.maps.Map(this.node, mapOptions);
    this.props.setMap(map);
    console.log('initmap');

    const marker = new google.maps.Marker({
      map,
      position: latlng,
    });
    this.props.setMarker(marker);
    window.service = new google.maps.places.AutocompleteService();
    // window.google
    window.geocoder = new google.maps.Geocoder();
    // window.geocoder.setRegion('nl');
  //  this.props.setGeocoder(geocoder);
    this.props.mapInit();
    if (this.props.markers) this.props.redrawMarkers(true);
  },


  render() {
    let gmap;

    return (
      <div>
        <div id="map" ref={(node) => this.node = node} />

      </div>
    );
  },

});

export default Gmap;
function loadJS(src) {
  const ref = window.document.getElementsByTagName('script')[0];

  const script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

