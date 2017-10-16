import React from 'react';
import styled from 'styled-components';

const SProduct = styled.figure`
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
const Pname = styled.div`
font-family: 'Open Sans', sans-serif;
font-size:15px;`;
const Button = styled.button`
font-family:Open Sans,sans-serif;
height: 40px;
line-height: 37px;
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
}
`;
const Product = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {},
  idtoindex(id) {
    return (this.props.producttypes.all.map((el) => el.id).indexOf(id));
  },
  render() {
//  <img alt={product.name} src={(product.ptype != null && this.props.producttypes.all.length > 0) ? `${this.props.connection.root}/web/${this.props.producttypes.all[this.idtoindex(product.ptype)].imgurl}` : ''} />;
    const { product } = this.props;
    let img;
    if (!product.usecustomimage && this.props.producttypes.all.map((el) => el.id).indexOf(this.props.product.ptype) != -1) {
      img =
        <img alt={product.name} src={(product.ptype != null && this.props.producttypes.all.length > 0) ? `${this.props.connection.root}/web/${this.props.producttypes.all[this.idtoindex(product.ptype)].imgurl}` : ''} />;
    } else { img = <img alt={product.name} src={(product.ptype != null && this.props.producttypes.all.length > 0) ? `${this.props.connection.root}/web/${product.imgurl}` : ''} />; }

    return (

      <SProduct>{img}
        <Pname>{product.name}</Pname>
        {product.subtitle}<br />
        E{product.price}{product.pricetype}<br />

        {product.locations.map((loc) => (loc.type === 'Primary' ? <div key={loc.id}>van: {loc.name} </div> : ''))}
        <div className="groups">{product.groups.map(el => (<div className={el.groupname} key={el.groupid}>{el.groupname}</div>))} </div>

        <Button onClick={this.onClickl}>bewerk</Button>


      </SProduct>
    );
  },
  onClickl() {
    this.props.selectProduct(this.props.product.id);
  },
});

export default Product;
