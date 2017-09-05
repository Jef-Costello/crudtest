import React from 'react';

const Product = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {},

  render() {
    const { product } = this.props;
    return (

      <figure className="grid-figure" >
        <div className="grid-photo-wrap">{product.name} </div>
        <div>{product.description} </div>
        <div className="groups">{product.groups.map(el => (<div className={el.groupname} key={el.groupid}>{el.groupname}</div>))} </div>

        <button onClick={this.onClickl}>bewerk</button>


      </figure>
    );
  },
  onClickl() {
    this.props.selectProduct(this.props.product.id);
  },
});

export default Product;
