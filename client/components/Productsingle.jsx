import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

const Productsingle = React.createClass({
  edit() {
    this.props.editProduct(
      this.props.connection.token,
      this.props.getSelectedProduct.id,
      this.refs.namesingle.value,
      this.refs.descriptionsingle.value,
      this.props.ui.modalcatbuttons);
  },
  componentDidUpdate() {},
  componentDidMount() {
    this.props.getSelectedProduct.groups.map((el) => this.props.setCatButton(el.groupid - 1));
    // this.props.ui.modalcatbuttons[0] = this.props.getSelectedProduct.groups[0].id;
  //  this.refs.descriptionsingle.value = this.props.getSelectedProduct.description;
  },
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

              <div className="grid-photo-wrap">{this.props.getSelectedProduct.name}  (id={this.props.getSelectedProduct.id})</div>
              <div>

                naam:<input ref={'namesingle'} defaultValue={this.props.getSelectedProduct.name} /><br />
              beschrijving<input ref={'descriptionsingle'} defaultValue={this.props.getSelectedProduct.description} />
                <button onClick={(e) => this.pb(e, 0)} ref={(c) => { this.b1 = c; }} className={this.props.ui.modalcatbuttons[0] ? 'selected' : ''}>1</button>
                <button onClick={(e) => this.pb(e, 1)} ref={(c) => { this.b2 = c; }} className={this.props.ui.modalcatbuttons[1] ? 'selected' : ''}>2</button>
                <button onClick={(e) => this.pb(e, 2)} ref={(c) => { this.b3 = c; }} className={this.props.ui.modalcatbuttons[2] ? 'selected' : ''}>3</button>

              </div>

              <button onClick={this.edit}>SAVEe</button>
              <button onClick={this.delete}>delete</button>

              <button onClick={this.props.closeModal}>cancel</button>


            </figure></CSSTransitionGroup>
        </div></div>
    );
  },
  delete() {
    this.props.deleteProduct(this.props.getSelectedProduct.id, this.props.connection.token);
  },
  pb(e, b) { this.props.pressCatButton(b); },
});

export default Productsingle;
