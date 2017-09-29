import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import connection from './connection';
import products, * as fromProducts from './products';
import productsPublic, * as fromProductsPublic from './productsPublic';
// import products from './products';
import ui from './ui';
import gmap, * as fromGmap from './gmap';
import locations, * as fromLocations from './locations';
import user from './user';
import locationsPublic from './locationsPublic';
import producttypes from './producttypes';

const rootReducer = combineReducers({ user, connection, gmap, ui, products, productsPublic, locations, locationsPublic, producttypes, routing: routerReducer });

export default rootReducer;
export const getSelectedProduct = function (state) { return fromProducts.getSelectedProduct(state); };
export const getSelectedPrediction = function (state) { return fromGmap.getSelectedPrediction(state); };
export const filteredProducts = function (state) { return fromProductsPublic.filteredProducts(state); };
export const getProducerLocation = function (state) { return fromLocations.getProducerLocation(state); };
export const getSelectedLocation = function (state) { return fromLocations.getSelectedLocation(state); };

