function locations(state = [], action) {
  switch (action.type) {
    case 'HANDLE_USkER': {
      return { ...state, all: action.json.locations, initialized: true };
    }
    case 'HANDLE_LOCATIONS':

      return { ...state, all: action.json.locations, initialized: true };
    case 'HANDLE_NEW_LOCATION':
      console.log(action.json);
      return { ...state, all: action.json, initialized: true };
    case 'HANDLE_EDIT_LOCATION':

      const indx = state.all.map(el =>
      el.id).indexOf(state.selectedlocation.id);
      const loccopy = { ...state };
      loccopy.all[indx] = action.json;
      return loccopy;

    case 'HANDLE_DELETE_LOCATION':
      const indx2 = state.all.map(el =>
      el.id).indexOf(state.selectedlocation.id);
      const loccopy2 = { ...state };
      loccopy2.all.splice(indx2, 1);
      return loccopy2;
    case 'SELECT_LOCATION':
      const sell = { ...state.selectedlocation, id: action.id };
      return { ...state, selectedlocation: sell };
    case 'SELECT_LOCATION_MAP':
      const sellm = { ...state.selectedlocationmap, id: action.id };
      return { ...state, selectedlocationmap: sellm };
    default:
      return state;

  }
}

export default locations;
export const getProducerLocation = function (state) {
  const indx = state.locations.all.map(el =>
  el.type).indexOf('Primary');
  return { ...state.locations.all[indx] };
};
export const getSelectedLocation = function (state) {
  const indx = state.locations.all.map(el =>
  el.id).indexOf(state.locations.selectedlocation.id);
  return { ...state.locations.all[indx] };
};
