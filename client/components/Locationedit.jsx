import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Gmap from '../components/Gmap';
import geocodeAddress from '../tools';

const Locationedit = React.createClass({
  edit() {
    this.props.editLocation(
      // name, description, id, address, lat, lng

      this.locname.value,
      this.locdescription.value.replace(/\n/g, '%0A'),
      this.props.getSelectedLocation.id,
      this.locaddress.value,
      this.props.ui.lat,
      this.props.ui.lng,
    );
  },


  componentDidUpdate() {},
  componentDidMount() {

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
              <Gmap {...this.props} />
              <div className="grid-photo-wrap" />
                adres: <br /><input ref={(c) => { this.locaddress = c; }} type="text" onKeyPress={this.findAdres} defaultValue={this.props.getSelectedLocation.address} /><br />
              naam: <br /><input ref={(c) => { this.locname = c; }} type="text" defaultValue={this.props.getSelectedLocation.name} /><br />
            beschrijving:<br /><textarea ref={(c) => { this.locdescription = c; }} type="text" defaultValue={this.props.getSelectedLocation.description} />

              <button onClick={this.edit}>opslaan</button>

              <button onClick={this.delete}>verwijderen</button>

              <button onClick={this.props.closeLocationModal}>cancel</button>


            </figure></CSSTransitionGroup>
        </div></div>
    );
  },
  delete() {
    this.props.deleteLocation(this.props.getSelectedLocation.id);
  },
  findAdres(e) {
    geocodeAddrkess(geocoder, this.props.gmap.map, this.locaddress.value, true);
  },
  pb(e, b) { this.props.pressCatButton(b); },
  locationButton(e, b) { this.props.pressLocButton(b); },
});

export default Locationedit;
