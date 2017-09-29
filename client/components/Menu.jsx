import React from 'react';
import styled from 'styled-components';

const Button = styled.button`

height: 40px;
line-height: 40px;
white-space: nowrap;
margin-bottom: 10px;
box-shadow: 0 2px 2px #dddddd;
display: inline-block;
background-color: #fff;
padding: 0 16px;
width: 100%;
border-radius: 3px;
font-size: 15px;
text-align:left;
outline: 0;
-webkit-appearance: none;
    border: none;
&.selected{  border: none;background: #da943a;}
}
`;
const Vinkje = styled.div`
float:right;
width:20px;
height:100%;
margin-top: 4px;
img{width:20px}
`;
const SMenu = styled.div`
position:fixed;
width:25%;
height:100%;

float:left;
`;
const MenuInner = styled.div`
margin:50px 1em 0 0;
font-weight:600;
width:200px;
height:100%;

float:right;
`;
const Menu = React.createClass({


  login(that) {
    this.props.login(that.refs.name.value, that.refs.password.value);
  },
  componentDidMount() {},
  render() {
    let error;
    if (this.props.connection.loginerror !== 'none') { error = <div className="error" >{this.props.connection.loginerror} </div>; }
    return (
      <SMenu>
        <MenuInner>
          Producten<br /><br />
          <Button onClick={this.props.setPtFilter.bind(this, 0)} >groente{this.props.ui.ptfilterbuttons[0].value ? <Vinkje><img src="/web/img/vinkje.png" /></Vinkje> : ''}</Button>
          <Button onClick={this.props.setPtFilter.bind(this, 1)} >fruit{this.props.ui.ptfilterbuttons[1].value ? <Vinkje><img src="/web/img/vinkje.png" /></Vinkje> : ''}</Button>
          <Button onClick={this.props.setPtFilter.bind(this, 2)} >vlees & vis{this.props.ui.ptfilterbuttons[2].value ? <Vinkje><img src="/web/img/vinkje.png" /></Vinkje> : ''}</Button>
          <Button onClick={this.props.setPtFilter.bind(this, 3)} >zuivel{this.props.ui.ptfilterbuttons[3].value ? <Vinkje><img src="/web/img/vinkje.png" /></Vinkje> : ''}</Button>
        </MenuInner>

      </SMenu>
    );
  },
});

export default Menu;
