import React from 'react';
import ProductsGrid from '../components/ProductsGrid';
import Google from '../components/Google';
import styled from 'styled-components';

const Maincontainer = styled.div`

height:100%;
margin-top:20px;
`;

const Office = React.createClass({
  newproduct(that) {
    this.props.newProduct(
      this.props.connection.token,
      that.refs.pname.value,
      that.refs.description.value,
    );
  },
  login(that) {
    this.props.login(that.refs.name.value, that.refs.password.value);
  },

  componentDidMount() {},

  render() {
    if (this.props.connection.loggedin === true) {
      return (
        <Maincontainer>

          <Google {...this.props} />
          <ProductsGrid {...this.props} />


        </Maincontainer>
      );
    } return (<div>PLease log in to access this page</div>);
  },
});

export default Office;
