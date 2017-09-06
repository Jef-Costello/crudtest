import React from 'react';
import ProductPublic from '../components/ProductPublic';


// send through the props to photo and the index (not available through key)
const ProductsGridPublic = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {
    if (this.props.products.initialized === false) {
      this.props.getProductsPublic();
    }
  },
  render() {
    let modal;
    let modalnp;
    let noproducts;
    if (this.props.products.products[0] === undefined && this.props.products.initialized === true) { noproducts = <div className="noprod">nog geen producten</div>; }

    return (
      <div>

        {modal}
        {modalnp}

        <div className="photo-grid">
          <div className="photo-grid-header">
          producten:
          </div>

          {this.props.products.products.map((product, i) =>
            (<ProductPublic
              {...this.props}
              key={product.id}
              i={i}
              product={product}
              selectProduct={this.props.selectProduct}
            />))}
          {noproducts}

        </div>

      </div>
    );
  },
});

export default ProductsGridPublic;
