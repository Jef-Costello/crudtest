import React from 'react';
import styled from 'styled-components';
import SIcon from '../components/Icon';

const Sicon = styled(SIcon)`
float:right;
@media only screen and (min-width : 660px) {display:none;

}
`;
const Button = styled.button`

height: 30px;
line-height: 30px;
white-space: nowrap;
margin-bottom: 5px;
margin-left:7%;
box-shadow: 0 2px 2px #dddddd;
display: inline-block;
background-color: #fff;
padding: 0 7px;
width: 100%;
border-radius: 3px;
font-size: 15px;
text-align:left;
outline: 0;
-webkit-appearance: none;
    border: none;
&.selected{  border: none;background: #da943a;}
img{width:15px;margin-right:10px;}
&.close{width:auto;box-shadow:none;float:right;background:transparent;padding:0px;}
`;
const Vinkje = styled.div`
float:right;
width:20px;
height:100%;
margin-top: 4px;
img{width:20px}
`;
const SMenu = styled.div`

position: fixed;
top:0px;
background:white;
height:100%;
z-index:3;
overflow-y:scroll;
input{margin-left:10px;}
display:${props => props.showmenu ? 'block' : 'none'};
box-shadow: 0 2px 2px #dddddd;
@media only screen and (min-width : 660px) {box-shadow:none;
display:flex;position:relative;background:transparent;overflow-y:hidden;

}

`;
const MenuInner = styled.div`
margin:50px 1em 0 0;
font-weight:600;
width:200px;
height:100%;
padding:7px;
float:right;
`;
const MenuHeader = styled.div`
margin:50px 0 0 0;`;

const Menu = React.createClass({


  login(that) {
    this.props.login(that.refs.name.value, that.refs.password.value);
  },
  searchChange() { this.props.setSearchTerm(this.searchterm.value); },
  componentDidMount() {},
  componentDidUpdate() { },
  render() {
    let error;
    let labels;
    if (this.props.connection.loginerror !== 'none') { error = <div className="error" >{this.props.connection.loginerror} </div>; }
    if (this.props.labels.all) { labels = this.props.labels.all.map(e=> <Button onClick={this.props.setLabelFilter.bind(this, e.id - 1)} ><img src={e.imgurl} />{e.name}{this.props.ui.labelfilterbuttons[e.id - 1].value ? <Vinkje><img src={`${this.props.connection.root}/web/img/vinkje.png`} /></Vinkje> : ''}</Button>); }
    return (
      <SMenu showmenu={this.props.ui.showmenu}>
        <MenuHeader><Button className="close" onClick={this.props.toggleMenu}><Sicon >{String.fromCharCode(0xe80b)}</Sicon></Button><br /><br /></MenuHeader>
        <MenuInner>
          {this.props.filteredProducts.filtered.length}   producten<br /><br />

          <input defaultValue={this.props.ui.searchterm} placeholder="zoekterm" type="text" ref={(c) => { this.searchterm = c; }} onChange={this.searchChange} /><br /><br />
        productsoort:<br /><br />
          <Button onClick={this.props.setPtFilter.bind(this, 0)} >groente{this.props.ui.ptfilterbuttons[0].value ? <Vinkje><img src={`${this.props.connection.root}/web/img/vinkje.png`} /></Vinkje> : ''}</Button>
          <Button onClick={this.props.setPtFilter.bind(this, 1)} >fruit{this.props.ui.ptfilterbuttons[1].value ? <Vinkje><img src={`${this.props.connection.root}/web/img/vinkje.png`} /></Vinkje> : ''}</Button>
          <Button onClick={this.props.setPtFilter.bind(this, 2)} >vlees{this.props.ui.ptfilterbuttons[2].value ? <Vinkje><img src={`${this.props.connection.root}/web/img/vinkje.png`} /></Vinkje> : ''}</Button>
          <Button onClick={this.props.setPtFilter.bind(this, 3)} >vis{this.props.ui.ptfilterbuttons[3].value ? <Vinkje><img src={`${this.props.connection.root}/web/img/vinkje.png`} /></Vinkje> : ''}</Button>
          <Button onClick={this.props.setPtFilter.bind(this, 4)} >zuivel & eieren{this.props.ui.ptfilterbuttons[4].value ? <Vinkje><img src={`${this.props.connection.root}/web/img/vinkje.png`} /></Vinkje> : ''}</Button>
          <br /><br />eigenschappen:<br /><br />
          {labels}
        </MenuInner>

      </SMenu>
    );
  },
});

export default Menu;
