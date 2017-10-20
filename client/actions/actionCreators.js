// increment
import getCookie from '../tools';

export
function newProduct(name, subtitle, description, price, pricetype, groups, locations, ptype) {
 // check if user has logged out in other window todo: find better solution
  let locs = '';
  Object.keys(locations).map((key, index) => (

    locs += `&l[${key}]=${locations[key]}`


  ));
  console.log(locs);
  return { type: 'NEWPRODUCT', name, subtitle, description, price, pricetype, groups: `g[0]=${groups[0]}&g[1]=${groups[1]}&g[2]=${groups[2]}`, locations: locs, ptype };
}
export
function selectLocation(id) {
  return { type: 'SELECT_LOCATION', id };
}
export
function bounceMarker(id, markers) {
  console.log(id);
  const indx = markers.map((m) => m.locationId).indexOf(id);
  markers[indx].setAnimation(google.maps.Animation.BOUNCE);

  function a(markr) { setTimeout(() => { markr.setAnimation(null); }, 2000); }
  a(markers[indx]);


  return { type: 'BOUNCE_MARKER', id };
}

export
function setSearchAddress(address) {
  return { type: 'SET_SEARCH_ADDRESS', address };
}
export
function setSearchTerm(term) {
  return { type: 'SET_SEARCH_TERM', term };
}
export
function addLocationToUser(id) {
  console.log('jj');
  return { type: 'ADD_LOCATION_USER', id };
}
export
function removeLocationFromUser(id) {
  console.log('jj');
  return { type: 'REMOVE_LOCATION_USER', id };
}
export
function showMap(value) {
  return { type: 'SHOW_MAP', value };
}
export
function dLocAdd(id) {
  return { type: 'DLOC_ADD', id };
}
export
function dLocRemove(id) {
  return { type: 'DLOC_REMOVE', id };
}
export
function toggleMenu(value) {
  return { type: 'TOGGLE_MENU', value };
}
export
function upload(file) {
  return { type: 'UPLOAD_IMAGE', file };
}
export
function editProduct(file) {
  return { type: 'EDIT_PRODUCT', file };
}
export
function getLocationByUrl(url) {
  return { type: 'GET_LOCATION_BY_URL', url };
}
export
function newLocation(fd) {
  return { type: 'NEW_LOCATION', fd };
}
export
function setScroll(y) {
  return { type: 'SET_SCROLL', y };
}
export
function editLocation(fd) {
  return { type: 'EDIT_LOCATION', fd };
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
function setCatButton(nr, value) {
  return { type: 'SET_CAT_BUTTON', nr, value };
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
function editProductold(id, name, subtitle, description, price, pricetype, groups, locations, ptype) {
  let locs = '';
  Object.keys(locations).map((key, index) => {
    if (locations[key])locs += `&l[${index}]=${key}`;
    return null;
  });
  return { type: 'EDITPRODUCT', id, name, subtitle, description, price, pricetype, groups: `g[0]=${groups[0]}&g[1]=${groups[1]}&g[2]=${groups[2]}`, locations: locs, ptype };
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
  console.log('name');
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
export
function handleDeleteProduct(json) {
  return { type: 'HANDLE_DELETE_PRODUCT', json };
}
export
function removeMarkers() {
  return { type: 'REMOVE_MARKERS' };
}
export
function removeMap() {
  return { type: 'REMOVE_MAP' };
}
export
function waitingForGoogle(action) {
  return { type: 'AWAIT_GOOGLE', action };
}
export
function getToken(json) {
  return { type: 'GET_TOKEN', json };
}
export

function setLabelFilter(id) {
  return { type: 'SET_LABEL_FILTER', id };
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
function setPreviewImageSrc(src) {
  return { type: 'SET_PREVIEW_IMAGE_SRC', src };
}
export
function getProductsPublic() {
  return { type: 'INITIALIZE_PUBLIC',
    lat: 52.132633,
    lng: 5.2912659 };
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

