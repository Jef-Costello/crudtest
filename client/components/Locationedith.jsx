import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Gmap from '../components/Gmap';
import styled from 'styled-components';

const ModalInner = styled.div`
padding: 2rem 2rem 2rem 2rem;

background: white;

img{width:100px;}
`;
const Button = styled.button`

height: 40px;
line-height: 40px;
white-space: nowrap;
margin: 10px 10px 0 0;
box-shadow: 0 2px 2px #dddddd;
display: inline-block;
background-color: #fff;
padding: 0 16px;

border-radius: 3px;
font-size: 15px;
text-align:left;
outline: 0;
-webkit-appearance: none;
    border: none;
&.selected{  border: none;background: #da943a;}
}
`;
const Locationedith = React.createClass({
  edit() {
    this.props.editLocation(
      // name, description, id, address, lat, lng

      this.locname.value,
      this.locdescription.value.replace(/\n/g, '%0A'),
      this.props.getSelectedLocation.id,
      this.locaddress.value,
      this.props.ui.lat,
      this.props.ui.lng,
    );
  },
  geocodeAddress(geocoder, resultsMap, address) {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        this.props.setLatLngUi(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        this.props.gmap.map.setCenter(results[0].geometry.location);
        this.props.gmap.marker.setPosition(results[0].geometry.location);
      } else {
        // alert(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  },

  componentDidUpdate() {},
  componentDidMount() {

  },
  render() {
    return (

      <ModalInner>
        <Gmap {...this.props} />
        <div className="grid-photo-wrap" />
                adres: <br /><input ref={(c) => { this.locaddress = c; }} type="text" onKeyPress={this.findAdres} defaultValue={this.props.getSelectedLocation.address} /><br />
              naam: <br /><input ref={(c) => { this.locname = c; }} type="text" defaultValue={this.props.getSelectedLocation.name} /><br />
            beschrijving:<br /><textarea ref={(c) => { this.locdescription = c; }} type="text" defaultValue={this.props.getSelectedLocation.description} />
        <br />
        <Button onClick={this.edit}>opslaan</Button>

        <Button onClick={this.delete}>verwijderen</Button>


      </ModalInner>
    );
  },
  delete() {
    this.props.deleteLocation(this.props.getSelectedLocation.id);
  },
  findAdres(e) {
    this.geocodeAddress(geocoder, this.props.gmap.map, this.locaddress.value);
  },
  pb(e, b) { this.props.pressCatButton(b); },
  locationButton(e, b) { this.props.pressLocButton(b); },
});

export default Locationedith;
