import React from 'react';
import Productnew from '../components/Productnew';
import Modalbase from '../components/Modalbase';

function modalDecorator(InputComp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    getModalFlag() {
      return (this.props.ui.modalnp);
    }
    closeModal() {
      this.props.closeNpModal();
    }
    openModal() {
      this.props.newProductModal();
    }
    render() {
      return (<div><InputComp
        decorated={'decorated'}
        {...this.props}
        modaltitle="nieuw product"
        openThisModal={this.openModal.bind(this)}
        closeThisModal={this.closeModal.bind(this)}
        getModalFlag={this.getModalFlag.bind(this)}
      ><Productnew {...this.props} /></InputComp></div>);
    }
};
}


const Modalnp = modalDecorator(Modalbase);
export default Modalnp;
