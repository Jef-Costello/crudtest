import React from 'react';

const ProductPublic = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {},

  render() {
    const { product } = this.props;
    return (

      <figure className="grid-figure" >
        <div className="grid-photo-wrap">{product.name} </div>
        <div>{product.description}<br />
          <br />geplaatst door: {product.username}
        </div>
        <div className="groups">{product.groups.map(el => (<div className={el.groupname} key={el.groupid}>{el.groupname}</div>))} </div>


      </figure>
    );
  },
  onClickl() {
    this.props.selectProduct(this.props.product.id);
  },
});

export default ProductPublic;
