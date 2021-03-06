import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import LocationMap from '../components/LocationMap';
import styled from 'styled-components';

const OpeningHours = styled.div`
input{width:100px;}
div.inner{width:240px;float:right;}
div.outer{line-height: 33px;}
`;
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
const Locationnew = React.createClass({

  newlocation(e) {
    if (e !== undefined)e.preventDefault();
    const fd = new FormData();

    if (this.locname.value === '' || this.locdescription.value === '') { this.props.modalNPError('voer alle velden in.'); } else {
      fd.append('file', this.limage.files[0]);
      fd.append('name', this.locname.value);
      fd.append('description', this.locdescription.value.replace(/\n/g, '%0A'));
      fd.append('monfrom', this.monfrom.value);
      fd.append('monto', this.monto.value);
      fd.append('tuefrom', this.tuefrom.value);
      fd.append('tueto', this.tueto.value);
      fd.append('wedfrom', this.wedfrom.value);
      fd.append('wedto', this.wedto.value);
      fd.append('thufrom', this.thufrom.value);
      fd.append('thuto', this.thuto.value);
      fd.append('frifrom', this.frifrom.value);
      fd.append('frito', this.frito.value);
      fd.append('satfrom', this.satfrom.value);
      fd.append('satto', this.satto.value);
      fd.append('sunfrom', this.sunfrom.value);
      fd.append('sunto', this.sunto.value);
      fd.append('ltype', this.props.ltype);
      fd.append('address', this.locaddress.value);
      fd.append('lat', this.props.ui.lat);
      fd.append('lng', this.props.ui.lng);
      this.props.newLocation(fd);
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
    const GeocoderRequest = { address, region: 'nl' };
    geocoder.geocode(GeocoderRequest, (results, status) => {
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
  componentDidMount() { window.scrollTo(0, 0); },
  componentWillMount() {
    this.props.setLatLngUi(this.props.gmap.lat, this.props.gmap.lng);
  },
  render() {
    return (

      <ModalInner >
        <LocationMap {...this.props} />
        <div className="grid-photo-wrap" />


          afbeelding: <br /><input ref={(c) => { this.limage = c; }} onChange={this.previewChange} type="file" name="file" id="file" className="inputfile" /><label htmlFor="file">Kies bestand</label><br />
        <img className="preview" src={this.props.ui.previewimage} /><br />
                adres: <br /><input ref={(c) => { this.locaddress = c; }} type="text" onChange={this.findAdres} /><br />
              naam: <br /><input ref={(c) => { this.locname = c; }} type="text" /><br />
            beschrijving:<br /><textarea ref={(c) => { this.locdescription = c; }} type="text" />
            openingstijden:<OpeningHours>
              <div className="outer">  maandag: <div className="inner"> <input ref={(c) => { this.monfrom = c; }} type="time" defaultValue={this.props.getSelectedLocation.monfrom} /> tot <input ref={(c) => { this.monto = c; }} type="time" defaultValue={this.props.getSelectedLocation.monto} /></div></div>
              <div className="outer">dinsdag: <div className="inner"><input ref={(c) => { this.tuefrom = c; }} type="time" defaultValue={this.props.getSelectedLocation.tuefrom} /> tot <input ref={(c) => { this.tueto = c; }} type="time" defaultValue={this.props.getSelectedLocation.tueto} /></div></div>
              <div className="outer">woensdag: <div className="inner"><input ref={(c) => { this.wedfrom = c; }} type="time" defaultValue={this.props.getSelectedLocation.wedfrom} /> tot <input ref={(c) => { this.wedto = c; }} type="time" defaultValue={this.props.getSelectedLocation.wedto} /></div></div>
              <div className="outer">donderdag: <div className="inner"><input ref={(c) => { this.thufrom = c; }} type="time" defaultValue={this.props.getSelectedLocation.thufrom} /> tot <input ref={(c) => { this.thuto = c; }} type="time" defaultValue={this.props.getSelectedLocation.thuto} /></div></div>
              <div className="outer">vrijdag: <div className="inner"><input ref={(c) => { this.frifrom = c; }} type="time" defaultValue={this.props.getSelectedLocation.frifrom} /> tot <input ref={(c) => { this.frito = c; }} type="time" defaultValue={this.props.getSelectedLocation.frito} /></div></div>
              <div className="outer">zaterdag: <div className="inner"><input ref={(c) => { this.satfrom = c; }} type="time" defaultValue={this.props.getSelectedLocation.satfrom} /> tot <input ref={(c) => { this.satto = c; }} type="time" defaultValue={this.props.getSelectedLocation.satto} /></div></div>
              <div className="outer">zondag: <div className="inner"><input ref={(c) => { this.sunfrom = c; }} type="time" defaultValue={this.props.getSelectedLocation.sunfrom} /> tot <input ref={(c) => { this.sunto = c; }} type="time" defaultValue={this.props.getSelectedLocation.sunto} /></div></div>

            </OpeningHours>
        <button onClick={this.newlocation}>opslaan</button>


        <button onClick={this.props.closeLocationModal}>cancel</button>


      </ModalInner>
    );
  },

  findAdres(e) {
    this.geocodeAddress(geocoder, this.props.gmap.map, this.locaddress.value);
  },

});

export default Locationnew;
