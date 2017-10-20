import React from 'react';
import ProductPublic from '../components/ProductPublic';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import Homemap from '../components/Homemap';
import styled from 'styled-components';

const ProductContainerInner = styled.div`
display: flex;width:100%;
flex-direction: row;
    align-content: flex-start;
flex-wrap: wrap;`;
const ProductContainer = styled.div`
display: flex;


position:relative;

/* Custom, iPhone Retina */
  @media only screen and (min-width : 320px) {width:100%;

  }

  /* Extra Small Devices, Phones */
  @media only screen and (min-width : 480px) {width:100%;

  }

  /* Small Devices, Tablets */
  @media only screen and (min-width : 768px) {

  }

  /* Medium Devices, Desktops */
  @media only screen and (min-width : 992px) {

  }

  /* Large Devices, Wide Screens */
  @media only screen and (min-width : 1200px) {margin: 0 auto;left:0px;left:0;
  max-width: 1650px;min-width:75%;

  }


`;

// send through the props to photo and the index (not available through key)
const ProductsGridPublic = React.createClass({
  handleScroll() {
    const winHeight = window.innerHeight;

     // Annoying to compute doc height due to browser inconsistency
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight,
                     html.clientHeight, html.scrollHeight, html.offsetHeight);

    const value = html.scrollTop;
    console.log(value);
    this.props.setScroll(value);
  },
  componentDidUpdate() { },
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    if (this.props.productsPublic.initialized === false) {
      this.props.getProductsPublic();
    } // else this.props.getProductsByDistance();
  },
  render() {
    let products;
    let maptoggle;
    if (this.props.ui.showmap) { maptoggle = <Homemap{...this.props} />; }
    if (this.props.filteredProducts.filtered.length > 0 && !this.props.ui.showmap) {
      products = this.props.filteredProducts.filtered.map((product, i) =>
        (<ProductPublic
          {...this.props}
          key={product.id}
          i={i}
          product={product}
          selectProduct={this.props.selectProduct}
        />));
    }
    return (
      <div >
        <Hero {...this.props} />
        {maptoggle}
        <ProductContainer><Menu {...this.props} />
          <ProductContainerInner>


            {products}


          </ProductContainerInner>
        </ProductContainer>
      </div>
    );
  },
});

export default ProductsGridPublic;
