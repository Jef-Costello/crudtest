import React from 'react';
import styled from 'styled-components';
import ModalLogIn from '../components/ModalLogIn';
import ProductPublic from '../components/ProductPublic';

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

top: 50px;


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
    if (this.props.locationsPublic.locationPage) {
      return (<div>

        <ModalLogIn {...this.props} />
        <br />

        <ProductContainer>
          <Ssupplier>
            <ImgContainer><Imghlp />
              <img src={`/web/${this.props.locationsPublic.locationPage.location.imgurl}`} /></ImgContainer>
            <TextContainer>
              <Title>{this.props.locationsPublic.locationPage.location.name}</Title><br />
              {this.props.locationsPublic.locationPage.location.description}
              <br /><br />
              <Icon>{ String.fromCharCode(0xe808)}</Icon> {this.props.locationsPublic.locationPage.location.address}
            </TextContainer>


          </Ssupplier>
          {products}
        </ProductContainer></div>);
    }
    return null;
  },

});

export default Supplier;
