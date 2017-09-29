import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import TopBar from '../components/TopBar';
import Gmap from '../components/Gmap';
import User from '../components/User';
import Menu from '../components/Menu';
import Homemap from '../components/Homemap';
import Modallocation from '../components/Modallocation';
import ModalLogIn from '../components/ModalLogIn';
import ProductsGridPublic from '../components/ProductsGridPublic';
import styled from 'styled-components';

const Maincontainer = styled.div`

height:100%;
margin-top:20px;
`;

class Secondary extends React.Component {

  componentDidMount() {

  }
  componentDidUpdate() {

  }
  render() {
    if (this.props.connection.loggedin === true) {
      return (
        <Maincontainer>
          <TopBar {...this.props} />
          <Homemap{...this.props} />
          <Menu {...this.props} />

          <ProductsGridPublic {...this.props} />

        </Maincontainer>);
    } return (
      <Maincontainer>
        <TopBar {...this.props} />

        <Homemap{...this.props} />
        <Menu {...this.props} />
        <ModalLogIn {...this.props} />
        <ProductsGridPublic {...this.props} />

      </Maincontainer>);
  }
}

export default Secondary;
