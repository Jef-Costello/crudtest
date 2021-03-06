import React from 'react';
import styled from 'styled-components';
import Icon from '../components/Icon';

const Button = styled.button`

height: 40px;
line-height: 40px;
white-space: nowrap;
margin: 10px;
z-index:2;
display: inline-block;
background-color: #fff;
padding: 0 16px;
position:absolute;
right:10px;top:10px;
border-radius: 3px;
font-size: 15px;
text-align:left;
outline: 0;
-webkit-appearance: none;
    border: none;
&.selected{  border: none;background: #da943a;}
&.edit{top:0px;right:0px}
}
`;
const SLocation = styled.div`

color: #324430;
font-family:'Open Sans',sans-serif;
font-size:10px;
font-weight:600;
width: 100%;
height:150px;


padding: 1rem;
border: 1px solid #edeeed;
background: #fff;
box-shadow: 0 0 14px 10px rgba(0,0,0,0.03);
position: relative;

`;
const Location = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {},

  render() {
    const { location } = this.props;
    return (

      <SLocation>
        {location.name}<br />
        <div className="description">{location.description.split('\n').map((item, key) => <span key={key}>{item}<br /></span>)} </div><br />
        <div>{location.address} </div>


        <Button className="edit" onClick={this.onClickl}><Icon>{ String.fromCharCode(0xe800)}</Icon></Button>


      </SLocation>
    );
  },
  onClickl() {
  //  const ll = new google.maps.LatLng(this.props.location.lat, this.props.location.lng);
    this.props.selectLocation(this.props.location.id);
    this.props.setLatLngUi(this.props.location.lat, this.props.location.lng);
    // this.props.gmap.map.setCenter(ll);
    this.props.locationModal();
  },
  add(id) {
    console.log(id);

    this.props.addLocationToUser(id);
  },
});

export default Location;
