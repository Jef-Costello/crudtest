

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';
import { getSelectedProduct } from '../reducers';
import { filteredProducts } from '../reducers';
import { getProducerLocation } from '../reducers';
import { getSelectedLocation } from '../reducers';
// PRIVATE APP
function mapStateToProps(state) {
  return {
    // filteredProducts: filteredProducts(state),
    getSelectedProduct: getSelectedProduct(state),
    getProducerLocation: getProducerLocation(state),
    getSelectedLocation: getSelectedLocation(state),
    products: state.products,
    // productsPublic: state.productsPublic,
    locations: state.locations,
    labels: state.labels,
    // locationsPublic: state.locationsPublic,
    connection: state.connection,
    gmap: state.gmap,
    ui: state.ui,
    user: state.user,
    producttypes: state.producttypes,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const AppPrivate = connect(mapStateToProps, mapDispatchToProps)(Main);

export default AppPrivate;
