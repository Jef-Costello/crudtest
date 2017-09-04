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
import { editProductEpic } from './epics';
import { allProductsEpic } from './epics';
import { testEpic } from './epics';
import { getUserEpic } from './epics';
import { deleteProductEpic } from './epics';
import { combineEpics } from 'redux-observable';
import rootReducer from './reducers/index';

function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}


// const products = { all: [{ empty: 'empty', name: 'none', description: 'none', id: 'x' }] };
const connection = {
  loading: false,
  user: { name: 'logged out', email: 'none' },
  refreshing: false,
  token: 'none',
  error: 'none',
  loggedIn: false,
  lastaction: 'none',
  loginerror: 'none',
  loggedin: getCookie('cloggedin') === 'true' };
const ui = {
  modal: false,
  modalnp: false,
  modalnperror: '',
  modalcatbuttons: [false, false, false],
};

const products = {
  initialized: false,
  products: [],
  selectedproduct: { name: 'e', id: 4 },
}
  ;
if (getCookie('cloggedin') === 'true') {
  connection.user.name = getCookie('user');
  connection.user.email = getCookie('email');
  connection.token = getCookie('ctoken');
}


const defaultState = {


  products,
  connection,


  ui,

};
const rootEpic = combineEpics(
  loginEpic,
  logOutEpic,
  singleProductEpic,
  newProductEpic,
  editProductEpic,
  deleteProductEpic,
  reloadProductEpic,
  refreshEpic,
  getUserEpic,
  retryLastActionEpic,
  allProductsEpic,


);
const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(rootReducer, defaultState, compose(applyMiddleware(thunk, epicMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export const history = syncHistoryWithStore(browserHistory, store);
export default store;
