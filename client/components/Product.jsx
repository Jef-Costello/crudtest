import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const Discount = styled.div`
transform: rotate(-3deg);
background:#ff8000;
padding:3px;
color:white;
position:absolute;
top:10%;
left:5%;
font-size:12px;
font-weight:700;
text-transform: uppercase;

`;
const EditButton = styled.button`
position:absolute;
top:10px;
right:10px;
outline: 0;
-webkit-appearance: none;
border: none;
background:white;

`;
const ImgContainer = styled.div`
width:100%;height:50%`;
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
const SProduct = styled.div`
word-break:break-word;
text-decoration:none;
color: #899c87;
font-family:'Open Sans',sans-serif;
font-size:10px;
font-weight:600;
flex:1;
flex-grow:0;
height:300px;
padding:15px 15px;

border: 1px solid #edeeed;
background: #fff;

position: relative;
flex-basis:16vw;
box-sizing:border-box;
img.vinkje{width:10px;height:10px;opacity:0.5}
img{    max-height: 100%;
    max-width: 100%;width:auto;margin:auto;display:block;}
/* Custom, iPhone Retina */
  @media only screen and (min-width : 320px) {flex-basis:100%;

  }

  /* Extra Small Devices, Phones */
  @media only screen and (min-width : 480px) {flex-basis:50%;

  }

  /* Small Devices, Tablets */
  @media only screen and (min-width : 768px) {flex-basis:33%;

  }

  /* Medium Devices, Desktops */
  @media only screen and (min-width : 992px) {flex-basis:25%;

  }

  /* Large Devices, Wide Screens */
  @media only screen and (min-width : 1200px) {flex-basis:16.6666%;

  }


`;
const Pname = styled.span`
color:#252525;
font-family: 'Open Sans', sans-serif;
font-size:15px;font-weight:700;`;
const Price = styled.span`    float: right;
    line-height: 16px;

    font-family: 'Open Sans',sans-serif;
    color: #406f3a;
    font-weight: 800;
    font-size: 20px;
    top: 35%;
    right: 5%;`;
const PriceType = styled.span`

font-family: 'Open Sans',sans-serif;
color: #406f3a;
font-weight: 700;
font-size: 12px;
  `;
const Subtitle = styled.div`

font-family: 'Open Sans',sans-serif;
/* color: #b5b5b5; */
font-weight: 600;
font-style: italic;
font-size: 11px;
    `;

const Product = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {},
  idtoindex(id) {
    return (this.props.producttypes.all.map((el) => el.id).indexOf(id));
  },

  //  console.log(id);
// this.props.locationsPublic.all.length>0?this.props.locationsPublic.all[this.idtoindex(product.ptype)].url}

  render() {
    const { product } = this.props;
    let img;
    let discount;
    if (product.highlighted != '0' && product.highlighted != '') { discount = <Discount>{product.highlighted}</Discount>; }
    if (!product.usecustomimage && this.props.producttypes.all.map((el) => el.id).indexOf(this.props.product.ptype) != -1) {
      img =
        <img alt={product.name} src={(product.ptype != null && this.props.producttypes.all.length > 0) ? `${this.props.connection.root}/web/${this.props.producttypes.all[this.idtoindex(product.ptype)].imgurl}` : ''} />;
    } else { img = <img alt={product.name} src={(product.ptype != null && this.props.producttypes.all.length > 0) ? `${this.props.connection.root}/web/${product.imgurl}` : ''} />; }
    return (

      <SProduct >
        <EditButton onClick={this.onClickl}><Icon>{ String.fromCharCode(0xe800)}</Icon></EditButton>
        {discount}
        <ImgContainer>
          {img}
          <Price>{`${product.price} `}</Price>
        </ImgContainer>

        <Pname>{product.name} </Pname>
        <div> <Subtitle>{product.subtitle}</Subtitle>
          <PriceType>{product.pricetype}</PriceType><br />

          <br /><Icon>{ String.fromCharCode(0xe808)}</Icon>{product.locations.length > 1 ? 'dichtst bij : ' : 'afstand : '}{Math.round(product.distance)}km<br />

          {product.locations.map((loc) => (loc.type === 'Primary' ? <div key={loc.id}><Icon>{ String.fromCharCode(0xe809)}</Icon>{loc.name}</div> : ''))}

        </div>
        <div className="groups">{product.groups.map(el => (<div className={el.groupname} key={el.groupid}><Icon>{ String.fromCharCode(0xe805)}</Icon>{el.groupname}</div>))} </div>


      </SProduct>
    );
  },
  onClickl() {
    this.props.selectProduct(this.props.product.id);
  },
});

export default Product;
Product.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
