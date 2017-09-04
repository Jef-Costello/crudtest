import React from 'react';


const User = React.createClass({


  login(that) {
    this.props.login(that.refs.name.value, that.refs.password.value);
  },
  componentDidMount() {},
  render() {
    let error;
    if (this.props.connection.loginerror !== 'none') { error = <div className="error" >{this.props.connection.loginerror} </div>; }
    return (
      <div className="user">
        naam:
        <input ref="name" type="text" />
        <br />
        wachtwoord:
        <input ref="password" type="text" />
        <br />

        <br />
        {error}<br />
        <button onClick={this.login.bind(this, this)} className="likes">Log in
                </button>


      </div>
    );
  },
});

export default User;
