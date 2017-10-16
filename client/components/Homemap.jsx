import React from 'react';
import styled from 'styled-components';
import Gmap from '../components/Gmap';

const Mapcontainer = styled.figure`

width:100%;
height:600px;


`;

const Homemap = React.createClass({

  componentDidUpdate() { if (this.props.gmap.redrawMarkers) this.drawMarkers(); },
  componentDidMount() {
    if (this.props.filteredProducts.filtered.length > 0) { this.props.redrawMarkers(true); }
  },
  drawMarkers() {
    console.log('attempt draw marker');
    if (this.props.locationsPublic.all.length > 0 && this.props.gmap.initialized) {
      this.props.removeMarkers();
      console.log('fafafaf');
      this.props.redrawMarkers(false);
      const rendered = [];
      this.props.locationsPublic.all.map((location) => {
        if (rendered.indexOf(location.id) === -1) {
          rendered.push(location.id);
          const indx = this.props.locationsPublic.all.map(el =>
            el.id).indexOf(location.id);
            // const l=this.props.locations.all.map
          const latlng = new google.maps.LatLng(this.props.locationsPublic.all[indx].lat, this.props.locationsPublic.all[indx].lng);
        //  that.props.gmap.map.setCenter(latlng);
          console.log(this.props.gmap.map);
          const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
          let icon;
          if (location.type == 'Primary') { icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'; } else { icon = 'http://maps.google.com/mapfiles/kml/pal3/icon26.png'; }
          const marker = new google.maps.Marker({
            position: latlng,
            title: location.name,
            map: this.props.gmap.map,
            icon,
          });
        //  marker.addListener('click', () => {
          //  this.props.gmap.map.setCenter(marker.getPosition());
          //  this.props.selectLocationMap(location.id);
        //  });
            // marker.setPosition(latlng);
          //  marker.setMap(map);
          this.props.pushMarker(marker);

          console.log('h');
        }
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

export default Homemap;
