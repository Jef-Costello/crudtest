import React from 'react';
import styled from 'styled-components';
import ModalLogIn from '../components/ModalLogIn';
import SupplierMap from '../components/SupplierMap';
import ProductPublic from '../components/ProductPublic';
import { Link } from 'react-router';
import Sicon from '../components/Icon';
import OpeningHours from '../components/OpeningHours';

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
bottom:0px;
    &.bouncey{position:initial;}
    &.search{float:none;margin:0;padding: 0px 4px 0px 8px;position:initial;}
`;

const SLink = styled(Link)`

padding-left:3px;
text-decoration:none;
font-size:16px;
color:#254022;
margin-top:50px;`;
const SubLocs = styled.div`
float:right;
width:25%;
height:100px; `;
const Icon = styled.span`
    font-size: 14px;
        color: #406f3a;
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
const ProductContainer = styled.div`
display: flex;
flex-wrap: wrap;
margin: 0 auto;
max-width: 1200px;
position:relative;




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
box-sizing:border-box;
`;
const Supplier = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.productsPublic.initialized === false) {
      this.props.getProductsPublic();
    }
    console.log(this.props.params);
    this.props.getLocationByUrl(this.props.params.url);
  },

  render() {
    let products;
    let sublocs;
    let prodcon;
    let map;
    if (this.props.locationsPublic.locationPage) {
      sublocs = this.props.locationsPublic.locationPage.location.sublocs.map(e=> (<div key={e.id}>
        <Title>{e.name}</Title><br />{
        }<br /> {e.address}</div>));
      sublocs = <SubLocs>afhaal locaties:<br />{sublocs}</SubLocs>;
    }
    if (this.props.locationsPublic.locationPage) {
      products = this.props.locationsPublic.locationPage.products.map((product, i) =>
          (<ProductPublic
            {...this.props}
            key={product.id}

            i={i}
            product={product}
            selectProduct={this.props.selectProduct}
          />));
    }
    if (this.props.ui.showmap) {
      map = <SupplierMap {...this.props} />;
    } else {
      prodcon = (<ProductContainer>


        {products}
      </ProductContainer>);
    }

    if (this.props.locationsPublic.locationPage) {
      return (<div>
        <ProductContainer>                                                                                                                                                                                                                                                                      <SLink activeClassName="active" to={`${this.props.connection.root}/web/app_dev.php`}><Sicon>{ String.fromCharCode(0xe80f)}</Sicon>terug</SLink>
          <Ssupplier>
            <ImgContainer><Imghlp />
              <img src={`${this.props.connection.root}/web/${this.props.locationsPublic.locationPage.location.imgurl}`} /></ImgContainer>
            <TextContainer>
              <Title>{this.props.locationsPublic.locationPage.location.name}</Title><br />
              {this.props.locationsPublic.locationPage.location.description}
              <OpeningHours location={this.props.locationsPublic.locationPage.location} />
              {sublocs}
              <br /><br />
              <Icon>{ String.fromCharCode(0xe808)}</Icon> {this.props.locationsPublic.locationPage.location.address}
            </TextContainer>
            <Button onClick={this.props.showMap}><Icon>{this.props.ui.showmap ? String.fromCharCode(0xe80b) : String.fromCharCode(0xe808)}</Icon>kaart</Button>

          </Ssupplier>                                                                                                                                                                                                                                                                                                  </ProductContainer>

        <ModalLogIn {...this.props} />
        {map}{prodcon}
      </div>);
    }
    return null;
  },

});

export default Supplier;
