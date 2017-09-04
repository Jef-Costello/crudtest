import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import ReactDOM from 'react-dom';

const Productnew = React.createClass({


  componentDidUpdate() {},
  componentDidMount() { this.npname.focus(); },
  render() {
    return (
      <div>


        <div className="modal">
          <CSSTransitionGroup
            transitionName="example"
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
          >
            <figure className="modalinner" >


                naam: <br /><input ref={(c) => { this.npname = c; }} type="text" onKeyPress={this.enterDetect} /><br />
              beschrijving:<br /><input ref={(c) => { this.ndescription = c; }} type="text" onKeyPress={this.enterDetect} />
              <br />
              {}
              <button onClick={(e) => this.pb(e, 0)} ref={(c) => { this.b1 = c; }} className={this.props.ui.modalcatbuttons[0] ? 'selected' : ''}>1</button>
              <button onClick={(e) => this.pb(e, 1)} ref={(c) => { this.b2 = c; }} className={this.props.ui.modalcatbuttons[1] ? 'selected' : ''}>2</button>
              <button onClick={(e) => this.pb(e, 2)} ref={(c) => { this.b3 = c; }} className={this.props.ui.modalcatbuttons[2] ? 'selected' : ''}>3</button>


              <button onClick={this.newproduct}>opslaan</button>
              <button onClick={this.props.closeNpModal}>cancel</button>
              {this.props.ui.modalnperror}

            </figure></CSSTransitionGroup>
        </div></div>
    );
  },
  pb(e, b) { this.props.pressCatButton(b); },
  enterDetect(e) {
    if (e.key === 'Enter') {
      if (document.activeElement === ReactDOM.findDOMNode(this.npname)) { this.ndescription.focus(); return false; }
      if (document.activeElement === ReactDOM.findDOMNode(this.ndescription)) { this.newproduct(); }
    } return false;
  },
  newproduct(e) {
    if (e !== undefined)e.preventDefault();

    if (this.npname.value === '' || this.ndescription.value === '') { this.props.modalNPError('voer alle velden in.'); } else {
      this.props.newProduct(
      this.props.connection.token, this.npname.value, this.ndescription.value, this.props.ui.modalcatbuttons,
    );
    }
  },

});

export default Productnew;
