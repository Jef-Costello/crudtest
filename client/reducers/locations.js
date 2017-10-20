function locations(state = [], action) {
  switch (action.type) {

    case 'HANDLE_LOCATIONS':

      return { ...state, dlocations: action.json.dlocs, all: action.json.locations, initialized: true };
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
    case 'HANDLE_REMOVE_LOCATION_USER':
      const indx3 = state.dlocations.map(el =>
        el.id).indexOf(parseInt(action.json.id));
      console.log(action.json.id);
      console.log('INDCXX', indx3);
      console.log(state.dlocations);
      const loccopy3 = { ...state };
      loccopy3.dlocations.splice(indx3, 1);
      return loccopy3;
    case 'HANDLE_ADD_LOCATION_USER':
      console.log('äegasrghasrg', action);
      const dlc = [...state.dlocations];
      const nw = { id: parseInt(action.json.id) };
      dlc.push(nw);
      return { ...state, dlocations: dlc };
    case 'SELECT_LOCATION':
      const sell = { ...state.selectedlocation, id: action.id };
      return { ...state, selectedlocation: sell };
    case 'SELECT_LOCATION_MAP':
      console.log(`clicked ${action.id}`);
      const sellm = { ...state.selectedlocationmap, id: action.id };
      return { ...state, selectedlocationmap: sellm };
    default:
      return state;

  }
}

export default locations;
export const getProducerLocation = function (state) {
  let indx;
  state.locations.all.map((el) => {
    console.log(el.type);
    if (el.type == 'Primary' && el.userid == state.user.userid) indx = el;
  });
  console.log('indx', indx);
  return { ...indx };
};
export const getSelectedLocation = function (state) {
  const indx = state.locations.all.map(el =>
  el.id).indexOf(state.locations.selectedlocation.id);
  return { ...state.locations.all[indx] };
};
