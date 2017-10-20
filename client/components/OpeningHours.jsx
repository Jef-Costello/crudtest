import React from 'react';
import styled from 'styled-components';

const Times = styled.div`
width:132px;float:right;
div.inner{float:right;}
div.outer{line-height: 13px;}

`;
const OpeningHours = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {},

  render() {
    return (<Times>openingstijden:<br />
      <div className="outer">maandag: <div className="inner"> {this.props.location.monfrom ? `${this.props.location.monfrom} tot ${this.props.location.monto}` : 'gesloten'}</div></div>
      <div className="outer">dinsdag: <div className="inner"> {this.props.location.tuefrom ? `${this.props.location.tuefrom} tot ${this.props.location.tueto}` : 'gesloten'}</div></div>
      <div className="outer">woensdag: <div className="inner"> {this.props.location.wedfrom ? `${this.props.location.wedfrom} tot ${this.props.location.wedto}` : 'gesloten'}</div></div>
      <div className="outer">donderdag: <div className="inner">{this.props.location.thufrom ? `${this.props.location.thufrom} tot ${this.props.location.thuto}` : 'gesloten'}</div></div>
      <div className="outer">vrijdag: <div className="inner"> {this.props.location.frifrom ? `${this.props.location.frifrom} tot ${this.props.location.frito}` : 'gesloten'}</div></div>
      <div className="outer">zaterdag: <div className="inner"> {this.props.location.satfrom ? `${this.props.location.satfrom} tot ${this.props.location.satto}` : 'gesloten'}</div></div>
      <div className="outer">zondag: <div className="inner"> {this.props.location.sunfrom ? `${this.props.location.sunfrom} tot ${this.props.location.sunto}` : 'gesloten'}</div></div>
    </Times>);
  },

});

export default OpeningHours;
