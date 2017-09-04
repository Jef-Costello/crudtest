import React from 'react';


const Profiel = React.createClass({

  render() {
    return (
      <div className="profiel">
        jouw gegevens<br />
      naam:{this.props.connection.user.name}<br />
    email:{this.props.connection.user.email}
        <button onClick={this.props.logOut}>uitloggen</button>
      </div>
    );
  },
});

export default Profiel;
