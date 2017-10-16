import React from 'react';
import styled from 'styled-components';
import SIcon from '../components/Icon';

const Input = styled.div`
`;
const Button = styled.button`
padding: 5px;
margin-left:25px;
    font-size: 15px;
    background: transparent;
    border-style: none;
    outline: 0;
    -webkit-appearance: none;
    border: none;
    color: white;
    float: left;
    background: rgba(0, 0, 0, 0.36);
    line-height: 30px;
    position:absolute;
    bottom:30px;
    &.search{float:none;margin:0;padding: 0px 4px 0px 8px;position:initial;}
    &.prediction{margin:0;margin-top:-1px;width:15rem;position:initial;text-align:left;padding:5px;height:auto;float:none;background:white;color:#869786;}
    &.prediction.selected{box-shadow: 0px 0px 4px  #b6b6b6;position:initial;height:auto;float:none;background:#e7a462;
    color: #324430;}
    &.prediction:hover{background:#fed6af;}
`;
const Predictions = styled.div`
width:15rem;font-size:15px;
  z-index:3;position:relative;
margin-top: 20px;
display: inline-block;
div.predcontainer{width:15rem;box-shadow: 0px 0px 4px  #b6b6b6;
height:auto;
float:left;
background:#dddddd;

}
div.pred{width:15rem;position:relative;



float:none;

}
input{
outline: none;
  border-style: none;
box-shadow: inset 1px 1px 4px 0px #b6b6b6;
border-radius: 2px;
width: 15rem;
padding: 4px;
position: relative;
}
input:focus{
outline: none;
  border-style: none;
box-shadow: inset 1px 1px 4px 0px #b6b6b6;
border-radius: 2px;
width: 15rem;
padding: 4px;
position: relative;

}
.preds{float:left;}

color: #324430;}
`;
const FindAddress = React.createClass({
  activep(p) {
    console.log(p);
    if (p === this.props.gmap.SelectedPrediction) return 'selected'; return '';
  },
  geocodeAddress(geocoder, resultsMap, address) {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        // this.useraddress.value = results[0].formatted_address;
      //  console.log(results[0]);
        this.props.getProductsByDistance(results[0].geometry.location.lat(), results[0].geometry.location.lng());
      } else {
        // alert(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  },
  findAdres(e) {
    this.props.setSearchAddress(this.useraddress.value);
    if (e.keyCode === 40) { this.props.predictionInc(); return; }
    if (e.keyCode === 38) { this.props.predictionDec(); return; }
    if (e.keyCode === 13) {
      if (this.props.gmap.SelectedPrediction == 0) {
        this.useraddress.value = this.props.ui.predictions[0].description;
        this.geocodeAddress(geocoder, this.props.gmap.map, this.props.ui.predictions[0].description); document.activeElement.blur();
        this.props.setSearchAddress(this.props.ui.predictions[0].description);
        return;
      }
      this.geocodeAddress(geocoder, this.props.gmap.map, this.props.getSelectedPrediction.description); this.useraddress.value = this.props.getSelectedPrediction.description; document.activeElement.blur(); return;
    }

    this.props.predictionRemove();
    const that = this;
    const displaySuggestions = function (predictions, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        console.log(status);
        return;
      }


      that.props.setPredictions(predictions);
    };
    const latlng = new google.maps.LatLng(52.132633, 5.291265);
    if (this.useraddress.value) { service.getPlacePredictions({ input: this.useraddress.value, location: latlng, radius: 200000 }, displaySuggestions); }
  },
  searchBtn() {
    this.geocodeAddress(geocoder, this.props.gmap.map, this.useraddress.value);
    this.useraddress.value = this.props.ui.predictions[0].description;
    this.props.setSearchAddress(this.props.ui.predictions[0].description);
  },
  mclick(k) {
    console.log(this.props.ui.predictions[k - 1].description);
    this.geocodeAddress(geocoder, this.props.gmap.map, this.props.ui.predictions[k - 1].description);
    document.activeElement.blur();
    this.useraddress.value = this.props.ui.predictions[k - 1].description;
    this.props.setSearchAddress(this.props.ui.predictions[k - 1].description);
  },

  componentDidUpdate() {},
  componentDidMount() { if (this.props.ui.searchaddress !== undefined && this.props.ui.searchaddress !== '') this.useraddress.value = this.props.ui.searchaddress; },

  render() {
    let pred;
    let inp;

    if (this.props.ui.searchFocus) {
      let r = 0;
      pred = this.props.gmap.predictions.map((e) => <Button key={r += 1} onMouseDown={this.mclick.bind(this, r)} className={`prediction ${this.activep(r)}`}>{e.description}</Button>);
      pred = <div className="predcontainer" >{pred}</div>;
    } else { pred = null; }
    inp = <input placeholder="Locatie" onBlur={this.props.setSearchFocus.bind(this, false)} onFocus={this.props.setSearchFocus.bind(this, true)} ref={(c) => { this.useraddress = c; }} type="text" onKeyUp={this.findAdres} defaultValue={this.props.getSelectedLocation.address} />;

    return (<div><Predictions>
      {inp}{pred}
    </Predictions><Button className="search" onClick={this.searchBtn}><SIcon>{String.fromCharCode(0xe80d)}</SIcon></Button></div>);
  },

});

export default FindAddress;
