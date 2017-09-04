// this file sends storestate and actions through as props to react

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';
import { getSelectedProduct } from '../reducers';

function mapStateToProps(state) {
  return {
    getSelectedProduct: getSelectedProduct(state),
    products: state.products,

    connection: state.connection,
    global: state.global,
    scriptloaded: state.scriptloaded,
    gm: state.gm,
    ui: state.ui,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
