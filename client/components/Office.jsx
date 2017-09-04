import React from 'react';
import ProductsGrid from '../components/ProductsGrid';

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
        <div>
          <div>
            <br />
          </div>
          <div>

            <ProductsGrid {...this.props} />
          </div>

        </div>
      );
    } return (<div>PLease log in to access this page</div>);
  },
});

export default Office;
