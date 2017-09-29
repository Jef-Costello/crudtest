import React from 'react';
import Locationedith from '../components/Locationedith';
import Modalbase from '../components/Modalbase';

function modalDecorator(InputComp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    getModalFlag() {
      return (this.props.ui.modallocation);
    }
    closeModal() {
      this.props.closeLocationModal();
    }
    openModal() {
      this.props.locationModal();
    }
    render() {
      return (<div><InputComp
        decorated={'decorated'}
        {...this.props}
        modaltitle="bewerk locatie"
        openThisModal={this.openModal.bind(this)}
        closeThisModal={this.closeModal.bind(this)}
        getModalFlag={this.getModalFlag.bind(this)}
      ><Locationedith {...this.props} /></InputComp></div>);
    }
};
}


const Modallocation = modalDecorator(Modalbase);
export default Modallocation;
