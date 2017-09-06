import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import TopBar from '../components/TopBar';
import User from '../components/User';
import ProductsGridPublic from '../components/ProductsGridPublic';

class Secondary extends React.Component {

  componentDidMount() {

  }
  componentDidUpdate() {

  }
  render() {
    if (this.props.connection.loggedin === true) {
      return (
        <div>
          <TopBar {...this.props} />

          <br />
          <br />
          <br />
          <h1>react app met symfony backend</h1>
          <ProductsGridPublic {...this.props} /></div>);
    }
    return (
      <div>
        <div>
          <br />
          <br />
          <br />

          <div />
        </div>
        <TopBar {...this.props} />
        <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500} transitionLeaveTimeout={500} />
        <User {...this.props} />
        <ProductsGridPublic {...this.props} />
        secondary
      </div>
    );
  }
}

export default Secondary;
