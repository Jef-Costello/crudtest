function products(state = [], action) {
  switch (action.type) {

    case 'HANDLENEWPRODUCT':
      return { ...state, products: [...state.products, action.json] };

    case 'SELECT_PRODUCT':
      const selp = { ...state.selectedproduct, id: action.id };
      return { ...state, selectedproduct: selp };

    case 'HANDLEPRODUCT':
// not used
      return { ...state, selectedproduct: action.json };

    case 'HANDLE_GET_PRODUCTS':
      return { ...state, products: action.json, initialized: true };

    case 'HANDLE_DELETE_PRODUCT':
      console.log('dddddd', state.selectedproduct.id);
      const indx2 = state.products.map(el =>
        el.id).indexOf(state.selectedproduct.id);
      const loccopy2 = { ...state };
      loccopy2.products.splice(indx2, 1);
      return { ...state, products: loccopy2.products };

    case 'UPDATE_PRODUCT_IN_STORE':
      console.log(action.product);

      const indx3 = state.products.map((p)=> p.id).indexOf(action.product.id);
      const pc = { ...state };
      pc.products[indx3] = action.product;

      return { ...state, products: pc.products };


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
