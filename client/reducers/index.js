import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import connection from './connection';
import products, * as fromProducts from './products';
import productsPublic from './productsPublic';
// import products from './products';
import ui from './ui';

const rootReducer = combineReducers({ ui, connection, products, productsPublic, routing: routerReducer });

export default rootReducer;
export const getSelectedProduct = function (state) { return fromProducts.getSelectedProduct(state); };

