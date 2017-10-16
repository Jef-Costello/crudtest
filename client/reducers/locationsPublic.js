function locationsPublic(state = [], action) {
  switch (action.type) {

    case 'HANDLE_LOCATION':

      return { ...state, locationPage: action.json };
    case 'HANDLE_LOCATIONS_PUBLIC':

      return { ...state, all: action.json.locations, initialized: true };
    default:
      return state;

  }
}

export default locationsPublic;
