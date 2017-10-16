import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
// import root reducer


import { loadingEpic } from './epics';
import { loginEpic } from './epics';
import { logOutEpic } from './epics';
import { refreshEpic } from './epics';
import { reloadProductEpic } from './epics';
import { singleProductEpic } from './epics';
import { retryLastActionEpic } from './epics';
import { newProductEpic } from './epics';
import { newLocationEpic } from './epics';
import { editProduct2Epic } from './epics';
import { allProductsEpic } from './epics';
import { allProductsPublicEpic } from './epics';
import { testEpic } from './epics';
import { initializeEpic } from './epics';
import { getUserEpic } from './epics';
import { getLocationsEpic } from './epics';
import { deleteLocationEpic } from './epics';
import { deleteProductEpic } from './epics';
import { uploadImageEpic } from './epics';
import { loadGmapsEpic } from './epics';
import { editLocationEpic } from './epics';
import { googleEpic } from './epics';
import { initializepublicEpic } from './epics';
import { getLocationByUrlEpic } from './epics';
import { addLocationToUserEpic } from './epics';
import { removeLocationFromUserEpic } from './epics';
import { combineEpics } from 'redux-observable';
import rootReducer from './reducers/index';
import getCookie from './tools';


// con st products = { all: [{ empty: 'empty', name: 'none', description: 'none', id: 'x' }] };
// gaction={action:{type:"NONE"}};
const gmap = {
  apiKey: 'AIzaSyDVH4o0trN9-as7muenydsbpiMbMDq3zfY',
  initialized: false,
  lat: 52.132633,
  lng: 5.2912659,
  predictions: [],
  SelectedPrediction: 0,
  markers: [],
  marker: null,
  renderedlocations: [],
  waiting: { type: 'NONE' },
  map: null,
};
const connection = {
  root: '',
  loading: false,

  refreshing: false,
  token: 'none',
  error: 'none',
  loggedIn: false,
  lastaction: 'none',
  loginerror: 'none',
  loggedin: getCookie('cloggedin') === 'true' };
const user = { name: 'logged out', email: 'none', initialized: false, producer: false, reseller: false };
const locations = { all: [], initialized: false, selectedlocation: { id: 0 } };
const locationsPublic = { all: [], initialized: false, selectedlocation: { id: 0 } };
const producttypes = { all: [] };
const ui = {
  modal: false,
  modalnp: false,
  modallocation: false,
  modalnperror: '',
  modalcatbuttons: [false, false, false],
  modallocationbuttons: [],
  uploadImage: '',
  scroll: 0,
  showmap: false,
  showmenu: false,
  ptfilterbuttons: [{ value: true, id: 6, name: 'groente' }, { value: true, id: 7, name: 'fruit' }, { value: true, id: 8, name: 'vlees' }, { value: true, id: 9, name: 'vis' }, { value: true, id: 10, name: 'zuivel & eieren' }],
};

const products = {
  initialized: false,
  products: [],
  selectedproduct: { name: 'e', id: 4 },
}
  ;
const productsPublic = {
  initialized: false,
  products: [],
  selectedproduct: { name: 'e', id: 4 },
}
    ;
if (getCookie('cloggedin') === 'true') {
  user.name = getCookie('user');
  user.email = getCookie('email');
  connection.token = getCookie('ctoken');
}


const defaultState = {


  products,
  productsPublic,
  connection,
  locations,
  locationsPublic,
  gmap,
  ui,
  user,
  producttypes,

};
const rootEpic = combineEpics(
  loginEpic,
  logOutEpic,
  singleProductEpic,
  newProductEpic,
  editProduct2Epic,
  deleteProductEpic,
  reloadProductEpic,
  refreshEpic,
  getUserEpic,
  getLocationsEpic,
  retryLastActionEpic,
  allProductsEpic,
  allProductsPublicEpic,
  loadGmapsEpic,
  newLocationEpic,
  initializeEpic,
  editLocationEpic,
  deleteLocationEpic,
  initializepublicEpic,
  getLocationByUrlEpic,
  uploadImageEpic,
  googleEpic,
  addLocationToUserEpic,
  removeLocationFromUserEpic,


);
const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(rootReducer, defaultState, compose(applyMiddleware(epicMiddleware)));
export const history = syncHistoryWithStore(browserHistory, store);
export default store;
