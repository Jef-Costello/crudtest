import React from 'react';
import styled from 'styled-components';
import Gmap from '../components/Gmap';

const Mapcontainer = styled.figure`
margin-top:50px;
width:240px;

height:240px;


`;

const LocationMap = React.createClass({

  componentDidUpdate() { if (this.props.gmap.redrawMarkers && this.props.gmap.map != null) this.drawMarkers(); },
  componentDidMount() {
    this.props.redrawMarkers(true);
    this.drawMarkers();
  },
  drawMarkers() {
    if (this.props.gmap.initialized && this.props.gmap.map != null) {
      console.log('attempt draw markeru');
      this.props.removeMarkers();
      // this.props.ui.lat
      const latlng = new google.maps.LatLng(this.props.ui.lat, this.props.ui.lng);
      this.props.gmap.map.setCenter(latlng);
      console.log(this.props.gmap.map);

      const marker = new google.maps.Marker({
        position: latlng,
        title: location.name,
        map: this.props.gmap.map,
      });
        //  marker.addListener('click', () => {
          // this.props.gmap.map.setCenter(marker.getPosition());
          //  this.props.selectLocationMap(location.id);
        //  });
            // marker.setPosition(latlng);
      this.props.setMarker(marker);
      this.props.pushMarker(marker);
      this.props.redrawMarkers(false);

      console.log('h');
    }
  },
  render() {
    return (

      <Mapcontainer>
        <Gmap {...this.props} h="200px" markers />

      </Mapcontainer>
    );
  },
  onClickl() {
    this.props.selectProduct(this.props.product.id);
  },
});

export default LocationMap;
