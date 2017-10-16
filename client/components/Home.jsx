import React from 'react';
import Menu from '../components/Menu';


import ModalLogIn from '../components/ModalLogIn';
import ProductsGridPublic from '../components/ProductsGridPublic';
import styled from 'styled-components';


const Home = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {},

  render() {
    return (
      <div>                                                    <ModalLogIn {...this.props} />


        <ProductsGridPublic {...this.props} />

      </div>);
  },

});

export default Home;
