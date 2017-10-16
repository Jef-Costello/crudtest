function ui(state = [], action) {
  switch (action.type) {

    case 'SELECT_PRODUCT':

      return { ...state, modal: true };
    case 'SET_SEARCH_FOCUS':

      return { ...state, searchFocus: action.value };
    case 'SELECT_PRODUCTTYPE':
      // console.log(action);
      return { ...state, ptype: action.id, ptimageurl: action.imgurl };
    case 'OPEN_MODALNP':

      return { ...state, modalnp: true, modalnperror: '' };
    case 'MODAL_NP_ERROR':

      return { ...state, modalnperror: action.message };
    case 'OPEN_MODAL':

      return { ...state, modal: true, modalcatbuttons: [false, false, false] };
    case 'OPEN_MODAL_LOCATION':

      return { ...state, modallocation: true };

    case 'SET_SEARCH_ADDRESS':
      return { ...state, searchaddress: action.address };
    case 'SET_SCROLL':
      return { ...state, scroll: action.y };
    case 'SHOW_MAP':

      return { ...state, showmap: !state.showmap };
    case 'TOGGLE_MENU':

      return { ...state, showmenu: !state.showmenu };
    case 'CLOSE_MODAL_LOCATION':

      return { ...state, modallocation: false };
    case 'OPEN_MODAL_LOG_IN':

      return { ...state, modallogin: true };
    case 'CLOSE_MODAL_LOG_IN':

      return { ...state, modallogin: false };
    case 'OPEN_NEW_LOCATION_MODAL':

      return { ...state, modalnewlocation: true };
    case 'CLOSE_NEW_LOCATION_MODAL':

      return { ...state, modalnewlocation: false };
    case 'OPEN_NEW_SUBLOCATION_MODAL':

      return { ...state, modalnewsublocation: true };
    case 'CLOSE_NEW_SUBLOCATION_MODAL':

      return { ...state, modalnewsublocation: false };

    case 'CLOSE_MODAL':

      return { ...state, modal: false, modalcatbuttons: [false, false, false], ptype: null, modallocationbuttons: [] };
    case 'CLOSE_HOC_MODAL':

      return { ...state, hocmodal: false };
    case 'OPEN_HOC_MODAL':

      return { ...state, hocmodal: true };
    case 'SET_LAT_LNG_UI' :
      return { ...state, lat: action.lat, lng: action.lng };

    case 'CLOSE_MODALNP':

      return { ...state, modalnp: false, modalcatbuttons: [false, false, false], ptype: null, modallocationbuttons: [], previewimage: '' };

    case 'PRESS_CAT_BUTTON': {
      const buttons = { ...state.modalcatbuttons };
      buttons[action.nr] = !buttons[action.nr];
      return { ...state, modalcatbuttons: buttons }; }
    case 'PRESS_LOC_BUTTON': {
      const lbuttons = { ...state.modallocationbuttons };
      lbuttons[action.nr] = !lbuttons[action.nr];
      return { ...state, modallocationbuttons: lbuttons }; }
    case 'INIT_LOC_BUTTONS': {
      const lbuttons = { ...state.modallocationbuttons };
      action.alllocations.map((el) => lbuttons[el.id] = false);
      action.locations.map((el) => lbuttons[el.id] = true);
    //  lbuttons[action.nr] = !lbuttons[action.nr];
      return { ...state, modallocationbuttons: lbuttons }; }
    case 'INIT_PTYPE_BUTTONS': {
      return { ...state, ptype: action.id };
    }
    case 'FOUND_LOCATION': {
      return { ...state, foundlocation: action.location };
    }
    case 'SET_PREDICTIONS': {
      return { ...state, predictions: action.predictions };
    }
    case 'INIT_PT_FILTER_BUTTONS': {
      const ptfilterbuttons2 = [false, false, false, false, false];
      return state;
    }
    case 'SET_PT_FILTER': {
      const ptfilterbuttons = [...state.ptfilterbuttons];
      ptfilterbuttons[action.id].value = !ptfilterbuttons[action.id].value;
      return { ...state, ptfilterbuttons };
    }
    case 'SET_PREVIEW_IMAGE_SRC': { console.log('ée');
      return { ...state, previewimage: action.src };
    }
    case 'SET_CAT_BUTTON': {
      const buttons = { ...state.modalcatbuttons };
      buttons[action.nr] = true;
      return { ...state, modalcatbuttons: buttons }; }
    default:
      return state;

  }
}

export default ui;

