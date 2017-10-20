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

  const fb = state.ui.ptfilterbuttons.filter(el => el.value).map(el=> el.id);
  const lb = state.ui.labelfilterbuttons.filter((el) => el.value);


  const filtered = [];
  scopy.productsPublic.products.map((el) => {
    const groups = el.groups.map(gr=> gr.groupid);

    if ((
      el.name.search(state.ui.searchterm) != -1 ||
      el.description.search(state.ui.searchterm) != -1 ||
      el.subtitle.search(state.ui.searchterm) != -1) &&
      (fb.length > 0 ? (fb.indexOf(el.ptparent) != -1) : true) &&
     (lb.length > 0 ? lb.some(v=> groups.indexOf(v.id) >= 0) : true) &&

      filtered.map((f) => f.id).indexOf(el.id) == -1

    )filtered.push(el);
  });
// filtered.sort((a, b) => b.price - a.price);
  return { filtered, markersredrawn: true };
};
