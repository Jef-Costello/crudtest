import React from 'react';
import styled from 'styled-components';
import Gmap from '../components/Gmap';

const Mapcontainer = styled.figure`
margin-top:50px;
width:240px;

height:240px;
float:right;

`;

const Homemap = React.createClass({
  placeMarkers() {
    const mrkrs = [];
    const that = this;
    const latlng = new google.maps.LatLng(this.props.gmap.lat, this.props.gmap.lng);
    if (this.props.productsPublic.products) {
      this.props.productsPublic.products.map((product) => {
        product.locations.map((location) => {
          const latlng = new google.maps.LatLng(40.1341, 3.134134);
          that.props.gmap.map.setCenter(latlng);
          const marker = new google.maps.Marker();
          marker.setPosition(latlng);
          marker.setMap(that.props.gmap.map);
        //  this.props.pushMarker(marker);

          console.log(location.name);
        });
      });
    }
  },
  componentDidUpdate() {},
  componentDidMount() {

  //  const latlng = new google.maps.LatLng(this.props.gmap.lat, this.props.gmap.lng);
    // this.props.gmap.map.setCenter(latlng);
  },

  render() {
    return (

      <Mapcontainer>
        <Gmap {...this.props} markers />
      </Mapcontainer>
    );
  },
  onClickl() {
    this.props.selectProduct(this.props.product.id);
  },
});

export default Homemap;
