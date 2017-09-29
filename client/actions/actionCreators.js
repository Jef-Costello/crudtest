// increment
import getCookie from '../tools';

export
function newProduct(token, name, description, groups, locations, ptype) {
 // check if user has logged out in other window todo: find better solution
  let locs = '';
  Object.keys(locations).map((key, index) => (

    locs += `&l[${key}]=${locations[key]}`


  ));
  console.log(locs);
  return { type: 'NEWPRODUCT', token, name, description, groups: `g[0]=${groups[0]}&g[1]=${groups[1]}&g[2]=${groups[2]}`, locations: locs, ptype };
}
export
function selectLocation(id) {
  return { type: 'SELECT_LOCATION', id };
}
export
function newLocation(token, name, description, ltype, address, lat, lng) {
  return { type: 'NEW_LOCATION', token, name, description, ltype, address, lat, lng };
}
export
function editLocation(name, description, id, address, lat, lng) {
  return { type: 'EDIT_LOCATION', name, description, id, address, lat, lng };
}
export
function deleteLocation(id) {
  return { type: 'DELETE_LOCATION', id };
}
export
function getLocations(token) {
  return { type: 'GET_LOCATIONS', token };
}
export
function setLatLngUi(lat, lng) {
  return { type: 'SET_LAT_LNG_UI', lat, lng };
}
export
function initialize() {
  return { type: 'INITIALIZE' };
}
export
function pressCatButton(nr) {
  return { type: 'PRESS_CAT_BUTTON', nr };
}
export
function pressLocButton(nr) {
  return { type: 'PRESS_LOC_BUTTON', nr };
}
export
function initLocButtons(locations, alllocations) {
  return { type: 'INIT_LOC_BUTTONS', locations, alllocations };
}
export
function initPtypeButtons(id) {
  return { type: 'INIT_PTYPE_BUTTONS', id };
}
export
function setCatButton(nr) {
  return { type: 'SET_CAT_BUTTON', nr };
}
export
function newProductModal() {
  return { type: 'OPEN_MODALNP' };
}
export
function openModal() {
  return { type: 'OPEN_MODAL' };
}
export
function locationModal() {
  return { type: 'OPEN_MODAL_LOCATION' };
}
export
function openNewLocationModal() {
  return { type: 'OPEN_NEW_LOCATION_MODAL' };
}
export
function selectProducttype(id, imgurl) {
  return { type: 'SELECT_PRODUCTTYPE', id, imgurl };
}
export
function closeNewLocationModal() {
  return { type: 'CLOSE_NEW_LOCATION_MODAL' };
}
export
function openNewSublocationModal() {
  return { type: 'OPEN_NEW_SUBLOCATION_MODAL' };
}
export
function closeNewSublocationModal() {
  return { type: 'CLOSE_NEW_SUBLOCATION_MODAL' };
}
export
function openModalLogIn() {
  return { type: 'OPEN_MODAL_LOG_IN' };
}
export
function closeModalLogIn() {
  return { type: 'CLOSE_MODAL_LOG_IN' };
}


export
function closeLocationModal() {
  return { type: 'CLOSE_MODAL_LOCATION' };
}
export
function modalNPError(message) {
  return { type: 'MODAL_NP_ERROR', message };
}
export
function editProduct(token, id, name, description, groups, locations, ptype) {
  let locs = '';
  Object.keys(locations).map((key, index) => {
    if (locations[key])locs += `&l[${index}]=${key}`;
    return null;
  });
  return { type: 'EDITPRODUCT', token, id, name, description, groups: `g[0]=${groups[0]}&g[1]=${groups[1]}&g[2]=${groups[2]}`, locations: locs, ptype };
}
export
function mapInit() {
  return { type: 'MAP_INIT' };
}
export
function setMap(map) {
  return { type: 'SET_MAP', map };
}
export
function setMarker(marker) {
  return { type: 'SET_MARKER', marker };
}
export
function pushMarker(marker) {
  return { type: 'PUSH_MARKER', marker };
}
export
function clearMarkers() {
  return { type: 'CLEAR_MARKERS' };
}
export
function setGeocoder(geocoder) {
  return { type: 'SET_GEOCODER', geocoder };
}
export
function selectLocationMap(id) {
  return { type: 'SELECT_LOCATION_MAP', id };
}

export
function getUser(token) {
  return { type: 'GET_USER', token };
}
export
function setDescriptionStore(id, description) {
  return { type: 'SETDESCRIPTIONSTORE', id, description };
}
export
function loading() {
  return { type: 'LOADING' };
}
export
function testepic() {
  return { type: 'TESTEPIC' };
}
export
function singleProduct(id, token) {
  return { type: 'GETPRODUCT', id, token };
}
export
function selectProduct(id) {
  return { type: 'SELECT_PRODUCT', id };
}
export
function closeHocModal() {
  return { type: 'CLOSE_HOC_MODAL' };
}
export
function openHocModal() {
  return { type: 'OPEN_HOC_MODAL' };
}
export
function closeModal() {
  return { type: 'CLOSE_MODAL' };
}
export
function closeNpModal() {
  return { type: 'CLOSE_MODALNP' };
}

export
function login(name, pw) {
  return { type: 'LOGIN',
    name,
    pw };
}
export
function logOut() {
  return { type: 'LOG_OUT' };
}


export
function handleLogin(json) {
  return { type: 'HANDLE_LOGIN', json };
}
export
function handleSingleProduct(json) { // console.log(json)
  return { type: 'HANDLEPRODUCT', json };
}
export function epicload() {
  return { type: 'EPICLOAD' };
}

export
function cancel() {
  return { type: 'CANCEL' };
}
export
function flushToken() {
  return { type: 'FLUSH_TOKEN' };
}

export
function receiveUserInfo(json) {
  return { type: 'RECEIVE_USER_INFO', json };
}

export
function handleNewObject(json) {
  return { type: 'HANDLE_NEW_OBJECT', json };
}
export
function handleGetProducts(json) {
  return { type: 'HANDLE_GET_PRODUCTS', json };
}
function handleDeleteProduct(json) {
  return { type: 'HANDLE_DELETE_PRODUCT', json };
}

export
function getToken(json) {
  return { type: 'GET_TOKEN', json };
}
export
function setPtFilter(id) {
  return { type: 'SET_PT_FILTER', id };
}
export
function predictionInc() {
  return { type: 'PREDICTION_INC' };
}
export
function predictionRemove() {
  return { type: 'PREDICTION_REMOVE' };
}
export
function predictionDec() {
  return { type: 'PREDICTION_DEC' };
}
export
function startRefresh() {
  return { type: 'START_REFRESH' };
}
export
function setPredictions(predictions) {
  return { type: 'SET_PREDICTIONS', predictions };
}
export
function setSearchFocus(value) {
  console.log('gfaegaegaegaegf');
  return { type: 'SET_SEARCH_FOCUS', value };
}
export
function getProductsByDistance(lat, lng) {
  return { type: 'GET_ALL_PRODUCTS_PUBLIC', lat, lng };
}
export
function foundLocation(location) {
  console.log('f', location);
  return { type: 'FOUND_LOCATION', location };
}
export
function redrawMarkers(value) {
  return { type: 'REDRAW_MARKERS', value };
}
export
function getProducts() {
  return { type: 'GET_ALL_PRODUCTS' };
}
export
function getProductsPublic() {
  return { type: 'INITIALIZE_PUBLIC' };
}
export
function apiLoading() {
  return { type: 'API_LOADING' };
}
export
function finishRefresh() {
  return { type: 'FINISH_REFRESH' };
}

export
function deleteProduct(id, token) {
  return { type: 'DELETEPRODUCT', id, token };
}

export
function refresh() {
  return { type: 'REFRESH' };
}

