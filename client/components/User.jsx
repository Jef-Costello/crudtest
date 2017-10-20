import React from 'react';

import styled from 'styled-components';

const ModalInner = styled.div`
padding: 2rem 2rem 2rem 2rem;

background: white;

img{width:100px;}
`;
const Button = styled.button`

height: 40px;
line-height: 40px;
white-space: nowrap;
margin: 10px 10px 0 0;
box-shadow: 0 2px 2px #dddddd;
display: inline-block;
background-color: #fff;
padding: 0 16px;

border-radius: 3px;
font-size: 15px;
text-align:left;
outline: 0;
-webkit-appearance: none;
    border: none;
&.selected{  border: none;background: #da943a;}
}
`;
const User = React.createClass({

  enter(e) {
    if (e.keyCode === 13) { this.props.login(this.refs.name.value, this.refs.password.value); }
  },
  login(that) {
    this.props.login(that.refs.name.value, that.refs.password.value);
  },
  componentDidMount() { this.refs.name.focus(); },
  render() {
    let error;
    if (this.props.connection.loginerror !== 'none') { error = <div className="error" >{this.props.connection.loginerror} </div>; }
    return (
      <ModalInner>
        naam:<br />
        <input ref="name" type="text" autoCorrect="off" autoCapitalize="none" />
        <br />
        wachtwoord:<br />
        <input ref="password" type="password" onKeyUp={(e)=> this.enter(e)} />
        <br />

        <br />
        {error}<br />
        <Button onClick={this.login.bind(this, this)} className="likes">Log in
      </Button>


      </ModalInner>
    );
  },
});

export default User;
