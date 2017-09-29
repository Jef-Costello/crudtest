import React from 'react';
import User from '../components/User';
import TopBar from '../components/TopBar';
import Product from '../components/ProductsGrid';
import styled from 'styled-components';

const Maincontainer = styled.div`

height:100%;
`;

const Home = React.createClass({
  componentDidMount() {
    console.log('de');
  },
  render() {
    if (this.props.connection.loggedin === true) {
      return (
        <Maincontainer>
          <TopBar {...this.props} /><h1>react app met symfony backend</h1>
          {this.props.products.products.map((product, i) =>
            (<Product
              {...this.props}
              key={product.id}
              i={i}
              product={product}
              selectProduct={this.props.selectProduct}
            />))}

        </Maincontainer>

      );
    }
    return (
      <div> <TopBar {...this.props} />
        <div>
          <br />
          <br />
          <br />

          <div />
        </div>

        <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500} transitionLeaveTimeout={500} />
        <User {...this.props} />
        secondary
      </div>
    );
  },
});

export default Home;
