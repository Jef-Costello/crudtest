function locationsPublic(state = [], action) {
  switch (action.type) {

    case 'HANDLE_LOCATIONS_PUBLIC':

      return { ...state, all: action.json.locations, initialized: true };
    default:
      return state;

  }
}

export default locationsPublic;
