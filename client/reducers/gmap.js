function gmap(state = [], action) {
  switch (action.type) {

    case 'MAP_INIT':

      return { ...state, initialized: true };
    case 'SET_MAP':

      return { ...state, map: action.map };
    case 'REMOVE_MAP':

      return { ...state, map: null };
    case 'SET_PREDICTIONS':

      return { ...state, predictions: action.predictions };
    case 'PREDICTION_INC':
      const pstate = { ...state };
      pstate.SelectedPrediction += 1;
      if (pstate.SelectedPrediction > pstate.predictions.length)pstate.SelectedPrediction = 1;

      return { ...state, SelectedPrediction: pstate.SelectedPrediction };
    case 'PREDICTION_DEC':
      const pstate2 = { ...state };
      pstate2.SelectedPrediction -= 1;
      if (pstate2.SelectedPrediction < 0)pstate2.SelectedPrediction = pstate2.predictions.length;

      return { ...state, SelectedPrediction: pstate2.SelectedPrediction };
    case 'PREDICTION_REMOVE':

      return { ...state, SelectedPrediction: 0 };
    case 'NONE':
      console.log('whoopie');
      return { ...state };
    case 'SET_MARKER':

      return { ...state, marker: action.marker };
    case 'PUSH_MARKER':

      return { ...state, markers: [...state.markers, action.marker] };
    case 'API_LOADING':

      return { ...state, apiLoading: true };
    case 'SET_GEOCODER':

      return { ...state, geocoder: action.geocoder };

    case 'REDRAW_MARKERS':

      return { ...state, redrawMarkers: action.value };
    case 'LOAD_GOOGLE':


      return { ...state };
    case 'REMOVE_MARKERS':
      let markers = { ...state };
      markers = markers.markers;
      markers.map((m)=> m.setMap(null));
      return { ...state, markers: [] };
    case 'SET_PT_FILTEpR':

      return { ...state, redrawMarkers: true };

    default:
      return state;

  }
}

export default gmap;
export const getProducerLocation = function (state) {
  const indx = state.locations.all.map(el =>
  el.type).indexOf('Primary');
  return { ...state.locations.all[indx] };
};
export const getSelectedPrediction = function (state) {
  if (state.gmap.SelectedPrediction !== 0 && state.gmap.predictions.length > 0) { return { ...state.gmap.predictions[state.gmap.SelectedPrediction - 1] }; }
  return state;
};
