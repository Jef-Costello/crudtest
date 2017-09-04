function ui(state = [], action) {
  switch (action.type) {

    case 'SELECT_PRODUCT':

      return { ...state, modal: true };
    case 'OPEN_MODALNP':

      return { ...state, modalnp: true, modalnperror: '' };
    case 'MODAL_NP_ERROR':

      return { ...state, modalnperror: action.message };
    case 'OPEN_MODAL':

      return { ...state, modal: true, modalcatbuttons: [false, false, false] };


    case 'CLOSE_MODAL':

      return { ...state, modal: false, modalcatbuttons: [false, false, false] };

    case 'CLOSE_MODALNP':

      return { ...state, modalnp: false };

    case 'PRESS_CAT_BUTTON': {
      const buttons = { ...state.modalcatbuttons };
      buttons[action.nr] = !buttons[action.nr];
      return { ...state, modalcatbuttons: buttons }; }
    case 'SET_CAT_BUTTON': {
      const buttons = { ...state.modalcatbuttons };
      buttons[action.nr] = true;
      return { ...state, modalcatbuttons: buttons }; }
    default:
      return state;

  }
}

export default ui;
