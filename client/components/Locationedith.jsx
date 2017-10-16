import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import LocationMap from '../components/LocationMap';
import styled from 'styled-components';

const ModalInner = styled.div`
padding: 2rem 2rem 2rem 2rem;

background: white;

img{width:300px;}
.inputfile {
width: 0.1px;
height: 0.1px;
opacity: 0;
overflow: hidden;
position: absolute;
z-index: -1;
}
textarea{width:100%;max-width:100%;height:200px;}
.inputfile + label {
  cursor: pointer;
  border:2px solid transparent;
  height: 26px;
  line-height: 26px;
  white-space: nowrap;
  margin: 2px;
  box-shadow: 0 2px 2px #dddddd;
  display: inline-block;
  background-color: #fff;
  padding: 0 16px;
  min-width: 25%;
  border-radius: 3px;
  font-size: 12px;
  text-align:center;
  outline: 0;
  color: #324430;
  -webkit-appearance: none;
}

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
      // name, description, id, address, lat, lng


    const fd = new FormData();

    if (this.locname.value === '' || this.locdescription.value === '') { this.props.modalNPError('voer alle velden in.'); } else {
      fd.append('file', this.limage.files[0]);
      fd.append('id', this.props.getSelectedLocation.id);
      fd.append('name', this.locname.value);
      fd.append('description', this.locdescription.value.replace(/\n/g, '%0A'));

      fd.append('address', this.locaddress.value);
      fd.append('lat', this.props.ui.lat);
      fd.append('lng', this.props.ui.lng);
      this.props.editLocation(fd);
    }
  },
  previewChange() {
    console.log('e.target');
    const reader = new FileReader();
    const that = this;
    reader.onload = function (e) {
      console.log('e.target');
      that.props.setPreviewImageSrc(e.target.result);
    };

    reader.readAsDataURL(this.limage.files[0]);
  //  console.log(this.npimage.files[0]);
  //  this.props.setPreviewImageSrc(this.npimage.files[0].result);
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
    window.scrollTo(0, 0);
    this.props.setPreviewImageSrc(`/web/${this.props.getSelectedLocation.imgurl}`);
  },
  render() {
    return (

      <ModalInner>
        <LocationMap {...this.props} />
        <div className="grid-photo-wrap" />
        <br /><input ref={(c) => { this.limage = c; }} onChange={this.previewChange} type="file" name="file" id="file" className="inputfile" /><label htmlFor="file">wijzig afbeelding</label><br />
        <img className="preview" src={this.props.ui.previewimage} /><br />
                adres: <br /><input ref={(c) => { this.locaddress = c; }} type="text" onChange={this.findAdres} defaultValue={this.props.getSelectedLocation.address} /><br />
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
