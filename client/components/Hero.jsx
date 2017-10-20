import React from 'react';
import styled from 'styled-components';
import FindAddress from '../components/FindAddress';
import SIcon from '../components/Icon';

const Title = styled.div`

    width: 100%;
    font-size: 30px;
    color: white;
    position: absolute;
    text-align: center;
    margin: auto;
    font-weight: 400;
    top: 40%;
`;
const Button = styled.button`
padding: 5px;
margin-left:25px;
    font-size: 15px;
    background: transparent;
    border-style: none;
    outline: 0;
    -webkit-appearance: none;
    border: none;
    color: white;
    float: left;
    background: rgba(0, 0, 0, 0.36);
    line-height: 30px;
    position:absolute;
    bottom:0px;
    &.search{float:none;margin:0;padding: 0px 4px 0px 8px;position:initial;}
`;
const Intro = styled.div`
text-decoration:none;
    width: 100%;
color: #899c87;
font-family:'Open Sans',sans-serif;
font-size:10px;
font-weight:600;
flex:1;
flex-grow:0;
height:370px;



background: #fff;

position: relative;
flex-basis:100%;
box-sizing:border-box;

background-image:url('${props => props.connection.root}/web/img/splash.jpg');
background-position-y:bottom;
background-position-x:right;
    background-size: cover;
img{position:relative;    width: 100%;min-width:900px;right:0px
}
`;
const Logo = styled.div`
top: 50px;
  transform: rotate(15deg);
    opacity:${props => (props.scroll > 100) ? 0 : 0.7};

    transition:opacity 1s;
    position: fixed;

      width: calc(20vw + 30px);
    right: 2%;
    z-index:7;
    img{position:absolute;z-index:7;min-width:auto;}


`;
const Hero = React.createClass({


  componentDidUpdate() {},
  componentDidMount() {},

  render() {
    let logo;
    if (this.props.ui.scroll < 220 && this.props.route.path === (`${this.props.connection.root}/web/app_dev.php`)) { logo = <Logo scroll={this.props.ui.scroll}><img src={`${this.props.connection.root}/web/img/logo5.png`} /></Logo>; }
    return (
      <Intro {...this.props}>                                                                                  {logo}<Title>de beste producten uit de buurt<br /><FindAddress {...this.props} />

        <br />
      </Title><Button onClick={this.props.showMap}><SIcon>{this.props.ui.showmap ? String.fromCharCode(0xe80b) : String.fromCharCode(0xe808)}</SIcon>kaart</Button>

      </Intro>
    );
  },

});

export default Hero;
