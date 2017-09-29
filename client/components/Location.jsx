import React from 'react';
import styled from 'styled-components';

const Button = styled.button`

height: 40px;
line-height: 40px;
white-space: nowrap;
margin: 10px;
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
const SLocation = styled.figure`
color: #324430;
font-family:'Open Sans',sans-serif;
font-size:10px;
font-weight:600;
flex-basis: calc(30% - 4rem);
flex-grow: 0;
flex-shrink: 0;
margin: 0 0rem 1rem 1rem;
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
        <div className="grid-photo-wrap">{location.name} </div>
        <div className="description">{location.description.split('\n').map((item, key) => <span key={key}>{item}<br /></span>)} </div>
        <div>{location.address} </div>


        <Button onClick={this.onClickl}>bewerk</Button>


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
});

export default Location;
