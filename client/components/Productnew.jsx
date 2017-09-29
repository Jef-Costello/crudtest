import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalInner = styled.div`
padding: 2rem 2rem 2rem 2rem;

background: white;

img{width:100px;}
`;
const Button = styled.button`

height: 26px;

white-space: nowrap;
margin: 2px;
box-shadow: 0 2px 2px #dddddd;
display: inline-block;
background-color: #fff;
padding: 0px;
min-width: 25%;
border-radius: 3px;
font-size: 12px;
text-align:center;
outline: 0;
color:#869786;
-webkit-appearance: none;

    border: none;
    &.selected{
    border: 2px solid #e28122;
    color: #324430;}
    &.crud{

    color:black;}
`;
const Pimg = styled.div`
float:right;`;
const Productnew = React.createClass({


  componentDidUpdate() {},
  componentDidMount() { this.npname.focus(); },
  render() {
    return (

      <ModalInner >
        <div className="grid-photo-wrap" />
        <div>
        naam: <br /><input ref={(c) => { this.npname = c; }} type="text" onKeyPress={this.enterDetect} /><br />
      beschrijving:<br /><input ref={(c) => { this.ndescription = c; }} type="text" onKeyPress={this.enterDetect} />
          <br />
          <div className="groups"><br />labels:<br />
            <Button onClick={(e) => this.pb(e, 0)} ref={(c) => { this.b1 = c; }} className={this.props.ui.modalcatbuttons[0] ? 'selected' : ''}>biologisch</Button>
            <Button onClick={(e) => this.pb(e, 1)} ref={(c) => { this.b2 = c; }} className={this.props.ui.modalcatbuttons[1] ? 'selected' : ''}>lokaal</Button>
            <Button onClick={(e) => this.pb(e, 2)} ref={(c) => { this.b3 = c; }} className={this.props.ui.modalcatbuttons[2] ? 'selected' : ''}>duurzaam</Button>
          </div>
          <br />beschikbaar bij:<br />


          {this.props.locations.all.map((location) => (<div key={location.id}>

            <Button key={location.id} onClick={(e) => this.locationButton(e, location.id)} ref={(c) => { this.lb = c; }} className={this.props.ui.modallocationbuttons[location.id] ? 'selected' : ''}>{location.name}</Button>
            {this.props.ui.modalnperror}


          </div>))}
          <br />product soort:<br />
          <Pimg><img className="pticon" alt="" src={`/web/${this.props.ui.ptimageurl}`} /></Pimg>
          {this.props.producttypes.all.map((pt) => (<Button className={(pt.id === this.props.ui.ptype) ? 'selected' : ''} onClick={(e) => this.selectpt(e, pt.id, pt.imgurl)} key={pt.id}>{pt.name}</Button>))}
          <br /><br />
        </div>
        <Button className="crud" onClick={this.newproduct}>opslaan</Button>
        <Button className="crud" onClick={this.props.closeNpModal}>cancel</Button>
      </ModalInner>
    );
  },
  pb(e, b) { this.props.pressCatButton(b); },
  locationButton(e, b) { this.props.pressLocButton(b); },
  enterDetect(e) {
    if (e.key === 'Enter') {
      if (document.activeElement === ReactDOM.findDOMNode(this.npname)) { this.ndescription.focus(); return false; }
      if (document.activeElement === ReactDOM.findDOMNode(this.ndescription)) { this.newproduct(); }
    } return false;
  },
  selectpt(e, p, i) { this.props.selectProducttype(p, i); },
  newproduct(e) {
    if (e !== undefined)e.preventDefault();

    if (this.npname.value === '' || this.ndescription.value === '') { this.props.modalNPError('voer alle velden in.'); } else {
      this.props.newProduct(
      this.props.connection.token, this.npname.value, this.ndescription.value, this.props.ui.modalcatbuttons, this.props.ui.modallocationbuttons, this.props.ui.ptype,
    );
    }
  },

});

export default Productnew;
