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
export const filteredProducts = function (state) {
  const scopy = { ...state };
  // const fb = [];

  const fb = state.ui.ptfilterbuttons.map(el=> el.value ? el.id : -1);
  // scopy.ui.ptfilterbuttons.map((el) => {
  //  if (el.value === true) { fb.push(el.id); }
//  });

  const filtered = [];
  scopy.productsPublic.products.map((el) => {
  //  console.log(el);
    if (fb.indexOf(el.ptparent) != -1)filtered.push(el);
  });
  // filtered.sort((a, b) => b.price - a.price);
  return { filtered, markersredrawn: true };
};
