import React from 'react';
import Menu from '../components/Menu';


import ModalLogIn from '../components/ModalLogIn';
import ProductsGridPublic from '../components/ProductsGridPublic';
import styled from 'styled-components';

const Container = styled.div`width:100%`;
const Home = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {},

  render() {
    return (
      <Container>                                                              <ModalLogIn {...this.props} />


        <ProductsGridPublic {...this.props} />

      </Container>);
  },

});

export default Home;
