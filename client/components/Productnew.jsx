import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalInner = styled.div`
padding: 2rem 2rem 2rem 2rem;

background: white;

img{width:100px;}
img.preview{width:200px;}
textarea{max-width:100%}
.inputfile {
width: 0.1px;
height: 0.1px;
opacity: 0;
overflow: hidden;
position: absolute;
z-index: -1;
}
.inputfile + label {
  height: 26px;
  line-height: 26px;
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
  color: #324430;
  -webkit-appearance: none;
}


.inputfile + label:hover {
  border: 2px solid #e28122;
  color: #324430;
}
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

  upload() {
  //  var canvas = document.getElementById('viewport'),
  //  const context = this.npcanvas.getContext('2d');
    const fd = new FormData();
    fd.append('file', this.npimage.files[0]);

    fd.append('id', 'new');
    fd.append('name', this.npname.value);
    fd.append('subtitle', this.nsubTitle.value);
    fd.append('description', this.ndescription.value);
    fd.append('price', this.nprice.value);
    fd.append('pricetype', this.npricetype.value);

    fd.append('groups', JSON.stringify(this.props.ui.modalcatbuttons));
    fd.append('locations', JSON.stringify(this.props.ui.modallocationbuttons));
    fd.append('ptype', this.props.ui.ptype);
  //  console.log(context);
  //  const base_image = new Image();
  //  base_image.src = URL.createObjectURL(this.npimage.files[0]);
    // base_image.src = 'http://localhost/api4/web/img/producttypes/aardappel.jpg';
  //  base_image.onload = function () {
    //  console.log('loaded');
    //  context.drawImage(base_image, 100, 100);
  //  };


  //  console.log(this.npimage);
    this.props.upload(fd);
  },
  componentDidUpdate() {},
  componentDidMount() { this.npname.focus(); },
  render() {
    return (

      <ModalInner >
        <div className="grid-photo-wrap" />
        <div>
          afbeelding: <br /><input ref={(c) => { this.npimage = c; }} onChange={this.previewChange} type="file" name="file" id="file" className="inputfile" /><label htmlFor="file">Kies bestand</label><br />
          <img className="preview" src={this.props.ui.previewimage} /><br />

        naam: <br /><input ref={(c) => { this.npname = c; }} type="text" onChange={this.enterDetect} /><br />
      ondertitel:<br /><input ref={(c) => { this.nsubTitle = c; }} type="text" onChange={this.enterDetect} /><br />
    beschrijving:<br /><textarea ref={(c) => { this.ndescription = c; }} type="text" onChange={this.enterDetect} /><br />
  prijs:<br /><input ref={(c) => { this.nprice = c; }} type="text" onChange={this.enterDetect} /><br />
prijs toevoeging:<br /><input ref={(c) => { this.npricetype = c; }} type="text" onChange={this.enterDetect} /><br />
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
          <Pimg><img className="pticon" alt="" src={`${this.props.connection.root}/web/${this.props.ui.ptimageurl}`} /></Pimg>
          {this.props.producttypes.all.map((pt) => (pt.id > 5 ? <Button className={(pt.id === this.props.ui.ptype) ? 'selected' : ''} onClick={(e) => this.selectpt(e, pt.id, pt.imgurl)} key={pt.id}>{pt.name}</Button> : null))}
          <br /><br />
        </div>
        <Button className="crud" onClick={this.upload}>opslaan</Button>
        <Button className="crud" onClick={this.props.closeNpModal}>cancel</Button>
      </ModalInner>
    );
  },
  pb(e, b) { this.props.pressCatButton(b); },
  locationButton(e, b) { this.props.pressLocButton(b); },
  previewChange() {
    console.log('e.target');
    const reader = new FileReader();
    const that = this;
    reader.onload = function (e) {
      console.log('e.target');
      that.props.setPreviewImageSrc(e.target.result);
    };

    reader.readAsDataURL(this.npimage.files[0]);
  //  console.log(this.npimage.files[0]);
  //  this.props.setPreviewImageSrc(this.npimage.files[0].result);
  },
  enterDetect(e) {
    if (this.npname.value.length > 32) this.npname.value = this.npname.value.substr(0, 32);
    if (this.nsubTitle.value.length > 50) this.nsubTitle.value = this.nsubTitle.value.substr(0, 50);
    if (this.nhighlighted.value.length > 16) this.nhighlighted.value = this.nhighlighted.value.substr(0, 15);
    if (this.ndescription.value.length > 1024) this.ndescription.value = this.ndescription.value.substr(0, 1023);
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
        this.npname.value,
        this.nsubTitle.value,
        this.ndescription.value,
        this.nprice.value,
        this.npricetype.value,

        this.props.ui.modalcatbuttons,
        this.props.ui.modallocationbuttons,
        this.props.ui.ptype,
    );
    }
  },

});

export default Productnew;
