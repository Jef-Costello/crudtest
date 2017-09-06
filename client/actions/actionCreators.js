// increment

export
function newProduct(token, name, description, groups) {
  return { type: 'NEWPRODUCT', token, name, description, groups: `g[0]=${groups[0]}&g[1]=${groups[1]}&g[2]=${groups[2]}` };
}
export
function pressCatButton(nr) {
  return { type: 'PRESS_CAT_BUTTON', nr };
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
function modalNPError(message) {
  return { type: 'MODAL_NP_ERROR', message };
}
export
function editProduct(token, id, name, description, groups) {
  return { type: 'EDITPRODUCT', token, id, name, description, groups: `g[0]=${groups[0]}&g[1]=${groups[1]}&g[2]=${groups[2]}` };
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
function startRefresh() {
  return { type: 'START_REFRESH' };
}
export
function getProducts() {
  return { type: 'GET_ALL_PRODUCTS' };
}
export
function getProductsPublic() {
  return { type: 'GET_ALL_PRODUCTS_PUBLIC' };
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

