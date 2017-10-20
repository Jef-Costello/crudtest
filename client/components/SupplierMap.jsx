import React from 'react';
import styled from 'styled-components';
import Gmap from '../components/Gmap';

const Mapcontainer = styled.figure`

width:100%;
height:600px;


`;

const SuplierMap = React.createClass({

  componentDidUpdate() { if (this.props.gmap.redrawMarkers) this.drawMarkers(); },
  componentDidMount() {
    if (this.props.filteredProducts.filtered.length > 0) { this.props.redrawMarkers(true); }
  },
  drawMarker(plocation) {
    const indx = this.props.locationsPublic.all.map(el =>
      el.id).indexOf(plocation.id);
      // const l=this.props.locations.all.map
    const latlng = new google.maps.LatLng(this.props.locationsPublic.all[indx].lat, this.props.locationsPublic.all[indx].lng);
  //  that.props.gmap.map.setCenter(latlng);
    console.log(this.props.gmap.map);
    const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    let icon;
    if (plocation.type == 'Primary') { icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'; } else { icon = 'http://maps.google.com/mapfiles/kml/pal3/icon26.png'; }
    const marker = new google.maps.Marker({
      position: latlng,
      title: plocation.name,
      map: this.props.gmap.map,
      icon,
      locationId: plocation.id,
    });
    marker.addListener('click', () => {
      this.props.gmap.map.setCenter(marker.getPosition());
      this.props.selectLocationMap(plocation.id);
    });
      // marker.setPosition(latlng);
    //  marker.setMap(map);
    this.props.pushMarker(marker);
  },

  drawMarkers() {
    console.log('attempt draw marker');
    if (this.props.locationsPublic.locationPage != undefined > 0 && this.props.gmap.initialized) {
      this.props.removeMarkers();
      console.log('fafafaf');
      this.props.redrawMarkers(false);
      const rendered = [];
      this.drawMarker(this.props.locationsPublic.locationPage.location);

      this.props.locationsPublic.locationPage.location.sublocs.map((location) => {
        this.drawMarker(location);
      });
    }
  },
  render() {
    return (

      <Mapcontainer>
        <Gmap {...this.props} markers />
        {this.props.gmap.redrawMarkers ? 'ja' : 'nee'}
      </Mapcontainer>
    );
  },
  onClickl() {
    this.props.selectProduct(this.props.product.id);
  },
});

export default SuplierMap;
