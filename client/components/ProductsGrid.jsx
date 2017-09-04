import React from 'react';
import Product from '../components/Product';
import Productsingle from '../components/Productsingle';
import Productnew from '../components/Productnew';

// send through the props to photo and the index (not available through key)
const ProductsGrid = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {
    if (this.props.products.initialized === false) {
      this.props.getProducts();
    }
  },
  render() {
    let modal;
    let modalnp;
    let noproducts;
    if (this.props.products.products[0] === undefined && this.props.products.initialized === true) { noproducts = <div className="noprod">nog geen producten</div>; }
    if (this.props.ui.modal === true) { modal = <Productsingle {...this.props} />; }
    if (this.props.ui.modalnp === true) { modalnp = <Productnew {...this.props} />; }
    return (
      <div>

        {modal}
        {modalnp}

        <div className="photo-grid">
          <div className="photo-grid-header">
            <button onClick={this.props.newProductModal} className="likes">add product</button>
          </div>

          {this.props.products.products.map((product, i) =>
            (<Product
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

export default ProductsGrid;
