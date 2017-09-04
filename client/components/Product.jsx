import React from 'react';

const Product = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {},

  render() {
    const { product } = this.props;
    return (

      <figure className="grid-figure" >
        <div className="grid-photo-wrap">{product.name} (id={product.id})</div>
        <div>{product.description} </div>
        <div>{product.groups.map((el) => el.groupname) } </div>

        <button onClick={this.onClickl}>select</button>


      </figure>
    );
  },
  onClickl() {
    this.props.selectProduct(this.props.product.id);
  },
});

export default Product;
