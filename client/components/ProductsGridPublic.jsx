import React from 'react';
import ProductPublic from '../components/ProductPublic';
import styled from 'styled-components';

const ProductContainer = styled.div`
display: flex;
flex-wrap: wrap;
width:75%;
max-width: 900px;
position:relative;
left:25%;
top: 50px;

`;

// send through the props to photo and the index (not available through key)
const ProductsGridPublic = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {
    if (this.props.productsPublic.initialized === false) {
      this.props.getProductsPublic();
    } // else this.props.getProductsByDistance();
  },
  render() {
    let products;

    if (this.props.filteredProducts.filtered.length > 0) {
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
      <div>


        <ProductContainer>


          {products}


        </ProductContainer>

      </div>
    );
  },
});

export default ProductsGridPublic;
