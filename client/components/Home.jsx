import React from 'react';
import User from '../components/User';
// send through the props to photo and the index (not available through key)
const Home = React.createClass({

  render() {
    let user;
    if (this.props.connection.loggedin === true) { return (<div ><h1>react app met symfony backend</h1></div>); }
    return (
      <div >
        <h1>react app met symfony backend</h1>

        <User {...this.props} />

      </div>
    );
  },
});

export default Home;
