import React from 'react';
import geocodeAddress from '../tools';
import { Link } from 'react-router';
import styled from 'styled-components';
import Google from '../components/Google';
import ModalLogIn from '../components/ModalLogIn';

const OptSmall = styled.span`
display: inline;
a{user-select:none;
border:none;}
@media only screen and (min-width : 660px) {display:none

}
`;
const OptBig = styled.span`
display: none;
a{color:#254022;border-bottom:2px solid transparent;}
@media only screen and (min-width : 660px) {display:inline
}

`;
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
&.close{width:auto;box-shadow:none;background:transparent;padding-left:3px;height:auto;line-height:0;color: #254022;}
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
// const op = (this.props.ui.scroll / 230);

const Icon = styled.span`
    font-size: 20px;

  font-family: "fontello";
  font-style: normal;
  font-weight: normal;
  speak: none;

  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  margin-right: .2em;
  text-align: center;
  /* opacity: .8; */

  /* For safety - reset parent styles, that can break glyph codes*/
  font-variant: normal;
  text-transform: none;

  /* fix buttons height, for twitter bootstrap */
  line-height: 1em;

  /* Animation center compensation - margins should be symmetric */
  /* remove if not needed */
  margin-left: -2px;

  /* You can be more comfortable with increased icons size */
  /* font-size: 120%; */

  /* Font smoothing. That was taken from TWBS */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Uncomment for 3D effect */
  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
`;

const SLink = styled(Link)`

padding-left:3px;
text-decoration:none;
font-size:16px;
color:#254022;
margin:16px;
@media only screen and (min-width : 660px) {
  color:#254022;border-bottom:2px solid #3f6f3a;
  &.active {
  transition:all 1s;
      color: #fff;
      text-shadow: 1px 1px 2px #254022;
      border-bottom:2px solid #65a72b;
    }
}
&.active {
transition:all 1s;
    color: #fff;
    text-shadow: 1px 1px 2px #254022;border:none;
    border-bottom:2px solid #65a72b;
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
  display:none;
    @media only screen and (min-width : 660px) {display:inline
    }
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
background:#5d863b;
background:rgb(72, 104, 48);
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
  componentDidMount() {
    if (!this.props.gmap.initialized && !this.props.gmap.apiLoading) {
      window.initGoogle = this.initGoogle;
      this.props.apiLoading();
      loadJS(`https://maps.googleapis.com/maps/api/js?key=${this.props.gmap.apiKey}&libraries=places&region=NL&callback=initGoogle`);
    }
  },
  componentDidUpdate() { },
  initGoogle() {
    console.log('initgoogle');
    window.service = new google.maps.places.AutocompleteService();
        // window.google
    window.geocoder = new google.maps.Geocoder();
        // window.geocoder.setRegion('nl');
      //  this.props.setGeocoder(geocoder);
    this.props.mapInit();
  },

  render() {
    const root = this.props.connection.root;
    let refreshing;
    let loading;
    const pred = null;
    let input;
    let logo;
    let optsmall,
      optsmallloggedout,
      optbig,
      optbigloggedout;


    optbig = (
      <OptBig>
        <SLink activeClassName="active" to={`${this.props.connection.root}/web/app_dev.php`}>home</SLink>
        <SLink activeClassName="active" to={`${this.props.connection.root}/web/app_dev.php/office/producten`}>mijn producten</SLink>
        <SLink activeClassName="active" to={`${this.props.connection.root}/web/app_dev.php/office/profiel`}>profiel</SLink>

      </OptBig>

    );
    optsmall = (
      <OptSmall>
        <SLink activeClassName="active" to={`${this.props.connection.root}/web/app_dev.php`}><Icon>{ String.fromCharCode(0xe80c)}</Icon></SLink>
        <SLink activeClassName="active" to={`${this.props.connection.root}/web/app_dev.php/office/producten`}><Icon>{ String.fromCharCode(0xe80a)}</Icon></SLink>
        <SLink activeClassName="active" to={`${this.props.connection.root}/web/app_dev.php/office/profiel`}><Icon>{ String.fromCharCode(0xe801)}</Icon></SLink>
        {this.props.route.path === (`${this.props.connection.root}/web/app_dev.php`) ? <Button className="close" onClick={this.props.toggleMenu} activeClassName="active" ><Icon>{ String.fromCharCode(0xf0c9)}</Icon></Button> : null}

      </OptSmall>
  );
    optbigloggedout = (
      <OptBig>
        <SLink activeClassName="active" to={`${this.props.connection.root}/web/app_dev.php`}>home</SLink>


      </OptBig>

  );
    optsmallloggedout = (
      <OptSmall>
        <SLink activeClassName="active" to={`${this.props.connection.root}/web/app_dev.php`}><Icon>{ String.fromCharCode(0xe80c)}</Icon></SLink>

        {this.props.route.path === (`${this.props.connection.root}/web/app_dev.php`) ? <Button className="close" onClick={this.props.toggleMenu} activeClassName="active" ><Icon>{ String.fromCharCode(0xf0c9)}</Icon></Button> : null}

      </OptSmall>
);


    if (this.props.connection.refreshing === true) { refreshing = <div className="refreshing">..refreshing token..</div>; }
    if (this.props.connection.loading === true) { loading = <div className="spinner" />; }
    if (this.props.connection.loggedin === true) {
      return (
        <Topbar>
          {logo}
          <TopBarInner><div>{optbig}{optsmall}</div>
            <Predictions>
              {input}

              {pred}


            </Predictions>{this.props.ui.foundlocation}{refreshing}{loading}</TopBarInner>
          <ModalLogIn {...this.props} />
        </Topbar>
      );
    } return (

      <Topbar>

        <TopBarInner>
          <Predictions>
            {input}

            {pred}


          </Predictions>                         {optbigloggedout}                                               {optsmallloggedout} <LButton onClick={this.props.openModalLogIn}>login</LButton>{loading}</TopBarInner>

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
