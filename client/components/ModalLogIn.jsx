import React from 'react';
import User from '../components/User';
import Modalbase from '../components/Modalbase';

function modalDecorator(InputComp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    getModalFlag() {
      return (this.props.ui.modallogin);
    }
    closeModal() {
      this.props.closeModalLogIn();
    }
    openModal() {
      this.props.openModalLogIn();
    }
    render() {
      return (<div><InputComp
        decorated={'decorated'}
        {...this.props}
        modaltitle="inloggen"

        openThisModal={this.openModal.bind(this)}
        closeThisModal={this.closeModal.bind(this)}
        getModalFlag={this.getModalFlag.bind(this)}
      ><User {...this.props} /></InputComp></div>);
    }
};
}


const ModalLogIn = modalDecorator(Modalbase);
export default ModalLogIn;
