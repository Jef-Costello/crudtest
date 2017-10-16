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
position:absolute;
right:10px;bottom:10px;
border-radius: 3px;
font-size: 15px;
text-align:left;
outline: 0;
-webkit-appearance: none;
    border: none;
&.selected{  border: none;background: #da943a;}
}
`;
const Title = styled.span`font-size:15px;`;
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
const ExtLocation = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {},

  render() {
    // <div className="description">{location.description.split('\n').map((item, key) => <span key={key}>{item}<br /></span>)} </div><br />
    const { location } = this.props;
    return (

      <SLocation>
        <Title>                                                                        {location.name}</Title><br />

        <div>{location.address} </div><br />


        {this.props.locations.dlocations.map((e)=> e.id).indexOf(location.id) != -1 ? <Button onClick={this.remove.bind(this, location.id)}>verwijder uit lijst</Button> : <Button onClick={this.add.bind(this, location.id)}>voeg toe aan lijst</Button>}


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
  remove(id) {
    console.log(id);

    this.props.removeLocationFromUser(id);
  },
});

export default ExtLocation;
