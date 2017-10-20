import React from 'react';

import Location from '../components/Location';
import ExtLocation from '../components/ExtLocation';
import Locationedit from '../components/Locationedit';

import AddressInput from '../components/AddressInput';
import Modallocation from '../components/Modallocation';
import Modalnewlocation from '../components/Modalnewlocation';
import Modalnewsublocation from '../components/Modalnewsublocation';
import Icon from '../components/Icon';
import styled from 'styled-components';

const ProductContainer = styled.div`
display: flex;
flex-wrap: wrap;
width:75%;
max-width: 900px;
position:relative;
margin:1rem auto 0 auto;
top: 50px;
font-family:Open Sans,sans-serif;
font-size:1rem;
width:100%;
line-height: 1rem;

`;
const ImgContainer = styled.div`
width:33.333%;
position:absolute;
height: 100%;
vertical-align:middle;

display:inline-block;

img{width:100%;vertical-align: middle;}
`;
const Imghlp = styled.span`
vertical-align:middle;
height:100%;
display:inline-block;

`;

const TextContainer = styled.div`
padding:25px;
position:absolute;
width:66.6666%;
right:0px;
`;
const Title = styled.span`
font-size:20px;
color:#252525;
`;
const Ssupplier = styled.div`
text-decoration:none;
color: #899c87;
font-family:'Open Sans',sans-serif;
font-size:10px;
font-weight:600;
flex:1;
flex-grow:0;
height:300px;


border: 1px solid #edeeed;
background: #fff;

position: relative;
flex-basis:100%;
box-sizing:border-box;`;
const Block = styled.div`
position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;

    background: rgba(0, 0, 0, 0.43);
    z-index: 8;
`;
const MyLocations = styled.div`
display: flex;
flex-wrap: wrap;
width:50%;
align-content:flex-start;



font-family:Open Sans,sans-serif;
font-size:1rem;

line-height: 1rem;

`;
const ExtLocations = styled.div`
display: flex;
flex-wrap: wrap;
width:100%;
align-content:flex-start;



font-family:Open Sans,sans-serif;
font-size:1rem;

line-height: 1rem;

`;
const AllLocations = styled.div`
display: flex;
flex-wrap: wrap;
width:50%;
align-content:flex-start;

top: 50px;
font-family:Open Sans,sans-serif;
font-size:1rem;

line-height: 1rem;

`;
const Section = styled.div`
display: flex;
flex-wrap: wrap;
background: #f1f1f1;
width: 100%;
border: 1px solid #e1e1e1;
padding:5px;
box-sizing: border-box;

`;
const SectionHeader = styled.div`
display: flex;
flex-wrap: wrap;
background: #f1f1f1;
width: 100%;
border: 1px solid #e1e1e1;
padding:5px;
box-sizing: border-box;

`;
const Button = styled.button`

height: 40px;
line-height: 40px;
white-space: nowrap;
margin: 10px;
box-shadow: 0 2px 2px #dddddd;
display: block;
background-color: #fff;
padding: 0 16px;
float:right;
border-radius: 3px;
font-size: 15px;
text-align:left;
outline: 0;
position:relative;z-index:3;
-webkit-appearance: none;
    border: none;
&.selected{  border: none;background: #da943a;}
&.edit{float:right;position:relative;z-index:3;padding:0px;box-shadow:none;}
}
`;
const Profiel = React.createClass({

  componentDidMount() {
    if (this.props.user.initialized === false) this.props.initialize();
  //  this.props.getUser();
  //  if (!this.props.locations.initialized) {
    //  this.props.getLocations();
    // }
  },
  onClickl() {
  //  const ll = new google.maps.LatLng(this.props.location.lat, this.props.location.lng);
    this.props.selectLocation(this.props.getProducerLocation.id);
    this.props.setLatLngUi(this.props.getProducerLocation.lat, this.props.getProducerLocation.lng);
    // this.props.gmap.map.setCenter(ll);
    this.props.locationModal();
  },

  render() {
    let loc,
      block,
      locedit,
      addressinput;
    let pl;
    if (this.props.connection.loading)block = <Block />;
    if (this.props.getProducerLocation.id != null) {
      pl = (<Section> Hoofd/productie locatie: <br />

        <Ssupplier>
          <ImgContainer><Imghlp />
            <img src={`${this.props.connection.root}/web/${this.props.getProducerLocation.imgurl}`} /></ImgContainer>
          <TextContainer>
            <Title>{this.props.getProducerLocation.name}</Title><br />
            {this.props.getProducerLocation.description}
            <br /><br />
            <Icon>{ String.fromCharCode(0xe808)}</Icon> {this.props.getProducerLocation.address}
          </TextContainer>
          <Button className="edit" onClick={this.onClickl}>                                                                                                                                    <Icon>{ String.fromCharCode(0xe800)}</Icon></Button>

        </Ssupplier>


      </Section>);
    } else { pl = <div>Je hebt (nog) geen productie locatie opgegeven <br /><Button onClick={this.props.openNewLocationModal}>productie locatie toevoegen</Button></div>; }

    // if (this.props.ui.modallocation) { locedit = <Locationedit {...this.props} />; }
    return (
      <ProductContainer>
        {block}
        <Modallocation {...this.props} />
        <Modalnewlocation {...this.props} />
        <Modalnewsublocation {...this.props} />
        <Section>
        jouw gegevens<br />
      naam:{this.props.user.name}<br />
    email:{this.props.user.email}<br /><Button onClick={this.props.logOut}>uitloggen</Button>
        </Section>

        {pl}

        <Button onClick={this.props.openNewSublocationModal}>afhaal locatie toevoegen</Button>
        <Section>


          <MyLocations><SectionHeader>afhaal locaties mijn beheer</SectionHeader>

            {this.props.locations.all.map((location) => ((location.type === 'Secondary' && location.userid == this.props.user.userid) ? <Location {...this.props} location={location} key={location.id} /> : ''))}
            <ExtLocations><SectionHeader>afhaallocaties extern beheerd</SectionHeader>

              {this.props.locations.all.map((location) => ((this.props.locations.dlocations.map((e)=> e.id).indexOf(location.id) !== -1 && location.userid != this.props.user.userid) ? <ExtLocation {...this.props} location={location} key={location.id} /> : ''))}
            </ExtLocations>
          </MyLocations>

          <AllLocations><SectionHeader>extern beheerde locaties</SectionHeader>
            {this.props.locations.all.map((location) => ((location.userid != this.props.user.userid && this.props.locations.dlocations.map((e)=> e.id).indexOf(location.id) == -1) ? <ExtLocation {...this.props} location={location} key={location.id} /> : ''))}
          </AllLocations>
        </Section>

      </ProductContainer>
    );
  },
});

export default Profiel;
