function products(state = [], action) {
  switch (action.type) {

    case 'HANDLENEWPRODUCT':
      return { ...state, products: action.json };

    case 'SELECT_PRODUCT':
      const selp = { ...state.selectedproduct, id: action.id };
      return { ...state, selectedproduct: selp };

    case 'HANDLEPRODUCT':
// not used
      return { ...state, selectedproduct: action.json };

    case 'HANDLE_GET_PRODUCTS':
      return { ...state, products: action.json, initialized: true };

    case 'HANDLE_DELETE_PRODUCT':
      return { ...state, products: action.json };

    case 'UPDATE_PRODUCT_IN_STORE':
      const statecopy = { ...state };
      const index = productIndexById(state, action.id);
      statecopy.products[index].name = action.name;
      statecopy.products[index].description = action.description;
      statecopy.products[index].groups = action.groups;

      return statecopy;


    default:
      return state;

  }
}

export default products;
export const getSelectedProduct = function (state) {
  const indx = state.products.products.map(el =>
  el.id).indexOf(state.products.selectedproduct.id);
  return { ...state.products.products[indx] };
};
function productIndexById(state, id) { return (state.products.map((el) => el.id).indexOf(id)); }
