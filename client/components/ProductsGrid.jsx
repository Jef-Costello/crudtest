import React from 'react';
import Product from '../components/Product';
import Modalprodedit from '../components/Modalprodedit';
// import Productnew from '../components/Productnew';
import Modalnp from '../components/Modalnp';
import styled from 'styled-components';

const ProductContainer = styled.div`
display: flex;
flex-wrap: wrap;
max-width: 900px;
position:relative;
left:25%;
top: 50px;

`;
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
const SMenu = styled.div`
position:fixed;
width:25%;
height:100%;

float:left;
`;
const MenuInner = styled.div`
margin:50px 1em 0 0;

width:200px;
height:100%;

float:right;
`;
// send through the props to photo and the index (not available through key)

const ProductsGrid = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {
    if (this.props.user.initialized === false) this.props.initialize();
  //  if (this.props.products.initialized === false) {
  //    this.props.getProducts();
  //  }
  },
  render() {
    let modal;
    // let modalnp;
    let noproducts;
    let prodloc;
    let products;
    if (this.props.products.products[0] === undefined && this.props.products.initialized === true) { noproducts = <div className="noprod">nog geen producten</div>; }
    if (Object.keys(this.props.getProducerLocation).length === 0 && this.props.getProducerLocation.constructor === Object) { prodloc = <div>om producten toe te voegen dien je eerst een locatie aan te maken</div>; }
    // if (this.props.ui.modal === true) { modal = <Productsingle {...this.props} />; }
    if (this.props.producttypes.all.length != 0) {
      products = this.props.products.products.map((product, i) =>
      (<Product
        {...this.props}
        key={product.id}
        i={i}
        product={product}
        selectProduct={this.props.selectProduct}
      />));
    }
    return (
      <div>

        <Modalprodedit {...this.props} />
        <Modalnp {...this.props} />
        <SMenu>
          <MenuInner>
            <Button onClick={this.props.newProductModal} className="likes">+ nieuw product</Button>
          </MenuInner>
        </SMenu>
        <ProductContainer>


          {products}
          {noproducts}
          {prodloc}

        </ProductContainer>

      </div>
    );
  },
});

export default ProductsGrid;
