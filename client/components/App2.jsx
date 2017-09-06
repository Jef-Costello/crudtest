// this file sends storestate and actions through as props to react


import Secondary from './Secondary';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import { getSelectedProduct } from '../reducers';

function mapStateToProps(state) {
  return {
    getSelectedProduct: getSelectedProduct(state),
    ui: state.ui,
    connection: state.connection,
    products: state.productsPublic,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App2 = connect(mapStateToProps, mapDispatchToProps)(Secondary);

export default App2;
