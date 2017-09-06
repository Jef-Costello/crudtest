function productsPublic(state = [], action) {
  switch (action.type) {


    case 'SELECT_PRODUCT':
      const selp = { ...state.selectedproduct, id: action.id };
      return { ...state, selectedproduct: selp };


    case 'HANDLE_GET_PRODUCTS_PUBLIC':
      return { ...state, products: action.json, initialized: true };


    default:
      return state;

  }
}

export default productsPublic;
