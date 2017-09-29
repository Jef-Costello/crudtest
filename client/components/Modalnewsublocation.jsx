import React from 'react';
import Locationnew from '../components/Locationnew';
import Modalbase from '../components/Modalbase';

function modalDecorator(InputComp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    getModalFlag() {
      return (this.props.ui.modalnewsublocation);
    }
    closeModal() {
      this.props.closeNewSublocationModal();
    }
    openModal() {
      this.props.openNewSublocationModal();
    }
    render() {
      return (<div><InputComp
        decorated={'decorated'}
        {...this.props}
        modaltitle="nieuwe sublocatie"
        ltype="Secondary"
        openThisModal={this.openModal.bind(this)}
        closeThisModal={this.closeModal.bind(this)}
        getModalFlag={this.getModalFlag.bind(this)}
      ><Locationnew {...this.props} /></InputComp></div>);
    }
};
}


const Modalnewsublocation = modalDecorator(Modalbase);
export default Modalnewsublocation;
