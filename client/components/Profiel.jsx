import React from 'react';

import Location from '../components/Location';
import Locationedit from '../components/Locationedit';

import AddressInput from '../components/AddressInput';
import Modallocation from '../components/Modallocation';
import Modalnewlocation from '../components/Modalnewlocation';
import Modalnewsublocation from '../components/Modalnewsublocation';
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

line-height: 1rem;

`;
const Section = styled.div`
;
background: #f1f1f1;
width: 100%;
border: 1px solid #e1e1e1;
padding: 20px;
margin: 10px;
box-sizing: border-box;

`;
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
const Profiel = React.createClass({

  componentDidMount() {
    if (this.props.user.initialized === false) this.props.initialize();
  //  this.props.getUser();
  //  if (!this.props.locations.initialized) {
    //  this.props.getLocations();
    // }
  },

  render() {
    let loc,
      locedit,
      addressinput;
    let pl;
    if (this.props.getProducerLocation.id != null) {
      pl = <Section> Primaire locatie: <br /><Location {...this.props} location={this.props.getProducerLocation} /></Section>;
    } else { pl = <div>Je hebt (nog) geen productie locatie opgegeven <br /><Button onClick={this.props.openNewLocationModal}>productie locatie toevoegen</Button></div>; }

    // if (this.props.ui.modallocation) { locedit = <Locationedit {...this.props} />; }
    return (
      <ProductContainer>

        <Section>
        jouw gegevens<br />
      naam:{this.props.user.name}<br />
    email:{this.props.user.email}<br />
        </Section>
        <Section>
          {pl}
        </Section>
        <Section>
          <Button onClick={this.props.openNewSublocationModal}>afhaal locatie toevoegen</Button>

          <Modallocation {...this.props} />
          <Modalnewlocation {...this.props} />
          <Modalnewsublocation {...this.props} />
          <div className="locations">
            {this.props.locations.all.map((location) => ((location.type === 'Secondary') ? <Location {...this.props} location={location} key={location.id} /> : ''))}</div>
        </Section>
        <Button onClick={this.props.logOut}>uitloggen</Button>
      </ProductContainer>
    );
  },
});

export default Profiel;
