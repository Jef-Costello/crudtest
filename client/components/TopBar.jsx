import React from 'react';
import geocodeAddress from '../tools';
import { Link } from 'react-router';
import styled from 'styled-components';
import Google from '../components/Google';

const Button = styled.button`

height: 40px;
line-height: 40px;
white-space: nowrap;
margin-bottom: 10px;
box-shadow: 0 2px 2px #dddddd;
display: inline-block;
background-color: #fff;
padding: 0 16px;
width: 100%;
border-radius: 3px;
font-size: 15px;
text-align:left;
outline: 0;
-webkit-appearance: none;
    border: none;
&.selected{  border: none;background: #da943a;}
}
`;
const LButton = styled.button`
color:white;
background:transparent;
outline: 0;
border:none;
padding-left:3px;
text-decoration:none;
font-size:16px;
float:right;


`;
const SLink = styled(Link)`
color:#254022;
padding-left:3px;
text-decoration:none;
font-size:16px;
border-left:2px solid #3f6f3a;
margin:16px;

&.active {
transition:all 1s;
    color: #fff;
    text-shadow: 1px 1px 2px #254022;
    border-left:2px solid #65a72b;
  }
`;
const Predictions = styled.div`
width:15rem;float:left;
margin-left:50px;
div.predcontainer{width:15rem;
height:auto;
float:left;
background:#dddddd;

}
div.pred{width:15rem;
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
top: -.3rem;}
input:focus{
outline: none;
  border-style: none;
box-shadow: inset 1px 1px 4px 0px #b6b6b6;
border-radius: 2px;
width: 15rem;
padding: 4px;
position: relative;
top: -.3rem;
}
`;
const Topbar = styled.div`
font-size: 16px;
color:white;
z-index: 4;
position:fixed;
background:#e28122;
background:#3f6f3a;
width:100%;
height:3em;
top:0px;
div{float:left;}
div.preds{float:left;}
div.prediction{padding:5px;height:auto;float:none;background:white;color:#869786;box-shadow: 0 2px 2px #aaaaaa;}
div.prediction.selected{height:auto;float:none;background:#e7a462;
color: #324430;}
div.spinner{float:right;}
`;
const TopBarInner = styled.div`
width:100%;
margin:.8em;
padding-right: 2rem;

 `;
const TopBar = React.createClass({
  activep(p) {
    console.log(p);
    if (p === this.props.gmap.SelectedPrediction) return 'selected'; return '';
  },
  geocodeAddress(geocoder, resultsMap, address) {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        this.props.getProductsByDistance(results[0].geometry.location.lat(), results[0].geometry.location.lng());
      } else {
        // alert(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  },
  findAdres(e) {
    if (e.keyCode === 40) { this.props.predictionInc(); return; }
    if (e.keyCode === 38) { this.props.predictionDec(); return; }
    if (e.keyCode === 13) {
      if (this.props.gmap.SelectedPrediction == 0) { this.geocodeAddress(geocoder, this.props.gmap.map, this.useraddress.value); document.activeElement.blur(); return; }
      this.geocodeAddress(geocoder, this.props.gmap.map, this.props.getSelectedPrediction.description); document.activeElement.blur(); return;
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
  searchFocus() { return this.props.ui.searchFocus; },
  componentDidMount() {},
  componentDidUpdate() { },
  render() {
    let refreshing;
    let loading;
    let pred = null;
    let input;

    if (this.props.ui.searchFocus) {
      let r = 0;
      pred = this.props.gmap.predictions.map((e) => <div key={r += 1} className={`prediction ${this.activep(r)}`}>{e.description}</div>);
      pred = <div className="predcontainer" >{pred}</div>;
    } else { pred = null; }
    if (this.props.route.path === '/web/app_dev.php') {
      input =
        <input placeholder="Locatie" onFocus={this.props.setSearchFocus.bind(this, true)} onBlur={this.props.setSearchFocus.bind(this, false)}ref={(c) => { this.useraddress = c; }} type="text" onKeyUp={this.findAdres} defaultValue={this.props.getSelectedLocation.address} />;
    }


    const opt = (
      <span>
        <SLink activeClassName="active" to="/web/app_dev.php/">home</SLink>
        <SLink activeClassName="active" to="/web/app_dev.php/office/producten">mijn producten</SLink>
        <SLink activeClassName="active" to="/web/app_dev.php/office/profiel">profiel</SLink></span>
    );
    if (this.props.connection.refreshing === true) { refreshing = <div className="refreshing">..refreshing token..</div>; }
    if (this.props.connection.loading === true) { loading = <div className="spinner" />; }
    if (this.props.connection.loggedin === true) {
      return (
        <Topbar>

          <TopBarInner><div>{this.props.user.name}{opt}</div>
            <Predictions>
              {input}

              {pred}


            </Predictions>{this.props.ui.foundlocation}{refreshing}{loading}</TopBarInner>

        </Topbar>
      );
    } return (

      <Topbar>

        <TopBarInner>
          <Predictions>
            {input}

            {pred}


          </Predictions><LButton onClick={this.props.openModalLogIn}>login</LButton>{loading}</TopBarInner>

      </Topbar>

    );
  },
});

export default TopBar;
function loadJS(src) {
  const ref = window.document.getElementsByTagName('script')[0];

  const script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}
