import React from 'react';

function modalDecorator(InputComp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    getModalFlag() {
    //  console.log(this.props.ui.modal);
      return (this.props.ui.modal);
    }
    render() {
      return (<div><InputComp decorated={'decorated'} {...this.props} getModalFlag={this.getModalFlag.bind(this)} /></div>);
    }
};
}


const ModalBase = React.createClass({

  componentDidUpdate() {},
  componentDidMount() {},
  ee() {

  //  if (this.props.ocflag()) { return 'tyur'; } return 'fasle';
  },
  render() {
    let dd;
    if (this.props.getModalFlag()) { dd = <div>aan</div>; } else dd = <div>uit</div>;
    return (
      <div className="modal"><figure className="modalinner" >
        {this.props.decorated}
        <button onClick={this.props.openModal} />
        <button onClick={this.props.closeModal} />
        modalbase
        {dd}
      </figure></div>
    );
  },
  onClickl() {
  //  const ll = new google.maps.LatLng(this.props.location.lat, this.props.location.lng);
    this.props.selectLocation(this.props.location.id);
    this.props.setLatLngUi(this.props.location.lat, this.props.location.lng);
    // this.props.gmap.map.setCenter(ll);
    this.props.locationModal();
  },
});
const Modal = modalDecorator(ModalBase);
export default Modal;
