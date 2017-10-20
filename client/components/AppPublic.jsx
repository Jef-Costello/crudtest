// this file sends storestate and actions through as props to react


import Secondary from './Secondary';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import { getSelectedProduct } from '../reducers';
import { getProducerLocation } from '../reducers';
import { getSelectedLocation } from '../reducers';
import { filteredProducts } from '../reducers';
import { getSelectedPrediction } from '../reducers';
// /PUBLIC APP
function mapStateToProps(state) {
  return {
    filteredProducts: filteredProducts(state),
    getSelectedProduct: getSelectedProduct(state),
    getProducerLocation: getProducerLocation(state),
    getSelectedLocation: getSelectedLocation(state),
    getSelectedPrediction: getSelectedPrediction(state),
    ui: state.ui,
    connection: state.connection,
    productsPublic: state.productsPublic,
    gmap: state.gmap,
    locationsPublic: state.locationsPublic,
    user: state.user,
    producttypes: state.producttypes,
    labels: state.labels,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const AppPublic = connect(mapStateToProps, mapDispatchToProps)(Secondary);

export default AppPublic;
