import React from 'react';
import Gmap from '../components/Gmap';

const AddressInput = React.createClass({
  geocodeAddress(geocoder, resultsMap, address) {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        this.props.setLatLngUi(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        resultsMap.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
        });
      } else {
        // alert(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  },
  d(e) { console.log(this.ldescription.value.replace(/\n/g, '<br />')); },
  findAdres(e) {
    this.geocodeAddress(geocoder, this.props.gmap.map, this.address.value);
  },
  newlocation(e) {
    if (e !== undefined)e.preventDefault();

    if (this.lname.value === '' || this.ldescription.value === '') { this.props.modalNPError('voer alle velden in.'); } else {
      this.props.newLocation(
      this.props.connection.token, this.lname.value, this.ldescription.value.replace(/\n/g, '%0A'), this.props.ltype, this.address.value, this.props.ui.lat, this.props.ui.lng,
    );
    }
  },
  newsublocation(e) {
    if (e !== undefined)e.preventDefault();

    if (this.lname.value === '' || this.ldescription.value === '') { this.props.modalNPError('voer alle velden in.'); } else {
      this.props.newLocation(
      this.props.connection.token, this.lname.value, this.ldescription.value, 'Secondary', this.address.value, this.props.ui.lat, this.props.ui.lng,
    );
    }
  },
  componentDidMount() {},
  render() {
    return (
      <div>
voer hier onder je adresgegevens in<br />
        <Gmap {...this.props} />
        {this.props.ui.lat}{this.props.ui.lng}
        adres: <br /><input ref={(c) => { this.address = c; }} type="text" onKeyPress={this.findAdres} defaultValue={this.props.getSelectedLocation.address} /><br />
      naam: <br /><input ref={(c) => { this.lname = c; }} type="text" defaultValue={this.props.getSelectedLocation.name} /><br />
    beschrijving:<br /><textarea ref={(c) => { this.ldescription = c; }} onKeyPress={this.d} type="text" defaultValue={this.props.getSelectedLocation.description} />

        <button onClick={this.newlocation}>opslaan</button></div>
    );
  },
});

export default AddressInput;
