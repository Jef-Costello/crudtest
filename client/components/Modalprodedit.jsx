import React from 'react';
import Productedit from '../components/Productedit';
import Modalbase from '../components/Modalbase';

function modalDecorator(InputComp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    getModalFlag() {
      return (this.props.ui.modal);
    }
    closeModal() {
      this.props.closeModal();
    }
    openModal() {
      this.props.openModal();
    }
    render() {
      return (<div><InputComp
        decorated={'decorated'}
        {...this.props}
        modaltitle="bewerk product"
        openThisModal={this.openModal.bind(this)}
        closeThisModal={this.closeModal.bind(this)}
        getModalFlag={this.getModalFlag.bind(this)}
      ><Productedit {...this.props} /></InputComp></div>);
    }
};
}


const Modalprodedit = modalDecorator(Modalbase);
export default Modalprodedit;
