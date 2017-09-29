import React from 'react';
import styled from 'styled-components';

const SProduct = styled.figure`
color: #324430;
font-family:'Open Sans',sans-serif;
font-size:10px;
font-weight:600;
flex-basis: calc(16% + 4rem);
flex-grow: 0;
flex-shrink: 0;
margin: 0 0rem 1rem 1rem;
padding: 1rem;
border: 1px solid #edeeed;
background: #fff;
box-shadow: 0 0 14px 10px rgba(0,0,0,0.03);
position: relative;
img.vinkje{width:10px;height:10px;opacity:0.5}
`;
const Pname = styled.div`
font-family: 'Open Sans', sans-serif;
font-size:15px;`;
const ProductPublic = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {},
  idtoindex(id) {
    return (this.props.producttypes.all.map((el) => el.id).indexOf(id));
  },
  render() {
    const { product } = this.props;
    return (

      <SProduct>
        <img alt={product.name} src={(product.ptype != null && this.props.producttypes.all.length > 0) ? `/web/${this.props.producttypes.all[this.idtoindex(product.ptype)].imgurl}` : ''} />
        <Pname>{product.name} </Pname>
        <div>{product.description}<br />

          <br />{product.locations.length > 1 ? 'dichtst bij : ' : 'afstand : '}{Math.round(product.distance)}km<br />
          {product.locations.length} {product.locations.length > 1 ? 'locaties' : 'locatie'}<br />
          {product.locations.map((loc) => (loc.type === 'Primary' ? <div key={loc.id}>van: {loc.name} </div> : ''))}
        </div>
        <div className="groups">{product.groups.map(el => (<div className={el.groupname} key={el.groupid}><img className="vinkje" src="/web/img/vinkje.png" />{el.groupname}</div>))} </div>


      </SProduct>
    );
  },
  onClickl() {
    this.props.selectProduct(this.props.product.id);
  },
});

export default ProductPublic;
