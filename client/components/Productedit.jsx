import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
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
const Productedit = React.createClass({
  edit() {
    this.props.editProduct(
      this.props.getSelectedProduct.id,
      this.npname.value,
      this.nsubTitle.value,
      this.ndescription.value,
      this.nprice.value,
      this.npricetype.value,

      this.props.ui.modalcatbuttons,
      this.props.ui.modallocationbuttons,
      this.props.ui.ptype,
    );
  },
  componentDidUpdate() {},
  componentDidMount() {
    const indx = this.props.producttypes.all.map(el =>
    el.id).indexOf(this.props.getSelectedProduct.ptype);
    this.props.initPtypeButtons(this.props.getSelectedProduct.ptype);
    this.props.selectProducttype(this.props.getSelectedProduct.ptype, this.props.producttypes.all[indx].imgurl);
    this.props.getSelectedProduct.groups.map((el) => this.props.setCatButton(el.groupid - 1));
    this.props.initLocButtons(this.props.getSelectedProduct.locations, this.props.locations.all);
    // this.props.getSelectedProduct.locations.map((el) => this.props.setCatButton(el.groupid - 1));
    // this.props.ui.modalcatbuttons[0] = this.props.getSelectedProduct.groups[0].id;
  //  this.refs.descriptionsingle.value = this.props.getSelectedProduct.description;
  },
  render() {
    return (

      <ModalInner>

        <div className="grid-photo-wrap" />
        <div>
          naam: <br /><input ref={(c) => { this.npname = c; }} type="text" defaultValue={this.props.getSelectedProduct.name} onKeyPress={this.enterDetect} /><br />
        ondertitel:<br /><input ref={(c) => { this.nsubTitle = c; }} type="text" defaultValue={this.props.getSelectedProduct.subtitle} onKeyPress={this.enterDetect} /><br />
      beschrijving:<br /><textarea ref={(c) => { this.ndescription = c; }} type="text" defaultValue={this.props.getSelectedProduct.description} onKeyPress={this.enterDetect} /><br />
    prijs:<br /><input ref={(c) => { this.nprice = c; }} type="text" defaultValue={this.props.getSelectedProduct.price} onKeyPress={this.enterDetect} /><br />
  prijs toevoeging:<br /><input ref={(c) => { this.npricetype = c; }} type="text" defaultValue={this.props.getSelectedProduct.pricetype}onKeyPress={this.enterDetect} /><br />
          <br />
          <div className="groups"><br />labels:<br />
            <Button onClick={(e) => this.pb(e, 0)} ref={(c) => { this.b1 = c; }} className={this.props.ui.modalcatbuttons[0] ? 'selected' : ''}>biologisch</Button>
            <Button onClick={(e) => this.pb(e, 1)} ref={(c) => { this.b2 = c; }} className={this.props.ui.modalcatbuttons[1] ? 'selected' : ''}>lokaal</Button>
            <Button onClick={(e) => this.pb(e, 2)} ref={(c) => { this.b3 = c; }} className={this.props.ui.modalcatbuttons[2] ? 'selected' : ''}>duurzaam</Button>
          </div>
          <br />beschikbaar bij:<br />
          {this.props.locations.all.map((location) => (<div key={location.id}>

            <Button key={location.id} onClick={(e) => this.locationButton(e, location.id)} ref={(c) => { this.lb = c; }} className={this.props.ui.modallocationbuttons[location.id] ? 'selected' : ''}>{location.name}</Button>


          </div>))}
          <br />product soort:<br />
          <Pimg><img className="pticon" alt="selected product" src={`${this.props.connection.root}/web/${this.props.ui.ptimageurl}`} /></Pimg>
          {this.props.producttypes.all.map((pt) => (<Button className={(pt.id === this.props.ui.ptype) ? 'selected' : ''} onClick={(e) => this.selectpt(e, pt.id, pt.imgurl)} key={pt.id}>{pt.name}</Button>))}

        </div>

        <Button className="crud" onClick={this.edit}>opslaan</Button>
        <Button className="crud" onClick={this.delete}>verwijderen</Button>

        <Button className="crud" onClick={this.props.closeModal}>cancel</Button>


      </ModalInner>
    );
  },
  delete() {
    this.props.deleteProduct(this.props.getSelectedProduct.id, this.props.connection.token);
  },
  pb(e, b) { this.props.pressCatButton(b); },
  selectpt(e, p, i) { this.props.selectProducttype(p, i); },
  locationButton(e, b) { this.props.pressLocButton(b); },
});

export default Productedit;
