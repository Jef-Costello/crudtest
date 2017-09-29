import React from 'react';
import Locationnew from '../components/Locationnew';
import Modalbase from '../components/Modalbase';

function modalDecorator(InputComp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    getModalFlag() {
      return (this.props.ui.modalnewlocation);
    }
    closeModal() {
      this.props.closeNewLocationModal();
    }
    openModal() {
      this.props.openNewLocationModal();
    }
    render() {
      return (<div><InputComp
        decorated={'decorated'}
        {...this.props}
        modaltitle="nieuwe locatie"
        ltype="Primary"
        openThisModal={this.openModal.bind(this)}
        closeThisModal={this.closeModal.bind(this)}
        getModalFlag={this.getModalFlag.bind(this)}
      ><Locationnew {...this.props} /></InputComp></div>);
    }
};
}


const Modalnewlocation = modalDecorator(Modalbase);
export default Modalnewlocation;
