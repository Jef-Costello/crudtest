import React from 'react';
import styled from 'styled-components';
import { CSSTransitionGroup } from 'react-transition-group';
import Icon from '../components/Icon';

const Modal = styled.div`

width:100%;
height: 100%;
position:absolute;
z-index:6;`;
const Blocker = styled.div`
position:fixed;
width:100%;
height: 100%;
background:rgba(0, 0, 0, 0.3);
left:0px;
top:0px;
&.example-appear {
  opacity: 0.01;
}

&.example-appear.example-appear-active {
  opacity: 1;
  transition: opacity .2s ease-in;
}

z-index:4;`;
const ModalContainer = styled.div`
max-width: 400px;
margin: auto;
z-index: 5;
background: #fff;
box-shadow: 0 0 0 5px rgba(0,0,0,0.03);
position: relative;
width: 100%;
top: 10px;

`;

const Button = styled.button`
    color:white;
    background: transparent;
    float: right;
    font-size: 15px;
    outline: 0;
    -webkit-appearance: none;
    border: none;
`;
const ModalHeader = styled.div`
font-size: 15px;
background: #3f6f3a;
color: white;
height: 50px;
padding: 15px;

`;
const Modalbase = React.createClass({

  componentDidUpdate() {},
  componentDidMount() { },
  ee() {

  //  if (this.props.ocflag()) { return 'tyur'; } return 'fasle';
  },
  render() {
    let dd;
    if (this.props.getModalFlag()) {
      return (
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear
          transitionAppearTimeout={2500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Modal>
            <Blocker />
            <ModalContainer>
              <ModalHeader><Button className="headerbutton"onClick={this.props.closeThisModal} ><Icon>{ String.fromCharCode(0xe80b)}</Icon></Button>{this.props.modaltitle} </ModalHeader>


              {React.cloneElement(this.props.children, this.props)}
            </ModalContainer></Modal></CSSTransitionGroup>);
    } return null;
  },
  onClickl() {
  //  const ll = new google.maps.LatLng(this.props.location.lat, this.props.location.lng);
    this.props.selectLocation(this.props.location.id);
    this.props.setLatLngUi(this.props.location.lat, this.props.location.lng);
    // this.props.gmap.map.setCenter(ll);
    this.props.locationModal();
  },
});

export default Modalbase;
