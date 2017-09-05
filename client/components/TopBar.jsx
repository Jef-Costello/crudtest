import React from 'react';

import { Link } from 'react-router';

const TopBar = React.createClass({


  componentDidMount() {},
  render() {
    let refreshing;
    let loading;
    const opt = (<span>
      <Link className="navbutton" to="/web/app_dev.php">home</Link>
      <Link className="navbutton" to="/web/app_dev.php/office">mijn producten</Link>
      <Link className="navbutton" to="/web/app_dev.php/profiel">profiel</Link></span>
    );
    if (this.props.connection.refreshing === true) { refreshing = <div className="refreshing">..refreshing token..</div>; }
    if (this.props.connection.loading === true) { loading = <div className="spinner" />; }
    if (this.props.connection.loggedin === true) {
      return (
        <div className="TopBar">
          <div className="TopBarName"> {this.props.connection.user.name}{opt}{refreshing}{loading}</div>


        </div>
      );
    } return (

      <div className="TopBar">
        <div className="TopBarName">logged out{loading}</div>
      </div>

    );
  },
});

export default TopBar;
